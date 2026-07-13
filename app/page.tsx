"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const words = ["Find", "Generate", "Create", "Discover"];

  const loadingMessages = [
    "Understanding your business...",
    "Analyzing your industry...",
    "Crafting strategic brand names...",
    "Preparing your results...",
  ];

  const [currentWord, setCurrentWord] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    setLoadingStep(0);

    const interval = setInterval(() => {
      setLoadingStep((prev) =>
        prev < loadingMessages.length - 1 ? prev + 1 : prev
      );
    }, 700);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <main className="min-h-screen bg-gray-50">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl">

            <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              BrandName AI
            </p>

            <h2 className="mt-6 text-center font-display text-3xl text-gray-900">
              {loadingMessages[loadingStep]}
            </h2>

            <div className="mt-10 h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-violet-600 transition-all duration-700"
                style={{
                  width: `${
                    ((loadingStep + 1) / loadingMessages.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-5xl px-6 py-20">

        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          BrandName AI
        </p>

        <h1 className="mt-6 font-display text-5xl leading-tight tracking-tight text-gray-900 md:text-7xl">
          <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-red-400 bg-clip-text text-transparent">
            {words[currentWord]}
          </span>{" "}
          strategic brand names
          <br />
          people remember.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          Describe your business and receive strategic brand names with
          thoughtful explanations—not random AI suggestions.
        </p>

        <div className="mt-8 flex flex-wrap gap-8 text-sm text-gray-500">
          <span>✓ Strategic naming</span>
          <span>✓ AI explanations</span>
          <span>✓ Built for founders</span>
        </div>

        <div className="mt-16 rounded-3xl border border-gray-200 bg-white p-10 shadow-xl">

          <form className="space-y-8">
          <div>
              <div className="mb-3">
                <label className="block text-base font-semibold text-gray-900">
                  Business Description
                </label>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Tell us what your business does, who it serves, and what
                  makes it different.
                </p>
              </div>

              <textarea
                rows={5}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-violet-500 focus:outline-none"
                placeholder="e.g. We help small businesses build memorable brands through strategic design and AI..."
              />
            </div>

            <div>
              <div className="mb-3">
                <label className="block text-base font-semibold text-gray-900">
                  Industry
                </label>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Choose the industry your business belongs to.
                </p>
              </div>

              <select className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-violet-500 focus:outline-none">
                <option>Select Industry</option>
                <option>Technology / SaaS</option>
                <option>Web3 / Blockchain</option>
                <option>Fashion</option>
                <option>Beauty</option>
                <option>Finance</option>
                <option>Food & Beverage</option>
                <option>Health & Wellness</option>
                <option>Education</option>
                <option>E-commerce</option>
                <option>Creative Agency</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <div className="mb-3">
                <label className="block text-base font-semibold text-gray-900">
                  Keywords
                  <span className="ml-1 font-normal text-gray-500">
                    (Optional)
                  </span>
                </label>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Separate keywords with commas.
                </p>
              </div>

              <input
                type="text"
                placeholder="Luxury, modern, bold..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-violet-500 focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setShowResults(false);
                setIsLoading(true);

                setTimeout(() => {
                  setIsLoading(false);
                  setShowResults(true);
                }, 2800);
              }}
              className="w-full rounded-xl bg-black py-4 text-lg font-semibold text-white transition duration-300 hover:scale-[1.01] hover:bg-gray-900"
            >
              Generate Brand Names
            </button>

          </form>
        </div>

        {showResults && (
          <div className="mt-12 animate-[fadeIn_.5s_ease] space-y-6">

            <h2 className="font-display text-3xl text-gray-900">
              Suggested Brand Names
            </h2>

            <p className="text-gray-600">
              Here are strategic names generated for your business.
            </p>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
            <div className="flex items-center justify-between">

<h3 className="font-display text-4xl text-gray-900">
  Lumora
</h3>

<span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
  Excellent
</span>

</div>

<div className="mt-8 space-y-8">

<div>
  <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-500">
    Why it works
  </h4>

  <p className="mt-3 leading-8 text-gray-700">
    Lumora combines the ideas of light, clarity and innovation.
    It feels premium, memorable and modern while remaining easy
    to pronounce across different markets.
  </p>
</div>

<div>
  <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-500">
    Brand Personality
  </h4>

  <div className="mt-4 flex flex-wrap gap-3">

    <span className="rounded-full bg-gray-100 px-4 py-2 text-sm">
      Modern
    </span>

    <span className="rounded-full bg-gray-100 px-4 py-2 text-sm">
      Premium
    </span>

    <span className="rounded-full bg-gray-100 px-4 py-2 text-sm">
      Innovative
    </span>

  </div>
</div>

<button
  className="rounded-xl border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-100"
>
  Copy Name
</button>

</div>

</div>

</div>
)}

</div>

</main>
);
}