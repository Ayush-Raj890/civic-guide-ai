import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
export const Route = createFileRoute("/timeline")({
    head: () => ({
        meta: [
            { title: "Election Timeline — CivicGuide AI" },
            {
                name: "description",
                content: "An interactive visual timeline of the election process: Registration → Campaign → Voting → Counting → Results.",
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
    { emoji: "📝", title: "Registration", detail: "Sign up to vote with ID & address proof.", weeks: "8–12 weeks before" },
    { emoji: "📢", title: "Campaign", detail: "Candidates share platforms and debate.", weeks: "4–8 weeks before" },
    { emoji: "🗳️", title: "Voting", detail: "Polling day — citizens cast ballots.", weeks: "Election Day" },
    { emoji: "🧮", title: "Counting", detail: "Officials tally votes transparently.", weeks: "Hours after polls close" },
    { emoji: "🏆", title: "Results", detail: "Winners announced and sworn in.", weeks: "1–7 days after" },
];
function TimelinePage() {
    return (<Layout>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Phase by Phase</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Election Timeline</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            From the first registration form to the final result — here's how an election unfolds.
          </p>
        </div>

        {/* Desktop horizontal timeline */}
        <div className="relative mt-20 hidden md:block">
          <div className="absolute left-0 right-0 top-8 h-1 rounded-full bg-[image:var(--gradient-primary)] opacity-30"/>
          <div className="relative grid grid-cols-5 gap-4">
            {phases.map((p, i) => (<div key={p.title} className="flex flex-col items-center text-center">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-card text-2xl shadow-[var(--shadow-soft)] transition-transform hover:scale-110">
                  {p.emoji}
                </div>
                <div className="mt-4 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-1 font-semibold">{p.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.weeks}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{p.detail}</p>
                </div>
              </div>))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <ol className="relative mt-12 space-y-6 border-l-2 border-dashed border-primary/30 pl-6 md:hidden">
          {phases.map((p, i) => (<li key={p.title} className="relative">
              <span className="absolute -left-[34px] flex h-12 w-12 items-center justify-center rounded-full border-4 border-background bg-card text-xl shadow-[var(--shadow-card)]">
                {p.emoji}
              </span>
              <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Step {i + 1} · {p.weeks}
                </p>
                <h3 className="mt-1 font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.detail}</p>
              </div>
            </li>))}
        </ol>
      </section>
    </Layout>);
}
