import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(request: Request) {
  try {
    const { description, industry, keywords } = await request.json();

    const prompt = `
You are a world-class Brand Naming Strategist.

You have over 20 years of experience naming companies, startups, luxury brands, law firms, fashion labels, churches, nonprofits, fintech companies, AI products, SaaS businesses, consulting firms, restaurants, beauty brands, healthcare companies and consumer products.

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
- Compound
- Classical
- Latin-inspired
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

Only keep the strongest five.

Rules

• Every name must feel intentional.
• Every explanation must reference THIS business.
• Never explain another industry.
• Avoid generic AI names like TechNova, Brandify, Innovix, Nexify, Lumora, Velora unless they genuinely fit.
• Mix short and long names.
• Prefer names that are memorable.
• Prefer names that are pronounceable.
• Prefer names that can become premium brands.
• Avoid obvious clichés.
• Make every result feel like it came from a professional naming consultancy.

Business Description

${description}

Industry

${industry || "Infer from the business description."}

Keywords

${keywords || "None"}

Return ONLY valid JSON.

Format:

[
  {
    "name": "",
    "style": "",
    "reason": "",
    "personality": [
      "",
      "",
      ""
    ]
  }
]
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
      contents: prompt,
    });
    console.log(response.text);
    return Response.json({
      response: response.text,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to generate names." },
      { status: 500 }
    );
  }
}