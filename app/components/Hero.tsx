"use client";
import { useEffect, useRef, useState } from "react";

const words = ["Find", "Generate", "Create", "Discover"];
// Add `src: "/hero/1.webp"` to any slide to use a real photo instead of the gradient.
const slides = [
  { name: "Kemetra", tag: "Conceptual", why: "Short, ownable and easy to say.", a: "#2E5DE6", b: "#F2B84B", src: "/hero/1.webp" },
  { name: "Ayomi", tag: "Suggestive", why: "Warm and personal. Easy to remember.", a: "#1A3BB0", b: "#6E92F2", src: "/hero/2.webp" },
  { name: "Northwell", tag: "Direct", why: "Says what it does. Clear in a pitch.", a: "#0F2270", b: "#2E5DE6", src: "/hero/3.webp" },
];

export default function Hero() {
  const [w, setW] = useState(0);
  const [s, setS] = useState(0);
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const a = setInterval(() => setW((p) => (p + 1) % words.length), 2200);
    const b = setInterval(() => setS((p) => (p + 1) % slides.length), 3800);
    const c = setTimeout(() => setOn(true), 1200);
    return () => { clearInterval(a); clearInterval(b); clearTimeout(c); };
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden"
      onPointerMove={(e) => {
        setOn(true);
        const el = ref.current!, r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}>
      {/* Dark only: orbit rings + cursor glow */}
      <svg aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 dark:block" viewBox="0 0 900 900" fill="none">
        <circle cx="450" cy="450" r="300" stroke="#fff" strokeOpacity=".06" />
        <circle cx="450" cy="450" r="420" stroke="#fff" strokeOpacity=".05" />
        <path d="M150 450A300 300 0 0 1 450 150" stroke="#6E92F2" strokeOpacity=".7" strokeWidth="2" />
        <path d="M750 450A300 300 0 0 1 560 730" stroke="#F2B84B" strokeOpacity=".6" strokeWidth="2" />
        <path d="M60 520A420 420 0 0 0 250 820" stroke="#2E5DE6" strokeOpacity=".5" strokeWidth="2" />
      </svg>
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{ background: "radial-gradient(480px circle at var(--mx,50%) var(--my,30%), rgba(110,146,242,.18), transparent 60%)" }} />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-16 md:grid-cols-[1.1fr_.9fr] md:items-center md:py-28">
        <div className="intro" data-on={on}>
          <h1 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-accent">{words[w]}</span> a brand name your market will remember.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            LexioMark AI is a brand name generator built for founders. Describe your business and get strategic names with the reasoning behind each one, plus .com checks and trademark search links.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#generator" className="rounded-xl bg-gold px-7 py-4 font-semibold text-[#071039] transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent/50">Generate brand names</a>
            <a href="#how" className="rounded-xl border border-line px-7 py-4 font-semibold transition hover:border-accent">See how it works</a>
          </div>
        </div>

        <div aria-hidden className="relative mx-auto aspect-[4/5] w-full max-w-sm">
          {slides.map((x, i) => (
            <div key={x.name} data-on={i === s} className="slide absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl p-7 text-white"
              style={{ background: x.src ? `url(${x.src}) center/cover` : `linear-gradient(150deg, ${x.a}, ${x.b})` }}>
              <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,.6), rgba(0,0,0,0) 80%)" }} />
              <span className="relative w-fit rounded-full bg-black/25 px-3 py-1 text-xs font-medium">Sample result: {x.tag}</span>
              <div className="relative">
                <p className="font-display text-5xl">{x.name}</p>
                <p className="mt-2 text-sm text-white drop-shadow">{x.why}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}