import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
export const Route = createFileRoute("/faq")({
    head: () => ({
        meta: [
            { title: "FAQ — CivicGuide AI" },
            {
                name: "description",
                content: "Frequently asked questions about voter registration, required documents, voting day, and election rules.",
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
    },
    {
        q: "What documents are required?",
        a: "Typically you need a government-issued photo ID (passport, driver's license, or national ID) and proof of address (utility bill, bank statement, or rental agreement). Requirements vary by region.",
    },
    {
        q: "When is voting conducted?",
        a: "National elections happen on a fixed schedule (every 4–5 years in most democracies). Local and state elections occur more often. Always check your election commission for exact dates.",
    },
    {
        q: "Can I vote if I'm away from home?",
        a: "Yes — most countries offer postal ballots, early voting, or absentee voting. You'll need to apply in advance with proof that you cannot vote in person on election day.",
    },
    {
        q: "How is my vote kept secret?",
        a: "Ballots are anonymous and cast inside private booths. Once submitted, your vote cannot be traced back to you, ensuring complete confidentiality.",
    },
    {
        q: "When are results announced?",
        a: "Counting begins right after polls close. Preliminary results often appear within hours, and official results are usually declared within 1–7 days depending on the election size.",
    },
];
function FaqPage() {
    const [open, setOpen] = useState(0);
    return (<Layout>
      <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="absolute inset-x-0 top-0 -z-10 h-72 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" style={{ background: "var(--grid-pattern)", backgroundSize: "40px 40px" }} aria-hidden/>
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-3 py-1 text-xs font-medium text-primary shadow-[var(--shadow-card)]">
            <HelpCircle className="h-3.5 w-3.5"/> Help Center
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Frequently asked{" "}
            <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
              questions
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Quick answers to the most common questions about voting and elections.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-3">
            {faqs.map((item, i) => {
            const isOpen = open === i;
            return (<div key={item.q} className={`overflow-hidden rounded-2xl border bg-card transition-all ${isOpen
                    ? "border-primary/30 shadow-[var(--shadow-soft)]"
                    : "border-border shadow-[var(--shadow-card)]"}`}>
                  <button type="button" onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-secondary/50" aria-expanded={isOpen}>
                    <span className="flex items-center gap-3 font-medium text-foreground">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-soft)] text-xs font-bold text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.q}
                    </span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`}/>
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 pl-16 text-sm leading-relaxed text-muted-foreground">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>);
        })}
          </div>

          {/* Side help card */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-[image:var(--gradient-primary)] p-6 text-primary-foreground shadow-[var(--shadow-soft)]">
              <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage: "radial-gradient(ellipse at top right, black 30%, transparent 70%)",
        }} aria-hidden/>
              <div className="relative">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-card/20 backdrop-blur">
                  <HelpCircle className="h-5 w-5"/>
                </span>
                <h3 className="mt-4 text-xl font-semibold">Still have questions?</h3>
                <p className="mt-2 text-sm text-primary-foreground/85">
                  Chat with CivicGuide AI for personalized answers about your election process.
                </p>
                <a href="/chatbot" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-card px-4 py-2.5 text-sm font-semibold text-primary shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5">
                  Ask the AI →
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </Layout>);
}
