"use client";
import { useState } from "react";

export type BrandResult = {
  name: string; style: string; reason: string; personality: string[]; confidence?: string;
  domainCheckFailed?: boolean;
  domains?: { com: { domain: string; available: boolean }; co: { domain: string; available: boolean; checked?: boolean } };
  trustLevel?: "safe" | "caution" | "risky"; domainNote?: string;
};

const trustStyles = {
  safe: { badge: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300", label: ".com available" },
  caution: { badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300", label: ".com taken, worth checking" },
  risky: { badge: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300", label: ".com and .co taken, worth checking" },
  unknown: { badge: "bg-line text-muted", label: "Check availability manually" },
};

export default function ResultCard({ result }: { result: BrandResult }) {
  const [copied, setCopied] = useState(false);
  const trust = result.domainCheckFailed ? trustStyles.unknown : result.trustLevel ? trustStyles[result.trustLevel] : null;
  const q = encodeURIComponent(result.name);
  const link = "text-accent underline underline-offset-2 hover:opacity-80";

  return (
    <article className="rounded-3xl border border-line bg-card p-6 sm:p-8">
      <h3 className="break-words font-display text-3xl">{result.name}</h3>
      <p className="mt-2 text-sm font-medium text-accent">{result.style}</p>
      {trust && <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${trust.badge}`}>{trust.label}</span>}
      <p className="mt-4 leading-7 text-muted">{result.reason}</p>
      {result.confidence === "low" && <p className="mt-3 text-sm leading-6 text-amber-700 dark:text-amber-400">Meaning not fully verified. Please confirm any local-word meaning before using this name.</p>}
      {result.domainNote && <p className="mt-3 text-sm leading-6 text-muted">{result.domainNote}</p>}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
        <a className={link} target="_blank" rel="noopener noreferrer" href={`https://tmsearch.uspto.gov/search/search-information?searchText=${q}`}>Check USPTO (US)</a>
        <a className={link} target="_blank" rel="noopener noreferrer" href={`https://www.tmdn.org/tmview/#/tmview/results?criteria=${q}`}>Check TMView (Global)</a>
        <a className={link} target="_blank" rel="noopener noreferrer" href="https://pre.cac.gov.ng/home">Check CAC (Nigeria)</a>
      </div>
      <ul className="mt-5 flex flex-wrap gap-2">
        {result.personality.map((t) => <li key={t} className="rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">{t}</li>)}
      </ul>
      <button onClick={async () => { try { await navigator.clipboard.writeText(result.name); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {} }}
        className={`mt-6 rounded-xl px-6 py-3 font-medium text-white transition active:scale-95 focus-visible:ring-2 focus-visible:ring-accent/50 ${copied ? "bg-green-600" : "bg-[#2E5DE6] hover:bg-[#1A3BB0]"}`}>
        {copied ? "Copied" : "Copy name"}
      </button>
    </article>
  );
}