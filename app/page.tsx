import Hero from "./components/Hero";
import Generator from "./components/Generator";
import ThemeToggle from "./components/ThemeToggle";
import { FAQ, SITE_URL } from "./site";

const audiences: { t: string; d: string; s: string; img?: string }[] = [
  { t: "Founders", d: "You have the product and the nerve. You need a name that holds up in a pitch. Describe the business once and get names with the reasoning attached.", img: "/cards/founders.webp", s: "bg-[#2E5DE6] text-white" },
  { t: "Studios and freelancers", d: "Bring clients a naming direction, not a guess. Every name comes with the strategy behind it.", img: "/cards/studios.webp", s: "bg-[#071039] text-white dark:bg-[#0F2270]" },
  { t: "Businesses rebranding", d: "Outgrown the old name? Test new directions against your audience and market before you tell anyone.", img: "/cards/rebranding.webp", s: "text-white" },
  { t: "Creators", d: "Podcasts, newsletters, shops and channels. Get a name that is easy to say and easy to find.", img: "/cards/creators.webp", s: "text-white" },
];

const steps = [
  { t: "Describe your business", d: "Say what you do, who you serve and what sets you apart." },
  { t: "Choose how literal the name is", d: "Direct, suggestive, conceptual or abstract. You decide how much the name explains." },
  { t: "Get names with reasons", d: "Each name has its logic, personality traits, a .com and .co check, and trademark search links." },
];

const jsonLd = [
  { "@context": "https://schema.org", "@type": "WebApplication", name: "LexioMark AI", url: SITE_URL, applicationCategory: "BusinessApplication", operatingSystem: "Web",
    description: "AI brand name generator that returns strategic brand names with reasoning, domain checks and trademark search links." },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="/" className="font-display text-2xl">LexioMark</a>
        <ThemeToggle />
      </header>

      <Hero />

      <section className="mx-auto max-w-6xl px-6 py-20" aria-labelledby="who">
        <h2 id="who" className="font-display text-4xl md:text-5xl">Who uses LexioMark</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <div key={a.t}
              style={a.img ? { backgroundImage: `url(${a.img})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
              className={`relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-2xl p-6 ${a.s}`}>
              {a.img && <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />}
              <h3 className="relative text-xl font-medium drop-shadow">{a.t}</h3>
              <p className={`relative text-sm leading-6 ${a.img ? "rounded-xl bg-black/30 p-3 text-white backdrop-blur-md" : "opacity-90"}`}>{a.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="border-y border-line bg-gradient-to-b from-transparent to-[#2E5DE6]/10 py-20" aria-labelledby="how-h">
        <div className="mx-auto max-w-6xl px-6">
          <h2 id="how-h" className="font-display text-4xl md:text-5xl">How it works</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.t}>
                <span className="font-display text-5xl text-accent">{i + 1}</span>
                <h3 className="mt-3 text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 leading-7 text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="generator" className="mx-auto max-w-3xl scroll-mt-8 px-6 py-20" aria-labelledby="gen">
        <h2 id="gen" className="mb-8 font-display text-4xl md:text-5xl">Generate your brand name</h2>
        <Generator />
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24" aria-labelledby="faq">
        <h2 id="faq" className="font-display text-4xl">Questions founders ask</h2>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="cursor-pointer list-none text-lg font-semibold">{f.q}</summary>
              <p className="mt-3 leading-7 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="border-t border-line py-10 text-center text-sm text-muted">
        <p>Helping founders build memorable brands.</p>
        <p className="mt-2 text-xs">© 2026 LexioMark. Designed and built by Adebayo Adedoyin.</p>
      </footer>
    </main>
  );
}