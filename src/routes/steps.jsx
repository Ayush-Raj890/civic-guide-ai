// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { UserPlus, Megaphone, CheckSquare, Calculator, Trophy, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/steps")({
  head: () => ({
    meta: [
      { title: "Election Steps — CivicGuide AI" },
      {
        name: "description",
        content:
          "Discover the five key steps of every election: voter registration, campaigning, voting day, vote counting, and result declaration.",
      },
      { property: "og:title", content: "Election Steps — CivicGuide AI" },
      {
        property: "og:description",
        content: "The five key steps of every election, explained simply.",
      },
    ],
  }),
  component: StepsPage,
});

const steps = [
  {
    icon: UserPlus,
    emoji: "📝",
    title: "Voter Registration",
    desc: "Eligible citizens enroll on the electoral roll with valid ID and proof of address. This ensures every vote is verified and counted.",
    tip: "Register online in under 5 minutes",
    gradient: "linear-gradient(135deg, #3b82f6, #6366f1)",
    lightBg: "rgba(59,130,246,0.07)",
    borderColor: "rgba(59,130,246,0.2)",
    iconColor: "#3b82f6",
    iconBg: "rgba(59,130,246,0.1)",
    topBar: "linear-gradient(90deg,#3b82f6,#6366f1)",
  },
  {
    icon: Megaphone,
    emoji: "📢",
    title: "Campaigning",
    desc: "Candidates and parties share their ideas through rallies, debates, and ads — helping voters compare and choose.",
    tip: "Watch debates to compare ideas",
    gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    lightBg: "rgba(6,182,212,0.07)",
    borderColor: "rgba(6,182,212,0.2)",
    iconColor: "#06b6d4",
    iconBg: "rgba(6,182,212,0.1)",
    topBar: "linear-gradient(90deg,#06b6d4,#3b82f6)",
  },
  {
    icon: CheckSquare,
    emoji: "🗳️",
    title: "Voting Day",
    desc: "Registered voters visit polling stations (or vote by mail) and cast a secret ballot for their preferred candidate.",
    tip: "Bring valid photo ID",
    gradient: "linear-gradient(135deg, #6366f1, #a855f7)",
    lightBg: "rgba(99,102,241,0.07)",
    borderColor: "rgba(99,102,241,0.2)",
    iconColor: "#6366f1",
    iconBg: "rgba(99,102,241,0.1)",
    topBar: "linear-gradient(90deg,#6366f1,#a855f7)",
  },
  {
    icon: Calculator,
    emoji: "🧮",
    title: "Vote Counting",
    desc: "Election officials carefully count every ballot under observation to ensure accuracy and full transparency.",
    tip: "Open to public observation",
    gradient: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
    lightBg: "rgba(14,165,233,0.07)",
    borderColor: "rgba(14,165,233,0.2)",
    iconColor: "#0ea5e9",
    iconBg: "rgba(14,165,233,0.1)",
    topBar: "linear-gradient(90deg,#0ea5e9,#06b6d4)",
  },
  {
    icon: Trophy,
    emoji: "🏆",
    title: "Result Declaration",
    desc: "Final results are announced. Winning candidates take office and begin their term as elected representatives.",
    tip: "Usually within 1–7 days",
    gradient: "linear-gradient(135deg, #f59e0b, #f97316)",
    lightBg: "rgba(245,158,11,0.07)",
    borderColor: "rgba(245,158,11,0.2)",
    iconColor: "#f59e0b",
    iconBg: "rgba(245,158,11,0.1)",
    topBar: "linear-gradient(90deg,#f59e0b,#f97316)",
  },
];

export function StepsPage() {
  return (
    <Layout>
      <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Background grid */}
        <div
          className="absolute inset-x-0 top-0 -z-10 h-80 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]"
          style={{ background: "var(--grid-pattern)", backgroundSize: "40px 40px" }}
          aria-hidden
        />
        <div
          className="absolute inset-x-0 top-0 -z-10 h-80 opacity-50"
          style={{ background: "var(--gradient-mesh)" }}
          aria-hidden
        />

        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-[var(--primary-soft)] px-4 py-1.5 text-xs font-semibold text-primary shadow-[var(--shadow-card)] animate-fade-up">
            📋 The Process
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl animate-fade-up delay-100">
            Election steps,{" "}
            <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
              made simple
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground animate-fade-up delay-200">
            Every election follows the same five phases. Explore each card to learn what happens and
            why it matters to democracy.
          </p>
        </div>

        {/* Step cards */}
        <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={`group relative overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)] card-lift animate-fade-up delay-${(i + 2) * 100}`}
              style={{ border: `1px solid ${s.borderColor}` }}
            >
              {/* Colored top bar */}
              <div className="h-1 w-full" style={{ background: s.topBar }} />

              {/* Subtle bg tint on hover */}
              <div
                className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: s.lightBg }}
                aria-hidden
              />

              <div className="p-7">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ring-1 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      background: s.iconBg,
                      color: s.iconColor,
                      ringColor: s.borderColor,
                    }}
                  >
                    <s.icon className="h-6 w-6" style={{ color: s.iconColor }} />
                    {/* Step badge */}
                    <span
                      className="absolute -right-2.5 -top-2.5 flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold text-white shadow-[var(--shadow-soft)]"
                      style={{ background: s.gradient }}
                    >
                      {i + 1}
                    </span>
                  </div>

                  {/* Emoji */}
                  <span className="ml-auto text-3xl transition-all duration-300 group-hover:scale-125 group-hover:-rotate-6 group-hover:drop-shadow-lg">
                    {s.emoji}
                  </span>
                </div>

                <h2 className="mt-5 text-xl font-bold text-foreground">{s.title}</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>

                {/* Tip chip */}
                <div className="mt-5 flex items-center gap-2 rounded-xl bg-secondary/60 px-3 py-2 text-xs font-semibold text-foreground">
                  <span className="text-base">💡</span>
                  {s.tip}
                </div>
              </div>
            </li>
          ))}

          {/* Chatbot CTA card */}
          <li className="group relative overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] animate-fade-up delay-700 card-lift">
            <div
              className="absolute inset-0"
              style={{ background: "var(--gradient-primary)" }}
            />
            <div
              className="absolute inset-0 opacity-15"
              style={{ background: "var(--grid-pattern)", backgroundSize: "24px 24px" }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full blur-3xl animate-float"
              style={{ background: "rgba(255,255,255,0.15)" }}
              aria-hidden
            />
            <div className="relative flex h-full flex-col justify-between p-7 text-white">
              <div>
                <span className="text-4xl">🤖</span>
                <h3 className="mt-4 text-xl font-extrabold">Still have questions?</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  Chat with CivicGuide AI for personalised answers about your specific election.
                </p>
              </div>
              <Link
                to="/chatbot"
                className="group/btn mt-6 inline-flex items-center gap-2 self-start rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-primary shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Ask the AI
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </li>
        </ol>
      </section>
    </Layout>
  );
}
