"use client";

import { useState } from "react";

export type BrandResult = {
  name: string;
  style: string;
  reason: string;
  personality: string[];
};

type ResultCardProps = {
  result: BrandResult;
};

export default function ResultCard({
  result,
}: ResultCardProps) {

  const [copied, setCopied] = useState(false);

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition hover:shadow-xl">

      <div className="flex items-start justify-between gap-6">

        <div className="flex-1">

          <h3 className="font-display text-2xl text-gray-900">
            {result.name}
          </h3>

          <p className="mt-2 text-sm font-medium uppercase tracking-wide text-violet-600">
  {result.style}
</p>

          <p className="mt-4 leading-7 text-gray-600">
            {result.reason}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {result.personality.map((trait) => (
              <span
                key={trait}
               className="inline-flex items-center rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 dark:bg-violet-700 dark:text-white"
              >
                {trait}
              </span>
            ))}
          </div>

        </div>

        <button
  onClick={() => {
    navigator.clipboard.writeText(result.name);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }}
  className={`rounded-xl px-6 py-3 font-medium text-white transition duration-200 active:scale-95 ${
    copied
      ? "bg-green-600 hover:bg-green-700"
      : "bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-400"
  }`}
>
{copied ? "✓ Copied" : "Copy Name"}
</button>

      </div>

    </div>
  );
}