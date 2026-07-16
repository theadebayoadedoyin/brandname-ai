"use client";

import { useEffect, useState } from "react";

import Hero from "./components/Hero";
import SearchForm from "./components/SearchForm";
import LoadingOverlay from "./components/LoadingOverlay";
import ResultCard, { BrandResult } from "./components/ResultCard";
export default function Home() {
  const words = ["Find", "Generate", "Create", "Discover"];

  const loadingMessages = [
    "Understanding your business...",
    "Identifying your audience...",
    "Analyzing your positioning...",
    "Exploring strategic naming directions...",
    "Crafting memorable brand names...",
  ];

  const [currentWord, setCurrentWord] = useState(0);

  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [industry, setIndustry] = useState("");

  const [results, setResults] = useState<BrandResult[]>([]);

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
    <main className="min-h-screen bg-white dark:bg-zinc-950 transition-colors">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl bg-white p-7 shadow-2xl">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
  BrandName AI
</p>
            <p className="mt-2 text-center text-sm text-gray-500">
  Please wait while we create strategic brand names.
</p>
<h2 className="mt-3 text-lg font-medium leading-relaxed text-gray-900">
  {loadingMessages[loadingStep]}
</h2>
<p className="mt-4 text-sm text-gray-500">
  This usually takes just a few seconds.
</p>
<div className="mt-6 h-1.5 overflow-hidden rounded-full bg-gray-200">
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

        <h1 className="mt-6 font-display text-5xl leading-tight tracking-tight text-gray-900 dark:text-white md:text-7xl">
          <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-red-400 bg-clip-text text-transparent">
            {words[currentWord]}
          </span>{" "}
          strategic brand names
          <br />
          people remember.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
          Describe your business and receive strategic brand names with
          thoughtful explanations—not random AI suggestions.
        </p>
        <div className="mt-10">
  <a
    href="#generator"
    className="inline-flex items-center rounded-xl bg-violet-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-violet-700"
  >
    Generate Brand Names
  </a>
</div>
        <div className="mt-8 flex flex-wrap gap-8 text-sm text-gray-500 dark:text-gray-400">
          <span> Strategic naming</span>
          <span> Humane explanations</span>
          <span> Built for founders</span>
        </div>
        <section className="mt-24">
  <div className="text-center">
    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
      Why BrandName AI
    </p>

    <h2 className="mt-3 font-display text-4xl text-gray-900 dark:text-white">
      Strategic naming,
      <br />
      built for founders.
    </h2>

    <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
      BrandName AI doesn't generate random names.
      It thinks like a brand strategist before making recommendations.
    </p>
  </div>

  <div className="mt-14 grid gap-8 md:grid-cols-3">

    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-slate-900">
      <div className="text-3xl">🧠</div>

      <h3 className="mt-5 text-xl font-semibold text-gray-900 dark:text-white">
        Strategic, not random
      </h3>

      <p className="mt-3 text-gray-600 dark:text-gray-300">
        Every suggestion is generated from your business,
        audience, positioning and industry.
      </p>
    </div>

    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-slate-900">
      <div className="text-3xl">🎯</div>

      <h3 className="mt-5 text-xl font-semibold text-gray-900 dark:text-white">
        Built for founders
      </h3>

      <p className="mt-3 text-gray-600 dark:text-gray-300">
        Designed for startups, creators,
        agencies and ambitious businesses.
      </p>
    </div>

    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-slate-900">
      <div className="text-3xl">✨</div>

      <h3 className="mt-5 text-xl font-semibold text-gray-900 dark:text-white">
        Every name has a story
      </h3>

      <p className="mt-3 text-gray-600 dark:text-gray-300">
        Understand why every recommendation
        works with thoughtful explanations and
        personality traits.
      </p>
    </div>

  </div>
</section>
        <div
  id="generator"
  className="mt-16 rounded-3xl border border-gray-200 bg-white p-10 shadow-xl dark:border-gray-700 dark:bg-slate-900"
>

          <form className="space-y-8">
          <div>
              <div className="mb-3">
                <label className="block text-base font-semibold text-gray-900 dark:text-white">
                  Business Description
                </label>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Tell us what your business does, who it serves, and what
                  makes it different.
                </p>
              </div>

              <textarea
  rows={5}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:bg-gray-800 dark:text-white focus:border-violet-500 focus:outline-none"
  placeholder="e.g. We create premium Christian apparel that helps young believers wear their faith confidently."
/>
            </div>

            <div>
              <div className="mb-3">
              <label className="block text-base font-semibold text-gray-900 dark:text-white">
  Industry
</label>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Choose the industry your business belongs to.
                </p>
              </div>

              <select
  value={industry}
  onChange={(e) => setIndustry(e.target.value)}
  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:bg-gray-800 dark:text-white focus:border-violet-500 focus:outline-none"
>
  <option value="">Select Industry</option>
  <option value="Fashion">Fashion</option>
  <option value="Law">Law</option>
  <option value="Technology">Technology</option>
  <option value="Healthcare">Healthcare</option>
  <option value="Education">Education</option>
  <option value="Creative Agency">Creative Agency</option>
  <option value="Finance">Finance</option>
  <option value="Hospitality">Hospitality</option>
  <option value="Real Estate">Real Estate</option>
  <option value="Other">Other</option>
</select>
            </div>

            <div>
              <div className="mb-3">
                <label className="block text-base font-semibold text-gray-900 dark:text-white">
                  Keywords
                  <span className="ml-1 font-normal text-gray-500 ">
                    (Optional)
                  </span>
                </label>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Separate keywords with commas.
                </p>
              </div>

              <input
  type="text"
  value={keywords}
  onChange={(e) => setKeywords(e.target.value)}
  placeholder="Luxury, modern, bold..."
  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 focus:border-violet-500 focus:outline-none"
/>
            </div>

            <button
              type="button"
              onClick={async () => {
                setShowResults(false);
                setIsLoading(true);

                console.log({
                  description,
                  keywords,
                });
                
                try {
                  const response = await fetch("/api/generate", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      description,
                      industry,
                      keywords,
                    })
                  });
              
                  const data = await response.json();

const parsed: BrandResult[] = JSON.parse(data.response);

setResults(parsed);
console.log(parsed);             
                  console.log(data);
              
                
              
                  setShowResults(true);
                } catch (error) {
                  console.error(error);
                } finally {
                  setIsLoading(false);
                }
              }}
              className="w-full rounded-xl bg-black py-4 text-lg font-semibold text-white transition duration-300 hover:scale-[1.01] hover:bg-gray-900"
            >
              Generate Strategic Names
            </button>

          </form>
        </div>

        {showResults && (
  <div className="mt-16 space-y-6">
    <h2 className="font-display text-4xl text-gray-900 dark:text-white">
  Suggested Brand Names
</h2>

<p className="mt-3 text-gray-600 dark:text-gray-300">
  Here are strategic names generated for your business.
</p>

    {results.map((result, index) => (
      <ResultCard
        key={index}
        result={result}
      />
    ))}
  </div>
)}

</div>
<footer className="mt-28 border-t border-gray-200 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 transition-colors">
<div className="mt-12 flex flex-col items-center gap-4 border-t border-gray-200 pt-8 text-center dark:border-zinc-800">

<p className="text-sm text-gray-500 dark:text-gray-400">
Helping founders build memorable brands.
</p>

<div className="flex gap-6 text-sm">
  <a
    href="#"
    className="text-gray-600 transition hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400"
  >
    Privacy
  </a>

  <a
    href="#"
    className="text-gray-600 transition hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400"
  >
    Terms
  </a>

  <a
    href="#"
    className="text-gray-600 transition hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400"
  >
    Contact
  </a>
</div>

<p className="text-xs text-gray-400">
  © 2026 BrandName AI · Designed & Built by Adebayo Adedoyin
</p>

</div>
</footer>
</main>
);
}