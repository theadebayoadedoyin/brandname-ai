"use client";

import { useState } from "react";

export type BrandResult = {
  name: string;
  style: string;
  reason: string;
  personality: string[];
  domains?: {
    com: { domain: string; available: boolean };
    co: { domain: string; available: boolean };
  };
  trustLevel?: "safe" | "caution" | "risky";
  domainNote?: string;
};

type ResultCardProps = {
  result: BrandResult;
};

export default function ResultCard({ result }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const trustStyles = {
    safe: {
      badge: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
      label: "✓ .com available",
    },
    caution: {
      badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
      label: "⚠ .com taken — worth checking",
    },
    risky: {
      badge: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
      label: "⚠ .com and .co taken — worth checking",
    },
  };

  const trust = result.trustLevel ? trustStyles[result.trustLevel] : null;

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <h3 className="font-display text-2xl text-gray-900 dark:text-white">
            {result.name}
          </h3>

          <p className="mt-2 text-sm font-medium uppercase tracking-wide text-violet-600">
            {result.style}
          </p>

          {trust && (
            <span
              className={`mt-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${trust.badge}`}
            >
              {trust.label}
            </span>
          )}

          <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
            {result.reason}
          </p>

          {result.domainNote && (
            <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
              {result.domainNote}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            {result.personality.map((trait) => (
              <span
                key={trait}
                className="inline-flex items-center rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 dark:bg-violet-500/10 dark:text-violet-300"
              >
                {trait}
              </span>
            ))}
          </div>
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
        className={`mt-6 rounded-xl px-6 py-3 font-medium text-white transition duration-200 active:scale-95 ${
          copied
            ? "bg-green-600 hover:bg-green-700"
            : "bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-400"
        }`}
      >
        {copied ? "✓ Copied" : "Copy Name"}
      </button>
    </div>
  );
}
