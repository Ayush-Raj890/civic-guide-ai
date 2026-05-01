// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { ChevronDown, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — CivicGuide AI" },
      {
        name: "description",
        content:
          "Frequently asked questions about voter registration, required documents, voting day, and election rules.",
      },
      { property: "og:title", content: "FAQ — CivicGuide AI" },
      {
        property: "og:description",
        content: "Quick answers to the most common election questions.",
      },
    ],
  }),
  component: FaqPage,
});

const faqs = [
  {
    q: "How do I register as a voter?",
    a: "Visit your country's official election commission website or local registration office. You'll fill in a form with your name, address, and date of birth. In many places you can register online in just a few minutes.",
    emoji: "📝",
  },
  {
    q: "What documents are required?",
    a: "Typically you need a government-issued photo ID (passport, driver's license, or national ID) and proof of address (utility bill, bank statement, or rental agreement). Requirements vary by region.",
    emoji: "📄",
  },
  {
    q: "When is voting conducted?",
    a: "National elections happen on a fixed schedule (every 4–5 years in most democracies). Local and state elections occur more often. Always check your election commission for exact dates.",
    emoji: "📅",
  },
  {
    q: "Can I vote if I'm away from home?",
    a: "Yes — most countries offer postal ballots, early voting, or absentee voting. You'll need to apply in advance with proof that you cannot vote in person on election day.",
    emoji: "✈️",
  },
  {
    q: "How is my vote kept secret?",
    a: "Ballots are anonymous and cast inside private booths. Once submitted, your vote cannot be traced back to you, ensuring complete confidentiality.",
    emoji: "🔒",
  },
  {
    q: "When are results announced?",
    a: "Counting begins right after polls close. Preliminary results often appear within hours, and official results are usually declared within 1–7 days depending on the election size.",
    emoji: "🏆",
  },
];

function FaqPage() {
  const [open, setOpen] = useState(0);

  return (
    <Layout>
      <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Grid bg */}
        <div
          className="absolute inset-x-0 top-0 -z-10 h-80 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]"
          style={{ background: "var(--grid-pattern)", backgroundSize: "40px 40px" }}
          aria-hidden
        />
        <div
          className="absolute inset-x-0 top-0 -z-10 h-80 opacity-40"
          style={{ background: "var(--gradient-mesh)" }}
          aria-hidden
        />

        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-[var(--primary-soft)] px-4 py-1.5 text-xs font-semibold text-primary animate-fade-up">
            <HelpCircle className="h-3.5 w-3.5" />
            Help Center
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl animate-fade-up delay-100">
            Frequently asked{" "}
            <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
              questions
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground animate-fade-up delay-200">
            Quick answers to the most common questions about voting and elections worldwide.
          </p>
        </div>

        {/* Two-col layout */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* FAQ list */}
          <div className="space-y-3 animate-fade-up delay-300">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={item.q}
                  className={`group overflow-hidden rounded-2xl border bg-card transition-all duration-300 ${
                    isOpen
                      ? "border-primary/30 shadow-[var(--shadow-soft)]"
                      : "border-border/60 shadow-[var(--shadow-card)] hover:border-primary/20 hover:shadow-[var(--shadow-card)]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-secondary/40"
                    aria-expanded={isOpen}
                    id={`faq-btn-${i}`}
                  >
                    <span className="flex items-center gap-3 font-semibold text-foreground">
                      {/* Number badge */}
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold transition-all duration-300 ${
                          isOpen
                            ? "bg-[image:var(--gradient-primary)] text-white"
                            : "bg-[var(--primary-soft)] text-primary"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="hidden sm:inline text-lg">{item.emoji}</span>
                        {item.q}
                      </span>
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Animated answer */}
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="mx-5 mb-5 mt-1 rounded-xl bg-secondary/40 px-4 py-4">
                        <p className="text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky side card */}
          <aside className="animate-fade-up delay-400 lg:sticky lg:top-24 lg:self-start">
            {/* AI help card */}
            <div className="relative overflow-hidden rounded-2xl bg-[image:var(--gradient-primary)] p-6 text-white shadow-[var(--shadow-soft)]">
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                  maskImage: "radial-gradient(ellipse at top right, black 30%, transparent 70%)",
                }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl animate-float"
                aria-hidden
              />
              <div className="relative">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                  <Sparkles className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-xl font-extrabold">Still have questions?</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  Chat with CivicGuide AI for personalised answers about your specific election
                  process.
                </p>
                <Link
                  to="/chatbot"
                  className="group mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-primary shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Ask the AI
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Quick stats card */}
            <div className="mt-4 overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)]">
              <div
                className="absolute inset-0 -z-10 opacity-20"
                style={{ background: "var(--grid-pattern-dense)", backgroundSize: "16px 16px" }}
                aria-hidden
              />
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Quick facts
              </p>
              <ul className="mt-3 space-y-3">
                {[
                  { e: "🗓️", t: "Elections every 4–5 years" },
                  { e: "📮", t: "Postal vote available" },
                  { e: "🔒", t: "Completely anonymous" },
                  { e: "⚡", t: "Results within days" },
                ].map((f) => (
                  <li key={f.t} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="text-base">{f.e}</span>
                    {f.t}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
