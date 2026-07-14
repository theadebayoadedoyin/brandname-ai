"use client";

type HeroProps = {
  words: string[];
  currentWord: number;
};

export default function Hero({
  words,
  currentWord,
}: HeroProps) {
  return (
    <>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
        BrandName AI
      </p>

      <h1 className="mt-6 font-display text-5xl leading-tight tracking-tight text-gray-900 md:text-7xl">
        <span className="bg-gradient-to-r from-red-400 to-indigo-600 bg-clip-text text-transparent">
          {words[currentWord]}
        </span>{" "}
        strategic brand names
        <br />
        people remember.
      </h1>

      <div className="mt-8 flex flex-wrap gap-8 text-sm text-gray-500">
        <span>✓ Strategic naming</span>
        <span>✓ AI explanations</span>
        <span>✓ Built for founders</span>
      </div>
    </>
  );
}