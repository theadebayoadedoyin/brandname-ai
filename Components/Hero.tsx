"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const words = ["Find", "Generate", "Create", "Discover"];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
        BrandName AI
      </p>

      <h1 className="mt-6 font-display text-5xl leading-tight tracking-tight text-gray-900 md:text-7xl">
        <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
          {words[currentWord]}
        </span>{" "}
        strategic brand names
        <br />
        people remember.
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
        Describe your business and receive strategic brand names with thoughtful
        explanations—not random AI suggestions.
      </p>

      <div className="mt-8 flex flex-wrap gap-8 text-sm text-gray-500">
        <span>✓ Strategic naming</span>
        <span>✓ AI explanations</span>
        <span>✓ Built for founders</span>
      </div>
    </>
  );
}