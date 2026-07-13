"use client";

import { useEffect, useState } from "react";
export default function Home() {

  const words = ["Find", "Generate", "Create", "Discover"];

  const [currentWord, setCurrentWord] = useState(0);
const [showResults, setShowResults] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
    <div className="mx-auto flex max-w-5xl flex-col px-6 py-20">
  
  
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
        Describe your business and receive strategic brand names with thoughtful explanations—not random AI suggestions.
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
    Tell us what your business does, who it serves, and what makes it unique.
  </p>
</div>

              <textarea
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
                rows={5}
                placeholder="e.g. We help small businesses create memorable brands through strategic design and AI-powered insights..."
              />
            </div>

            <div>
            <div className="mb-3">
  <label className="block text-base font-semibold text-gray-900">
    Industry
  </label>

  <p className="mt-1 text-sm leading-6 text-gray-500">
    Choose the category that best represents your business.
  </p>
</div>

              <select className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-black focus:outline-none">
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
      Keywords <span className="font-normal text-gray-500">(Optional)</span>
    </label>

    <p className="mt-1 text-sm leading-6 text-gray-500">
      Add a few words you'd like the AI to consider, separated by commas.
    </p>
  </div>

  <input
    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
    placeholder="Luxury, modern, bold..."
  />
</div>

            <button className="w-full rounded-xl bg-black py-4 text-lg font-semibold text-white transition-all duration-200 hover:scale-[1.01] hover:bg-gray-800 active:scale-[0.99]">
            Generate Brand Names
            </button>
          </form>
        </div>
        <div className="mt-12 space-y-6">

  <h2 className="text-2xl font-semibold text-gray-900">
    Suggested Brand Names
  </h2>

  <p className="text-gray-600">
    Here are strategic names generated for your business.
  </p>
  <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">

<div className="flex items-center justify-between">

  <h3 className="font-display text-3xl text-gray-900">
    Lumora
  </h3>

  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
    Excellent
  </span>

</div>

<div className="mt-6 space-y-5">

  <div>
    <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
      Why it works
    </h4>

    <p className="mt-2 leading-7 text-gray-700">
      Lumora blends the idea of light, clarity, and innovation,
      making it memorable for modern brands while remaining easy
      to pronounce.
    </p>
  </div>

  <div>
    <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
      Brand Personality
    </h4>

    <div className="mt-3 flex flex-wrap gap-2">

      <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
        Modern
      </span>

      <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
        Premium
      </span>

      <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
        Innovative
      </span>

    </div>
  </div>

  <button className="rounded-xl border border-gray-300 px-5 py-2 font-medium transition hover:bg-gray-100">
    Copy Name
  </button>

</div>

</div>
</div>
      </div>
    </main>
  );
}