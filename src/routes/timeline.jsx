// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Election Timeline — CivicGuide AI" },
      {
        name: "description",
        content:
          "An interactive visual timeline of the election process: Registration → Campaign → Voting → Counting → Results.",
      },
      { property: "og:title", content: "Election Timeline — CivicGuide AI" },
      {
        property: "og:description",
        content: "See every phase of an election laid out in a clear visual timeline.",
      },
    ],
  }),
  component: TimelinePage,
});

const phases = [
  {
    emoji: "📝",
    title: "Registration",
    detail: "Sign up to vote with ID & address proof.",
    weeks: "8–12 weeks before",
    gradient: "linear-gradient(135deg, #3b82f6, #6366f1)",
    lightBg: "rgba(59,130,246,0.08)",
    borderColor: "rgba(59,130,246,0.25)",
  },
  {
    emoji: "📢",
    title: "Campaign",
    detail: "Candidates share platforms and debate.",
    weeks: "4–8 weeks before",
    gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    lightBg: "rgba(6,182,212,0.08)",
    borderColor: "rgba(6,182,212,0.25)",
  },
  {
    emoji: "🗳️",
    title: "Voting",
    detail: "Polling day — citizens cast ballots.",
    weeks: "Election Day",
    gradient: "linear-gradient(135deg, #6366f1, #a855f7)",
    lightBg: "rgba(99,102,241,0.08)",
    borderColor: "rgba(99,102,241,0.25)",
  },
  {
    emoji: "🧮",
    title: "Counting",
    detail: "Officials tally votes transparently.",
    weeks: "Hours after polls close",
    gradient: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
    lightBg: "rgba(14,165,233,0.08)",
    borderColor: "rgba(14,165,233,0.25)",
  },
  {
    emoji: "🏆",
    title: "Results",
    detail: "Winners announced and sworn in.",
    weeks: "1–7 days after",
    gradient: "linear-gradient(135deg, #f59e0b, #f97316)",
    lightBg: "rgba(245,158,11,0.08)",
    borderColor: "rgba(245,158,11,0.25)",
  },
];

function TimelinePage() {
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
            🕐 Phase by Phase
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl animate-fade-up delay-100">
            Election{" "}
            <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
              Timeline
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground animate-fade-up delay-200">
            From the first registration form to the final result — here's how an election unfolds
            over weeks.
          </p>
        </div>

        {/* ── Desktop horizontal timeline ─────────────────── */}
        <div className="relative mt-24 hidden md:block">
          {/* Track */}
          <div className="absolute left-[10%] right-[10%] top-9 h-1.5 rounded-full bg-border/60" />
          {/* Animated fill */}
          <div
            className="absolute left-[10%] right-[10%] top-9 h-1.5 rounded-full"
            style={{ background: "var(--gradient-primary)", backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }}
          />

          <div className="relative grid grid-cols-5 gap-6">
            {phases.map((p, i) => (
              <div
                key={p.title}
                className={`group flex flex-col items-center text-center animate-fade-up delay-${(i + 2) * 100}`}
              >
                {/* Phase dot */}
                <div
                  className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full border-4 border-background shadow-[var(--shadow-soft)] transition-all duration-300 group-hover:scale-110"
                  style={{ background: p.gradient }}
                >
                  <span className="text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    {p.emoji}
                  </span>
                </div>

                {/* Info card */}
                <div
                  className="mt-5 w-full rounded-2xl p-5 shadow-[var(--shadow-card)] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[var(--shadow-soft)]"
                  style={{
                    background: p.lightBg,
                    border: `1px solid ${p.borderColor}`,
                  }}
                >
                  <span
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white"
                    style={{ background: p.gradient }}
                  >
                    Step {i + 1}
                  </span>
                  <h3 className="mt-2 font-extrabold text-foreground">{p.title}</h3>
                  <p className="mt-1 text-[11px] font-semibold text-muted-foreground">{p.weeks}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile vertical timeline ────────────────────── */}
        <div className="relative mt-14 md:hidden">
          {/* Vertical gradient line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-0.5 rounded-full opacity-50"
            style={{ background: "var(--gradient-primary)" }}
          />

          <ol className="space-y-8 pl-16">
            {phases.map((p, i) => (
              <li
                key={p.title}
                className={`group relative animate-fade-up delay-${(i + 2) * 100}`}
              >
                {/* Circle */}
                <span
                  className="absolute -left-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background shadow-[var(--shadow-soft)] transition-transform duration-300 group-hover:scale-110"
                  style={{ background: p.gradient }}
                >
                  <span className="text-xl">{p.emoji}</span>
                </span>

                <div
                  className="rounded-2xl p-5 shadow-[var(--shadow-card)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[var(--shadow-soft)]"
                  style={{ background: p.lightBg, border: `1px solid ${p.borderColor}` }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white"
                      style={{ background: p.gradient }}
                    >
                      Step {i + 1}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">{p.weeks}</span>
                  </div>
                  <h3 className="mt-2 text-base font-extrabold text-foreground">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center animate-fade-up delay-700">
          <Link
            to="/chatbot"
            className="group inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-primary)] px-7 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
          >
            Still have questions? Ask our AI
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
