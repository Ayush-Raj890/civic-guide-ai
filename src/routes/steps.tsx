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
  },
  {
    icon: Megaphone,
    emoji: "📢",
    title: "Campaigning",
    desc: "Candidates and parties share their ideas through rallies, debates, and ads — helping voters compare and choose.",
  },
  {
    icon: CheckSquare,
    emoji: "🗳️",
    title: "Voting Day",
    desc: "Registered voters visit polling stations (or vote by mail) and cast a secret ballot for their preferred candidate.",
  },
  {
    icon: Calculator,
    emoji: "🧮",
    title: "Vote Counting",
    desc: "Election officials carefully count every ballot under observation to ensure accuracy and transparency.",
  },
  {
    icon: Trophy,
    emoji: "🏆",
    title: "Result Declaration",
    desc: "Final results are announced. Winning candidates take office and begin their term as elected representatives.",
  },
];

function StepsPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">The Process</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Election steps, made simple
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Every election follows the same five phases. Tap through each one to learn what
            happens and why it matters.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-2">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="group relative rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-start gap-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-primary">
                  <s.icon className="h-6 w-6" />
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] text-xs font-bold text-primary-foreground shadow-[var(--shadow-soft)]">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">
                    {s.emoji} {s.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </Layout>
  );
}
