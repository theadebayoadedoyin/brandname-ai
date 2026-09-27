import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

async function checkDomainStatus(domain: string): Promise<boolean> {
  const apiKey = process.env.WHOISXML_API_KEY;
  const url = `https://domain-availability.whoisxmlapi.com/api/v1?apiKey=${apiKey}&domainName=${domain}&outputFormat=JSON`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data?.DomainInfo?.domainAvailability === "AVAILABLE";
  } catch (err) {
    console.error(`Domain check failed for ${domain}:`, err);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const { description, industry, keywords } = await request.json();

    const prompt = `
You are a world-class Brand Naming Strategist.

You have over 20 years of experience naming companies, startups, luxury brands, law firms, fashion labels, churches, nonprofits, fintech companies, AI products.

You NEVER generate names immediately.

Before producing any answer, think through this process internally.

STEP 1
Understand what the business actually does.

STEP 2
Infer the industry if it is not explicitly provided.

STEP 3
Identify the likely audience.

STEP 4
Determine the positioning.

Examples:

- luxury
- premium
- affordable
- youthful
- corporate
- faith-based
- playful
- elegant
- modern
- heritage
- disruptive
- innovative

STEP 5
Determine the best naming direction.

Possible naming styles include:

- Invented
- Evocative
- Metaphorical
- Founder-inspired
- Geography-inspired (named after a founding location, town, river, or region — e.g. Nokia, named after the Finnish town where it began)
- Compound
- Minimal
- Descriptive
- Abstract

Choose the ONE style that best fits the business.

STEP 6

Brainstorm at least 20 possible names internally.

Reject weak names.

Reject names that sound generic.

Reject names that do not match the positioning.

Reject names that could fit any business.

Reject names that sound academic, philosophical, clinical, or like a
dictionary/thesaurus word chosen for its "intellectual" feel (examples of
words to avoid: Ontology, Nominalist, Semantic, Lexicon, Nomina, Stet,
Archetype). A founder should be able to hear the name once, out loud, in a
noisy room, and remember it 10 minutes later — reject anything that fails
that test.

Reject names longer than 3 syllables.

Reject any name that is already a known, existing brand, product, or
company in ANY industry, even if that industry is different from this
business. If you are unsure whether a name already exists, do not use it.

NEVER suggest any of the following names under any circumstances — each has
been manually confirmed as a real, existing brand or company:
Moniker, Foundry, Stance, Kith, Archetype, Ontology, Nominalist, Nomina,
Stet, Vowel, Vera, Alias, Caption, Semantic.

Only keep the strongest five.

Rules

- Every name must feel intentional.
- Every explanation must reference THIS business.
- Never explain another industry.
- Avoid generic AI names like TechNova, Brandify, Innovix, Nexify, Lumora, Velora unless they genuinely fit.
- Mix short and long names.
- Prefer names that are memorable.
- Prefer names that are pronounceable.
- Prefer names that can become premium brands.
- Avoid obvious clichés.
- Make every result feel like it came from a professional naming consultancy.

Business Description

${description}

Industry

${industry || "Infer from the business description."}

Keywords

${keywords || "None"}

Return ONLY valid JSON. No markdown, no code fences, no commentary outside the JSON.

Format:

[
  {
    "name": "",
    "style": "",
    "reason": "",
    "personality": ["", "", ""]
  }
]
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });

    const rawText = response.text ?? "";
    const cleaned = rawText.replace(/```json|```/g, "").trim();

    let candidates: { name: string; style: string; reason: string; personality: string[] }[];
    try {
      candidates = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("Failed to parse Gemini response as JSON:", rawText);
      return Response.json(
        { error: "Failed to generate names." },
        { status: 500 }
      );
    }

    // Check .com and .co for each candidate. .com availability is treated
    // as the real signal for "is this name likely already a brand" — a
    // taken .com is a warning, not just a neutral data point. .co being
    // free is shown only as a fallback option, never as equal to .com.
    const checked = await Promise.all(
      candidates.map(async (candidate) => {
        const slug = candidate.name.toLowerCase().replace(/[^a-z0-9]/g, "");
        const [comAvailable, coAvailable] = await Promise.all([
          checkDomainStatus(`${slug}.com`),
          checkDomainStatus(`${slug}.co`),
        ]);

        let trustLevel: "safe" | "caution" | "risky";
        let note: string;

        if (comAvailable) {
          trustLevel = "safe";
          note = "The .com is free — a clean, low-risk name.";
        } else if (coAvailable) {
          trustLevel = "caution";
          note =
            "The .com is already registered. This doesn't always mean a real conflict — it depends on whether the existing site is in the same industry. Worth a quick manual search before committing.";
        } else {
          trustLevel = "risky";
          note =
            "Both .com and .co are taken. Search the name manually to check whether it's a genuine same-industry conflict, or just an unrelated business holding the domain.";
        }

        return {
          ...candidate,
          domains: {
            com: { domain: `${slug}.com`, available: comAvailable },
            co: { domain: `${slug}.co`, available: coAvailable },
          },
          trustLevel,
          domainNote: note,
        };
      })
    );

    // No filtering — always return all candidates, now flagged with
    // trust context instead of being silently hidden.
    return Response.json({ response: JSON.stringify(checked) });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to generate names." },
      { status: 500 }
    );
  }
}