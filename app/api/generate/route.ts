import { GoogleGenAI } from "@google/genai";

// Three Gemini calls + domain checks can exceed the default timeout.
export const maxDuration = 120;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const MODEL = "gemini-3.1-flash-lite";
// Optional: set GEMINI_CRITIC_MODEL in .env.local / Vercel to a stronger model
// for the judging step only. Falls back to MODEL if not set.
const CRITIC_MODEL = process.env.GEMINI_CRITIC_MODEL || MODEL;
// Model that writes the names. Falls back to MODEL (reliable) if it stays overloaded.
const NAME_MODEL = process.env.GEMINI_NAME_MODEL || MODEL;

const CANDIDATE_COUNT = 12;
const FINAL_COUNT = 5;
// Judge picks this many; domain checks then choose the best FINAL_COUNT of them.
const SHORTLIST_COUNT = 8;

const BLOCKLIST = [
  "Moniker", "Foundry", "Stance", "Kith", "Archetype", "Ontology",
  "Nominalist", "Nomina", "Stet", "Vowel", "Vera", "Alias", "Caption",
  "Semantic", "PesaFlow", "Ankly", "Crumbly",
];

const LEVEL_RULES: Record<string, string> = {
  Direct:
    "DIRECT: every name must plainly state what the business does or sells. Descriptive and literal is correct here.",
  Suggestive:
    "SUGGESTIVE: every name must hint at the benefit or experience without being literal. Use real words, word-parts or meaningful blends. Do NOT return meaningless invented words.",
  Conceptual:
    "CONCEPTUAL: every name must carry an idea or feeling, with no product words. Use metaphor or imagery. Do NOT use words or roots from the business's own field (a law firm must not get verity, seal, glyph or similar). Draw on nature, place, story or feeling instead.",
  Abstract:
    "ABSTRACT: every name must be an invented word with no recognisable product, industry, place or English word inside it, and no blends of real words. The word must NOT be a real word in any major language (English, French, Latin, Spanish, Swahili, Yoruba, Igbo, Hausa and others). Sound and feel only. Set style to \"Abstract\" for each.",
};

const EXTRACT_PROMPT = `
You are a brand strategist. Read the business description and return ONLY valid JSON in the schema below. Do not generate names. Do not invent facts; use null or [] when unsure.

Rules:
- concepts: 5-10 concrete words or ideas taken from the description (products, materials, actions, benefits).
- If the user typed a region, use it (source "user_input"). Otherwise detect one from the description (source "detected"), or set value null (source "none").
- founder_name: the founder or owner's name ONLY if the description states one, else null. A business named after a person (for example "Adebayo Law Chambers") counts: founder_name is that person's name. Never invent it.
- origin_place: the town or city where the business is based or started ONLY if explicitly stated, else null. Never invent it.
- local_references: culturally relevant terms, places or materials for that region, only if you are confident they are real and correct.

SCHEMA:
{
  "offer": "string",
  "audience": "string",
  "concepts": ["string"],
  "feelings": ["string"],
  "region": {
    "value": "string|null",
    "source": "user_input|detected|none",
    "confidence": "high|medium|low"
  },
  "local_references": ["string"],
  "founder_name": "string|null",
  "origin_place": "string|null"
}
`;

const NAMING_PROMPT = `
You are a world-class Brand Naming Strategist with 20+ years of experience naming startups, luxury brands, fashion labels, churches, nonprofits, fintech companies and AI products.

Using the BRIEF below, generate exactly {count} strong, distinct candidate names. They will be judged afterwards and only the best few will be kept, so aim for range and quality, not filler.

Meaning level chosen by the user: {level}
{level_rule}

Styles to mix (choose what fits): Descriptive, Suggestive, Founder-inspired, Geography-inspired (named after a founding town, river or region), Blend (fuse two meaningful roots into one clean, pronounceable word), Local-reference (only from brief.local_references).

Rules:
- Return exactly {count} names, never fewer.
- KEYWORDS: {keywords}. If keywords are given, at least half of the names must visibly reflect them.
- Build every name from brief.concepts, brief.feelings or brief.local_references (except Abstract names).
- Every "reason" must reference THIS business and explain why the name exists.
- If a name uses a local-language word and you are not fully sure of its meaning or tone, set "confidence" to "low" and say so in the reason.
- FOUNDER/PLACE: if brief.founder_name or brief.origin_place is not null and the level is not Abstract, include at least one Founder-inspired name (built from founder_name, if given) and/or one Geography-inspired name (built from origin_place, if given), and say so in its style. If both are null, never invent a founder or place.
- INVENTED PARTS: if any part of a name is not a real word or a real piece of a word (for example a made-up ending), set "confidence" to "low" and say in the reason that this part is invented for sound. Never present an invented part as having a meaning. This rule does NOT apply at the Abstract level, where every name is invented: keep confidence "high" there unless the word looks like a real word in a major language.
- PERSONALITY: give 3 traits per name that are specific to THAT name. No trait may appear on more than 2 of the {count} names. Avoid overused words (Elegant, Sophisticated, Regal, Professional, Reliable, Secure) unless they truly fit.
- REGION: when brief.region.value is set, at least 2 names must draw on that region's own languages, places or culture, not only Latin or Greek roots. Follow the confidence and honesty rules for any local word.
- SENSE CHECK: before keeping a name, ask what a stranger would think it means. Reject it if it implies a different industry (for example a loan-sounding name for a law firm) or a wrong benefit.
- HONEST REASONS: state the real origin of the name. Never invent a meaning, etymology or word-part that is not really there. If you are not sure a foreign word means what you claim, set confidence to "low" or drop the name.
- VARIETY: the names must use different constructions. At most two may be a local word plus an English word. Include at least two short, unexpected names. (Direct level may be more literal.)
- Avoid obvious combinations of a common word plus Pay, Flow, Node, Hub or Desk. Prefer fresher, less predictable constructions.
- LENGTH: names must be 5 to 9 letters, one word. Do NOT return 2 to 4 letter names. Avoid plain dictionary words (Basis, Marked, Seal, Pacta): their domains and trademarks are almost always taken. Prefer coined or blended words that are still easy to say.
- Prefer max 3 syllables. Names must be easy to say once, out loud, and remember.
- ORIGIN CHECK: a Founder-inspired or Geography-inspired name must visibly contain real letters of that founder name or place (for example Ilorin gives Ilo or Lorin). Never say a name comes from a place or word unless its letters really do.
- CONCEPTUAL AND ABSTRACT: legal, finance or other industry words are not allowed at these levels.
- Reject names that sound academic, philosophical or clinical (e.g. Ontology, Nominalist, Semantic, Lexicon).
- Reject any name that is already a known brand, product or company in ANY industry. If unsure, do not use it.
- Avoid generic AI-sounding names (TechNova, Brandify, Innovix, Nexify, Lumora, Velora).
- NEVER suggest: {blocklist}

BRIEF:
{brief}

Return ONLY valid JSON. No markdown, no code fences, no commentary.

Format:
[
  {
    "name": "",
    "style": "",
    "reason": "",
    "personality": ["", "", ""],
    "confidence": "high|medium|low"
  }
]
`;

const CRITIC_PROMPT = `
You are a tough, honest brand-naming judge. Score every candidate name for the business below. Return ONLY valid JSON.

For each name give integer scores from 1 to 10:
- memorability: easy to remember after hearing it once
- pronounceability: easy to say aloud correctly on first read
- fit: matches the offer, audience, region and the chosen meaning level
- originality: fresh, not generic or predictable

Also give one "flag":
- "known_brand": it is, or closely resembles, an existing brand, product or company in any industry
- "wrong_industry": a stranger would guess a different industry or benefit
- "unclear_meaning": confusing or accidentally negative in a major language
- "off_level": breaks the chosen meaning level (for example product or industry words in a Conceptual name, or a real word in an Abstract name)
- "false_meaning": claims an origin that is not really in the letters (for example saying a name comes from a place when its letters do not)
- "generic": bland, template-like, an obvious common-word blend, or a plain dictionary word that will surely have its domain taken
- "none": no problem

Be strict. Use the full range of scores. Do not give every name a high score.
Meaning level: {level}. {level_note}

KEYWORDS: {keywords}

BRIEF:
{brief}

CANDIDATES:
{candidates}

Return ONLY a JSON array, one object per candidate, using the exact candidate name:
[{"name":"","memorability":0,"pronounceability":0,"fit":0,"originality":0,"flag":"none"}]
`;

// ---------- Domain checks (credit-friendly) ----------

const DOMAIN_CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours
const domainCache = new Map<string, { value: boolean; at: number }>();

async function checkDomainStatus(domain: string): Promise<boolean | null> {
  const apiKey = process.env.WHOISXML_API_KEY;
  if (!apiKey) return null;

  // Serve definitive answers from cache so repeat names cost no credits.
  const cached = domainCache.get(domain);
  if (cached && Date.now() - cached.at < DOMAIN_CACHE_TTL_MS) {
    return cached.value;
  }

  const url = `https://domain-availability.whoisxmlapi.com/api/v1?apiKey=${encodeURIComponent(
    apiKey
  )}&domainName=${encodeURIComponent(domain)}&outputFormat=JSON`;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const status = data?.DomainInfo?.domainAvailability;
    if (status === "AVAILABLE") {
      domainCache.set(domain, { value: true, at: Date.now() });
      return true;
    }
    if (status === "UNAVAILABLE") {
      domainCache.set(domain, { value: false, at: Date.now() });
      return false;
    }
    return null;
  } catch (err) {
    console.error(`Domain check failed for ${domain}:`, err);
    return null;
  }
}

// ---------- Helpers ----------

function parseJson<T>(raw: string): T | null {
  try {
    return JSON.parse(raw.replace(/```json|```/g, "").trim()) as T;
  } catch {
    return null;
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Calls Gemini with a timeout and retries (503 "high demand" errors are usually
// temporary). Returns the response text, or null if every attempt failed.
async function callGemini(
  model: string,
  contents: string,
  tries = 3
): Promise<string | null> {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await Promise.race([
        ai.models.generateContent({
          model,
          contents,
          config: { responseMimeType: "application/json" },
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 25000)
        ),
      ]);
      return res.text ?? "";
    } catch (err) {
      console.error(
        `Gemini call failed (${model}, attempt ${i + 1}/${tries}):`,
        err instanceof Error ? err.message.slice(0, 160) : err
      );
      if (i < tries - 1) await sleep(1500 * (i + 1));
    }
  }
  return null;
}

type Candidate = {
  name: string;
  style: string;
  reason: string;
  personality: string[];
  confidence?: string;
};

type Score = {
  name: string;
  memorability: number;
  pronounceability: number;
  fit: number;
  originality: number;
  flag: string;
};

async function generateCandidates(prompt: string): Promise<Candidate[] | null> {
  let text = await callGemini(NAME_MODEL, prompt, 2);
  if (text === null && NAME_MODEL !== MODEL) {
    text = await callGemini(MODEL, prompt, 2);
  }
  if (text === null) return null;
  const parsed = parseJson<Candidate[]>(text);
  return Array.isArray(parsed)
    ? parsed.filter((c) => c && typeof c.name === "string" && c.name.trim())
    : null;
}

// Second pass: score all candidates and keep the best `count`.
// If anything fails, fall back to the first `count` candidates.
async function pickBest(
  candidates: Candidate[],
  brief: unknown,
  level: string,
  keywords: string,
  count: number = FINAL_COUNT
): Promise<Candidate[]> {
  const fallback = candidates.slice(0, count);
  if (candidates.length <= count) return fallback;

  try {
    const levelNote =
      level === "Abstract"
        ? "Invented words are correct at this level, so never use the flag unclear_meaning unless the word means something bad in a major language."
        : "Judge fit against this level's intent.";

    const list = candidates
      .map((c) => `- ${c.name} (${c.style}): ${c.reason}`)
      .join("\n");

    const prompt = CRITIC_PROMPT
      .replace("{level}", () => level)
      .replace("{level_note}", () => levelNote)
      .replace("{keywords}", () => keywords || "None")
      .replace("{brief}", () => JSON.stringify(brief, null, 2))
      .replace("{candidates}", () => list);

    // Try the critic model twice; if it stays overloaded, judge with the base model.
    let text = await callGemini(CRITIC_MODEL, prompt, 2);
    if (text === null && CRITIC_MODEL !== MODEL) {
      text = await callGemini(MODEL, prompt, 2);
    }
    if (text === null) return fallback;

    const scores = parseJson<Score[]>(text);
    if (!Array.isArray(scores)) return fallback;

    const byName = new Map<string, Score>();
    for (const s of scores) {
      if (s && typeof s.name === "string") {
        byName.set(s.name.toLowerCase(), s);
      }
    }

    const ranked = candidates.map((c) => {
      const s = byName.get(c.name.toLowerCase());
      const total = s
        ? (Number(s.memorability) || 0) +
          (Number(s.pronounceability) || 0) +
          (Number(s.fit) || 0) +
          (Number(s.originality) || 0)
        : 0;
      const flagged = s ? s.flag !== "none" : false;
      return { c, total, flagged };
    });

    // Unflagged names first (best score first), flagged names only as filler.
    const good = ranked.filter((r) => !r.flagged).sort((a, b) => b.total - a.total);
    const flagged = ranked.filter((r) => r.flagged).sort((a, b) => b.total - a.total);

    return [...good, ...flagged].slice(0, count).map((r) => r.c);
  } catch (err) {
    console.error("Critique step failed, using first candidates:", err);
    return fallback;
  }
}

export async function POST(request: Request) {
  try {
    const { description, industry, keywords, region, level } =
      await request.json();

    const meaningLevel = level || "Suggestive";

    let brief: unknown = {
      offer: description,
      audience: null,
      concepts: [],
      feelings: [],
      region: {
        value: region || null,
        source: region ? "user_input" : "none",
        confidence: "low",
      },
      local_references: [],
      founder_name: null,
      origin_place: null,
    };

    const briefText = await callGemini(
      MODEL,
      `${EXTRACT_PROMPT}
DESCRIPTION: ${description}
INDUSTRY: ${industry || "Infer from the description."}
KEYWORDS: ${keywords || "None"}
USER-TYPED REGION: ${region || "None"}`,
      3
    );
    if (briefText) {
      const parsedBrief = parseJson<unknown>(briefText);
      if (parsedBrief) brief = parsedBrief;
    } else {
      console.error("Extraction step failed, using fallback brief.");
    }

    const namingPrompt = NAMING_PROMPT
      .replace(/\{count\}/g, String(CANDIDATE_COUNT))
      .replace("{level}", () => meaningLevel)
      .replace("{level_rule}", () => LEVEL_RULES[meaningLevel] || LEVEL_RULES.Suggestive)
      .replace("{keywords}", () => keywords || "None")
      .replace("{blocklist}", () => BLOCKLIST.join(", "))
      .replace("{brief}", () => JSON.stringify(brief, null, 2));

    const isBlocked = (c: Candidate) =>
      BLOCKLIST.some((b) => c.name.toLowerCase().includes(b.toLowerCase()));

    const first = await generateCandidates(namingPrompt);

    if (!first) {
      console.error("Failed to parse Gemini response as JSON");
      return Response.json(
        { error: "Failed to generate names." },
        { status: 500 }
      );
    }

    let pool = first.filter((c) => !isBlocked(c));

    // If the pool is too small to judge, ask once more and merge.
    if (pool.length < 8) {
      const more = await generateCandidates(
        namingPrompt +
          `\n\nYour previous answer had too few usable names. Return exactly ${CANDIDATE_COUNT} completely different names.`
      );
      if (more) {
        const seen = new Set(pool.map((c) => c.name.toLowerCase()));
        for (const c of more) {
          if (!isBlocked(c) && !seen.has(c.name.toLowerCase())) {
            pool.push(c);
            seen.add(c.name.toLowerCase());
          }
        }
      }
    }

    // De-duplicate by name.
    const uniq = new Map<string, Candidate>();
    for (const c of pool) {
      if (!uniq.has(c.name.toLowerCase())) uniq.set(c.name.toLowerCase(), c);
    }
    pool = Array.from(uniq.values());

    // Judge the pool and keep a shortlist of the best names.
    const shortlist = await pickBest(
      pool,
      brief,
      meaningLevel,
      keywords || "",
      SHORTLIST_COUNT
    );

    const slugOf = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, "");

    // Check .com for the shortlist (one credit each), then show the best 5:
    // names with a free .com first, in the judge's order, then the rest.
    const comResults = await Promise.all(
      shortlist.map(async (c) => {
        const slug = slugOf(c.name);
        const com = slug ? await checkDomainStatus(`${slug}.com`) : null;
        return { c, com };
      })
    );
    const free = comResults.filter((r) => r.com === true);
    const unknown = comResults.filter((r) => r.com === null);
    const taken = comResults.filter((r) => r.com === false);
    const finalists = [...free, ...unknown, ...taken].slice(0, FINAL_COUNT);

    // .co is checked only for finalists whose .com is taken.
    const checked = await Promise.all(
      finalists.map(async ({ c: candidate, com: comAvailable }) => {
        const slug = slugOf(candidate.name);

        let coAvailable: boolean | null = null;
        if (comAvailable === false) {
          coAvailable = await checkDomainStatus(`${slug}.co`);
        }

        let trustLevel: "safe" | "caution" | "risky";
        let note: string;

        if (comAvailable === null) {
          trustLevel = "caution";
          note = "Domain check unavailable. Search the name manually before committing.";
        } else if (comAvailable) {
          trustLevel = "safe";
          note = "The .com is free, a clean, low-risk name.";
        } else if (coAvailable) {
          trustLevel = "caution";
          note =
            "The .com is already registered. This doesn't always mean a real conflict. It depends on whether the existing site is in the same industry. Worth a quick manual search before committing.";
        } else {
          trustLevel = "risky";
          note =
            "Both .com and .co are taken (or the .co check was unavailable). Search the name manually to check whether it's a genuine same-industry conflict, or just an unrelated business holding the domain.";
        }

        return {
          ...candidate,
          domains: {
            com: { domain: `${slug}.com`, available: comAvailable === true },
            // `checked` is false when .co was skipped because the .com is free.
            co: {
              domain: `${slug}.co`,
              available: coAvailable === true,
              checked: coAvailable !== null,
            },
          },
          domainCheckFailed: comAvailable === null,
          trustLevel,
          domainNote: note,
        };
      })
    );

    return Response.json({
      response: JSON.stringify(checked),
      brief,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to generate names." },
      { status: 500 }
    );
  }
}
