import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ArrowRight, Sparkles, MessageCircle, ListChecks, Clock, ShieldCheck, Users, Globe2, HelpCircle, } from "lucide-react";
import heroImg from "@/assets/hero-vote.jpg";
export const Route = createFileRoute("/")({
    head: () => ({
        meta: [
            { title: "CivicGuide AI — Understand Elections, Step by Step" },
            {
                name: "description",
                content: "CivicGuide AI is your friendly assistant that explains how elections work — registration, voting, counting and results — in simple, interactive steps.",
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
        accent: "from-blue-500/20 to-indigo-500/20",
    },
    {
        icon: Clock,
        title: "Visual timeline",
        desc: "See how each phase connects in a clear, interactive timeline.",
        accent: "from-cyan-500/20 to-blue-500/20",
    },
    {
        icon: MessageCircle,
        title: "AI chatbot",
        desc: "Ask any election question and get instant, friendly answers.",
        accent: "from-indigo-500/20 to-purple-500/20",
    },
    {
        icon: HelpCircle,
        title: "Helpful FAQ",
        desc: "Browse the most common voter questions, answered clearly.",
        accent: "from-sky-500/20 to-cyan-500/20",
    },
];
const stats = [
    { value: "5", label: "Election Phases" },
    { value: "20+", label: "FAQs Answered" },
    { value: "24/7", label: "AI Assistant" },
    { value: "100%", label: "Beginner Friendly" },
];
const trust = [
    { icon: ShieldCheck, label: "Non-partisan" },
    { icon: Users, label: "For everyone" },
    { icon: Globe2, label: "Global guidance" },
];
function Home() {
    return (<Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} aria-hidden/>
        <div className="absolute inset-0 -z-10 opacity-40" style={{ background: "var(--gradient-mesh)" }} aria-hidden/>
        <div className="absolute inset-0 -z-10 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" style={{ background: "var(--grid-pattern)", backgroundSize: "40px 40px" }} aria-hidden/>

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-32 lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/80 px-3 py-1 text-xs font-medium text-primary shadow-[var(--shadow-card)] backdrop-blur">
              <Sparkles className="h-3.5 w-3.5"/> Smart Election Assistant
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
              <Link to="/steps" className="group inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-primary)] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5">
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/>
              </Link>
              <Link to="/chatbot" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/80 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-secondary">
                <MessageCircle className="h-4 w-4"/> Try the chatbot
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {trust.map((t) => (<div key={t.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <t.icon className="h-4 w-4 text-primary"/>
                  {t.label}
                </div>))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-[image:var(--gradient-primary)] opacity-25 blur-3xl"/>
            <div className="relative">
              <img src={heroImg} alt="Diverse people voting at a ballot box" width={1536} height={1024} className="rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]"/>
              {/* Floating cards */}
              <div className="absolute -left-4 top-6 hidden rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur sm:flex sm:items-center sm:gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-primary">
                  <ShieldCheck className="h-5 w-5"/>
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Verified info</p>
                  <p className="text-sm font-semibold">Trusted source</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-2 hidden rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur sm:flex sm:items-center sm:gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground">
                  <Sparkles className="h-5 w-5"/>
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Powered by</p>
                  <p className="text-sm font-semibold">AI Assistant</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card/70 p-4 shadow-[var(--shadow-card)] backdrop-blur sm:grid-cols-4 sm:gap-0 sm:p-0">
            {stats.map((s, i) => (<div key={s.label} className={`flex flex-col items-center justify-center px-4 py-5 text-center sm:py-6 ${i !== stats.length - 1 ? "sm:border-r sm:border-border" : ""}`}>
                <p className="bg-[image:var(--gradient-primary)] bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
              </div>))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="relative bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-slate-900/50 dark:to-slate-900 py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 opacity-30" style={{ background: "var(--grid-pattern)", backgroundSize: "50px 50px" }} aria-hidden/>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">Features</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Everything you need to feel confident
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Four friendly tools to guide you through every part of the election process.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (<div key={f.title} className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-slate-700 bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-800 dark:to-slate-900 p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 dark:hover:border-blue-500">
                  <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${f.accent} blur-3xl opacity-40 transition-opacity duration-300 group-hover:opacity-60`} aria-hidden/>
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-600 dark:text-blue-400 ring-1 ring-blue-200 dark:ring-blue-800">
                    <f.icon className="h-7 w-7"/>
                  </div>
                  <h3 className="relative mt-6 text-xl font-bold text-gray-900 dark:text-white">{f.title}</h3>
                  <p className="relative mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
                </div>))}
          </div>
        </div>
      </section>

      {/* Process preview grid */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-gray-200 dark:border-slate-700 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 shadow-lg">
          <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
            <div className="relative p-10 sm:p-14 bg-gradient-to-br from-indigo-600 to-blue-600 dark:from-indigo-900 dark:to-blue-900 text-white">
              <div className="absolute inset-0 opacity-20" style={{ background: "var(--grid-pattern)", backgroundSize: "30px 30px" }} aria-hidden/>
              <p className="relative text-sm font-semibold uppercase tracking-widest text-indigo-200 dark:text-indigo-300">
                The Process
              </p>
              <h2 className="relative mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                5 phases.<br/> Zero confusion.
              </h2>
              <p className="relative mt-4 text-indigo-100 dark:text-indigo-200 max-w-sm">
                We break the election cycle into bite-sized steps so anyone can follow along.
              </p>
              <Link to="/steps" className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-white text-indigo-600 dark:bg-slate-900 dark:text-white px-6 py-3 text-sm font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                See all steps <ArrowRight className="h-4 w-4"/>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-px bg-gray-300 dark:bg-slate-600">
              {[
            { e: "📝", t: "Register" },
            { e: "📢", t: "Campaign" },
            { e: "🗳️", t: "Vote" },
            { e: "🧮", t: "Count" },
            { e: "🏆", t: "Results" },
            { e: "✨", t: "Celebrate" },
        ].map((p) => (<div key={p.t} className="flex flex-col items-center justify-center bg-white dark:bg-slate-800 p-8 transition-all duration-300 hover:bg-blue-50 dark:hover:bg-slate-700">
                  <span className="text-4xl transition-transform group-hover:scale-110">{p.e}</span>
                  <p className="mt-3 text-sm font-bold text-gray-900 dark:text-white">{p.t}</p>
                </div>))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-indigo-200 dark:border-indigo-900 bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-600 dark:from-indigo-950 dark:via-blue-950 dark:to-purple-950 p-12 text-white shadow-2xl">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }} aria-hidden/>
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Ready to become an informed voter?
              </h2>
              <p className="mt-3 text-lg text-indigo-100">
                Walk through the 5 key election phases and get your questions answered.
              </p>
            </div>
            <Link to="/steps" className="inline-flex items-center gap-2 rounded-xl bg-white text-indigo-600 dark:bg-slate-900 dark:text-white px-8 py-4 text-sm font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 whitespace-nowrap">
              Explore the steps <ArrowRight className="h-4 w-4"/>
            </Link>
          </div>
        </div>
      </section>
    </Layout>);
}
