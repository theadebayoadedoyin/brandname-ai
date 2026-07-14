import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(request: Request) {
  try {
    const { description, industry, keywords } = await request.json();

    const prompt = `
You are a senior brand strategist.

Your task is to generate exactly 5 strategic brand names.

The names must be:
- memorable
- easy to pronounce
- distinctive
- premium
- suitable for modern startups
- not generic
- avoid obvious names like TechNova, Brandify, Innovix, etc.

Business Description:
${description}

Industry:
${industry}

Keywords:
${keywords}

For every suggestion provide:

Name:
Why it works:
Brand Personality:
- word 1
- word 2
- word 3

Return ONLY valid JSON in this format:

[
  {
    "name": "",
    "reason": "",
    "personality": []
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