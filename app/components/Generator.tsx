"use client";
import { useEffect, useState } from "react";
import ResultCard, { BrandResult } from "./ResultCard";
import Reveal from "./Reveal";

const steps = ["Understanding your business...", "Identifying your audience...", "Analyzing your positioning...", "Exploring strategic naming directions...", "Crafting memorable brand names..."];
const examples = ["e.g. We create premium Christian apparel that helps young believers wear their faith confidently.", "e.g. A fintech app that helps market women save daily from their phones.", "e.g. A law firm helping startups handle contracts and intellectual property.", "e.g. A skincare line made with shea butter and moringa for sensitive skin."];
const industries = ["Fashion", "Law", "Technology", "Healthcare", "Education", "Creative Agency", "Finance", "Hospitality", "Real Estate", "Food & Beverage", "Fitness & Wellness", "Agriculture & Agritech", "E-commerce & Retail", "Logistics & Transportation", "Media & Entertainment", "Beauty & Personal Care", "Nonprofit & Faith-Based", "Consulting & Professional Services", "Other"];

export default function Generator() {
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [industry, setIndustry] = useState("");
  const [region, setRegion] = useState("");
  const [level, setLevel] = useState("Suggestive");
  const [results, setResults] = useState<BrandResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [ph, setPh] = useState(0);
  useEffect(() => { const t = setInterval(() => setPh((p) => (p + 1) % examples.length), 4000); return () => clearInterval(t); }, []);

  useEffect(() => {
    if (!isLoading) return;
    setStep(0);
    const t = setInterval(() => setStep((p) => (p < steps.length - 1 ? p + 1 : p)), 3500);
    return () => clearInterval(t);
  }, [isLoading]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) { setError("Describe your business first so the names fit it."); return; }
    setError(""); setShowResults(false); setIsLoading(true);
    const body = JSON.stringify({ description, industry, keywords, region, level });
    const attempt = async () => {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 110000);
      try {
        const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body, signal: ctrl.signal });
        const data = await res.json();
        if (!res.ok || data.error) return null;
        return JSON.parse(data.response) as BrandResult[];
      } catch { return null; } finally { clearTimeout(timer); }
    };
    // Retry once on our own, but only if the first try failed quickly.
    const t0 = Date.now();
    let out = await attempt();
    if (!out && Date.now() - t0 < 70000) out = await attempt();
    if (out) { setResults(out); setShowResults(true); }
    else setError("Our AI is very busy right now. Please try again in a minute. Your details are still here.");
    setIsLoading(false);
  }

  const label = "block text-base font-semibold";
  const hint = "mt-1 mb-3 text-sm leading-6 text-muted";

  return (
    <>
      {isLoading && (
        <div role="status" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl border border-line bg-card p-7 shadow-2xl">
            <p className="font-display text-xl">LexioMark</p>
            <h2 className="mt-4 text-lg leading-relaxed">{steps[step]}</h2>
            <p className="mt-2 text-sm text-muted">This can take up to a minute. Thanks for waiting.</p>
            <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
            </div>
          </div>
        </div>
      )}

      <Reveal className="relative isolate">
        <div aria-hidden className="blob -left-24 top-10 -z-10 h-72 w-72 bg-[#2E5DE6]" />
        <div aria-hidden className="blob -right-20 bottom-10 -z-10 h-64 w-64 bg-[#F2B84B]" style={{ animationDelay: "-6s" }} />
      <form onSubmit={submit} className="stagger space-y-7 rounded-3xl border border-line bg-card p-6 md:p-10">
        <div>
          <label htmlFor="desc" className={label}>Business description</label>
          <p className={hint}>What you do, who you serve, and what makes you different.</p>
          <textarea id="desc" rows={5} value={description} onChange={(e) => setDescription(e.target.value)} className="field" placeholder={examples[ph]} />
        </div>
        <div>
          <label htmlFor="ind" className={label}>Industry</label>
          <p className={hint}>Pick the closest fit.</p>
          <select id="ind" value={industry} onChange={(e) => setIndustry(e.target.value)} className="field">
            <option value="">Select industry</option>
            {industries.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="kw" className={label}>Keywords <span className="font-normal text-muted">(optional)</span></label>
          <p className={hint}>Separate with commas.</p>
          <input id="kw" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="Luxury, modern, bold" className="field" />
        </div>
        <div>
          <label htmlFor="rg" className={label}>Region <span className="font-normal text-muted">(optional)</span></label>
          <input id="rg" value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Country or region, e.g. Kenya" className="field mt-3" />
        </div>
        <div>
          <label htmlFor="lv" className={label}>How should the name relate to your business?</label>
          <select id="lv" value={level} onChange={(e) => setLevel(e.target.value)} className="field mt-3">
            <option value="Direct">Direct: says what I do</option>
            <option value="Suggestive">Suggestive: hints at what I do</option>
            <option value="Conceptual">Conceptual: carries an idea or feeling</option>
            <option value="Abstract">Abstract: distinctive, meaning built later</option>
          </select>
        </div>
        {error && <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}
        <button type="submit" className="w-full rounded-xl shine bg-gold py-4 text-lg font-semibold text-[#071039] transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-accent/50">Generate strategic names</button>
      </form>
      </Reveal>

      {showResults && (
        <div className="mt-16 space-y-6" aria-live="polite">
          <h2 className="font-display text-4xl">Your brand name options</h2>
          <p className="text-muted">Each name comes with the thinking behind it.</p>
          <div className="rounded-2xl border border-accent/30 bg-accent/10 p-5 text-sm leading-6">
            <span className="font-semibold">About the domain flags:</span> a taken .com does not always rule a name out. Two businesses in different industries can often share a name. A flag means &quot;spend two minutes searching before you commit.&quot;
          </div>
          {results.map((r, i) => <ResultCard key={i} result={r} />)}
        </div>
      )}
    </>
  );
}