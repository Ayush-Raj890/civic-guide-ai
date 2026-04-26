import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ArrowRight, Sparkles, MessageCircle, ListChecks, Clock } from "lucide-react";
import heroImg from "@/assets/hero-vote.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CivicGuide AI — Understand Elections, Step by Step" },
      {
        name: "description",
        content:
          "CivicGuide AI is your friendly assistant that explains how elections work — registration, voting, counting and results — in simple, interactive steps.",
      },
      { property: "og:title", content: "CivicGuide AI — Understand Elections, Step by Step" },
      {
        property: "og:description",
        content: "Learn how elections work step-by-step with an interactive AI assistant.",
      },
    ],
  }),
  component: Home,
});

const features = [
  {
    icon: ListChecks,
    title: "Step-by-step guide",
    desc: "Follow the entire election process from registration to results.",
  },
  {
    icon: Clock,
    title: "Visual timeline",
    desc: "See how each phase connects in a clear, interactive timeline.",
  },
  {
    icon: MessageCircle,
    title: "AI chatbot",
    desc: "Ask any election question and get instant, friendly answers.",
  },
];

function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1 text-xs font-medium text-primary shadow-[var(--shadow-card)]">
              <Sparkles className="h-3.5 w-3.5" /> Smart Election Assistant
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              🗳️ Understand elections,{" "}
              <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                the easy way
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Learn how elections work step-by-step with an interactive assistant. From voter
              registration to results — CivicGuide AI makes democracy simple.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/steps"
                className="group inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-primary)] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/chatbot"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <MessageCircle className="h-4 w-4" /> Try the chatbot
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-[image:var(--gradient-primary)] opacity-20 blur-2xl" />
            <img
              src={heroImg}
              alt="Diverse people voting at a ballot box"
              width={1536}
              height={1024}
              className="rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to feel confident
          </h2>
          <p className="mt-3 text-muted-foreground">
            Three friendly tools to guide you through every part of the election process.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-primary">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-[image:var(--gradient-primary)] p-10 text-primary-foreground shadow-[var(--shadow-soft)] sm:p-14">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold tracking-tight">Ready to become an informed voter?</h2>
              <p className="mt-2 text-primary-foreground/85">
                Walk through the 5 key election phases and get your questions answered.
              </p>
            </div>
            <Link
              to="/steps"
              className="inline-flex items-center gap-2 rounded-xl bg-card px-6 py-3 text-sm font-semibold text-primary shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5"
            >
              Explore the steps <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
