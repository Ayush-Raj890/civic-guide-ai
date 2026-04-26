import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { UserPlus, Megaphone, CheckSquare, Calculator, Trophy } from "lucide-react";

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
    tone: "from-blue-500/15 to-indigo-500/15",
    tip: "Register online in under 5 minutes",
  },
  {
    icon: Megaphone,
    emoji: "📢",
    title: "Campaigning",
    desc: "Candidates and parties share their ideas through rallies, debates, and ads — helping voters compare and choose.",
    tone: "from-cyan-500/15 to-blue-500/15",
    tip: "Watch debates to compare ideas",
  },
  {
    icon: CheckSquare,
    emoji: "🗳️",
    title: "Voting Day",
    desc: "Registered voters visit polling stations (or vote by mail) and cast a secret ballot for their preferred candidate.",
    tone: "from-indigo-500/15 to-purple-500/15",
    tip: "Bring valid photo ID",
  },
  {
    icon: Calculator,
    emoji: "🧮",
    title: "Vote Counting",
    desc: "Election officials carefully count every ballot under observation to ensure accuracy and transparency.",
    tone: "from-sky-500/15 to-cyan-500/15",
    tip: "Open to public observation",
  },
  {
    icon: Trophy,
    emoji: "🏆",
    title: "Result Declaration",
    desc: "Final results are announced. Winning candidates take office and begin their term as elected representatives.",
    tone: "from-amber-500/15 to-orange-500/15",
    tip: "Usually within 1–7 days",
  },
];

function StepsPage() {
  return (
    <Layout>
      <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div
          className="absolute inset-x-0 top-0 -z-10 h-72 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]"
          style={{ background: "var(--grid-pattern)", backgroundSize: "40px 40px" }}
          aria-hidden
        />
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-3 py-1 text-xs font-medium text-primary shadow-[var(--shadow-card)]">
            The Process
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Election steps,{" "}
            <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
              made simple
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Every election follows the same five phases. Explore each card to learn what
            happens and why it matters.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-soft)]"
            >
              <div
                className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${s.tone} blur-2xl opacity-70 transition-opacity group-hover:opacity-100`}
                aria-hidden
              />
              <div className="relative flex items-start gap-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-primary ring-1 ring-primary/10">
                  <s.icon className="h-6 w-6" />
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] text-xs font-bold text-primary-foreground shadow-[var(--shadow-soft)]">
                    {i + 1}
                  </span>
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold">
                    {s.emoji} {s.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
                    💡 {s.tip}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </Layout>
  );
}
