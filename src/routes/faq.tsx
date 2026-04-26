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
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--primary-soft)] px-3 py-1 text-xs font-medium text-primary">
            <HelpCircle className="h-3.5 w-3.5" /> Help Center
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Quick answers to the most common questions about voting and elections.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`overflow-hidden rounded-2xl border bg-card transition-all ${
                  isOpen
                    ? "border-primary/30 shadow-[var(--shadow-soft)]"
                    : "border-border shadow-[var(--shadow-card)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-secondary/50"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-foreground">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
