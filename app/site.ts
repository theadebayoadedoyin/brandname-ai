// Change this one value (or set NEXT_PUBLIC_SITE_URL in Vercel) when lexiomark.com is live.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brandname-ai-six.vercel.app";

export const FAQ = [
  { q: "What is LexioMark?", a: "LexioMark AI is a brand name generator for founders. You describe your business and it returns names with the strategic reasoning behind each one." },
  { q: "How is it different from other business name generators?", a: "Most tools return a list of random words. LexioMark starts from your audience, industry, region and how literal you want the name to be, then explains why each name fits." },
  { q: "Does it check if the domain is available?", a: "Yes. Every name gets a .com and .co check. A taken domain is flagged as worth a manual search. It does not mean the name is off limits." },
  { q: "Do I still need a trademark search?", a: "Yes. Every result links to USPTO, TMView and Nigeria's CAC search. Search before you commit, and speak to a trademark attorney for anything important." },
  { q: "Does it work for African businesses?", a: "Yes. Add your country or region and the names account for local language and context. If a local-word meaning is not fully verified, the result says so." },
];