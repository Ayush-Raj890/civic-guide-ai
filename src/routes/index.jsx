// @ts-nocheck
import heroImg from "@/assets/hero-vote.jpg";
import { Layout } from "@/components/Layout";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  Globe2,
  HelpCircle,
  ListChecks,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
  Star,
} from "lucide-react";

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
    emoji: "📋",
    title: "Step-by-step guide",
    desc: "Follow the entire election process from registration to results with clear, simple explanations.",
    accent: "from-blue-500/20 to-indigo-500/20",
    linkTo: "/steps",
  },
  {
    icon: Clock,
    emoji: "🕐",
    title: "Visual timeline",
    desc: "See how each phase connects in a clear, beautiful interactive timeline.",
    accent: "from-cyan-500/20 to-blue-500/20",
    linkTo: "/timeline",
  },
  {
    icon: MessageCircle,
    emoji: "🤖",
    title: "AI chatbot",
    desc: "Ask any election question and get instant, friendly, accurate answers.",
    accent: "from-indigo-500/20 to-purple-500/20",
    linkTo: "/chatbot",
  },
  {
    icon: HelpCircle,
    emoji: "❓",
    title: "Helpful FAQ",
    desc: "Browse the most common voter questions, all answered clearly and concisely.",
    accent: "from-sky-500/20 to-cyan-500/20",
    linkTo: "/faq",
  },
];

const stats = [
  { value: "5", label: "Election Phases", icon: "🗂️" },
  { value: "20+", label: "FAQs Answered", icon: "💬" },
  { value: "24/7", label: "AI Assistant", icon: "🤖" },
  { value: "100%", label: "Beginner Friendly", icon: "✅" },
];

const trust = [
  { icon: ShieldCheck, label: "Non-partisan" },
  { icon: Users, label: "For everyone" },
  { icon: Globe2, label: "Global guidance" },
];

const processPhases = [
  { e: "📝", t: "Register", color: "from-blue-500/10 to-indigo-500/10" },
  { e: "📢", t: "Campaign", color: "from-cyan-500/10 to-blue-500/10" },
  { e: "🗳️", t: "Vote", color: "from-indigo-500/10 to-purple-500/10" },
  { e: "🧮", t: "Count", color: "from-sky-500/10 to-cyan-500/10" },
  { e: "🏆", t: "Results", color: "from-amber-500/10 to-orange-500/10" },
  { e: "🎉", t: "Celebrate", color: "from-rose-500/10 to-pink-500/10" },
];

function Home() {
  return (
    <Layout>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Layered background */}
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div
          className="absolute inset-0 -z-10 opacity-50"
          style={{ background: "var(--gradient-mesh)" }}
          aria-hidden
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_80%)]"
          style={{ background: "var(--grid-pattern)", backgroundSize: "40px 40px" }}
          aria-hidden
        />
        {/* Glow orbs */}
        <div
          className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[600px] w-[600px] rounded-full bg-[image:var(--gradient-primary)] opacity-10 blur-[120px] animate-float-slow"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[500px] w-[500px] rounded-full bg-[image:var(--gradient-accent)] opacity-10 blur-[100px] animate-float"
          aria-hidden
        />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 md:grid-cols-2 md:py-36 lg:px-8">
          {/* Left text */}
          <div>
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card/80 px-4 py-1.5 text-xs font-semibold text-primary shadow-[var(--shadow-card)] backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 animate-glow-pulse" />
                Smart Election Assistant
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl animate-fade-up delay-100">
              🗳️ Understand elections,{" "}
              <span className="relative">
                <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent animate-shimmer">
                  the easy way
                </span>
                <span
                  className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-[image:var(--gradient-primary)] opacity-40"
                  aria-hidden
                />
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground animate-fade-up delay-200">
              Learn how elections work step-by-step with an interactive assistant. From voter
              registration to results — CivicGuide AI makes democracy simple.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 animate-fade-up delay-300">
              <Link
                to="/steps"
                className="group inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-primary)] px-6 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/chatbot"
                className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card/80 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-all duration-300 hover:bg-secondary hover:-translate-y-0.5 hover:border-primary/20"
              >
                <MessageCircle className="h-4 w-4 text-primary" />
                Try the chatbot
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5 animate-fade-up delay-400">
              {trust.map((t) => (
                <div key={t.label} className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <t.icon className="h-4 w-4 text-primary" />
                  {t.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="relative animate-fade-up delay-200">
            <div className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-[image:var(--gradient-primary)] opacity-20 blur-3xl animate-glow-pulse" />
            <div className="relative">
              <img
                src={heroImg}
                alt="Diverse people voting at a ballot box"
                width={1536}
                height={1024}
                className="rounded-3xl border border-border/60 bg-card shadow-[var(--shadow-soft)] transition-transform duration-500 hover:scale-[1.02]"
              />
              {/* Floating badge 1 */}
              <div className="absolute -left-5 top-8 hidden animate-float rounded-2xl border border-border/60 bg-card/95 px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur sm:flex sm:items-center sm:gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Verified info</p>
                  <p className="text-sm font-bold">Trusted source</p>
                </div>
              </div>
              {/* Floating badge 2 */}
              <div className="absolute -bottom-5 -right-3 hidden animate-float-slow rounded-2xl border border-border/60 bg-card/95 px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur sm:flex sm:items-center sm:gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Powered by</p>
                  <p className="text-sm font-bold">AI Assistant</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 overflow-hidden rounded-2xl border border-border/60 bg-card/70 shadow-[var(--shadow-card)] backdrop-blur sm:grid-cols-4 sm:gap-0">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`group flex flex-col items-center justify-center px-4 py-6 text-center transition-colors duration-300 hover:bg-secondary/60 ${
                  i !== stats.length - 1 ? "sm:border-r sm:border-border/60" : ""
                } animate-fade-up delay-${(i + 3) * 100}`}
              >
                <span className="mb-1 text-xl">{s.icon}</span>
                <p className="bg-[image:var(--gradient-primary)] bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features grid ────────────────────────────────── */}
      <section className="relative py-28 sm:py-36">
        <div
          className="absolute inset-0 -z-10 opacity-25"
          style={{ background: "var(--grid-pattern)", backgroundSize: "50px 50px" }}
          aria-hidden
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-blue-50/40 to-transparent dark:via-slate-900/40" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-[var(--primary-soft)] px-4 py-1.5 text-xs font-semibold text-primary animate-fade-up">
              <Zap className="h-3.5 w-3.5" />
              Features
            </span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl animate-fade-up delay-100">
              Everything you need to feel{" "}
              <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                confident
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground animate-fade-up delay-200">
              Four powerful tools to guide you through every part of the election process.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Link
                key={f.title}
                to={f.linkTo}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-7 shadow-[var(--shadow-card)] card-lift hover-gradient-border animate-fade-up delay-${(i + 2) * 100}`}
              >
                {/* Glow blob */}
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br ${f.accent} blur-2xl transition-opacity duration-500 opacity-50 group-hover:opacity-100`}
                  aria-hidden
                />
                {/* Icon */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-primary ring-1 ring-primary/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <f.icon className="h-6 w-6" />
                </div>
                {/* Emoji */}
                <span className="absolute right-5 top-5 text-2xl transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6">
                  {f.emoji}
                </span>
                <h3 className="relative mt-5 text-lg font-bold text-foreground">{f.title}</h3>
                <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
                <span className="relative mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                  Learn more <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process preview ───────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-border/60 shadow-[var(--shadow-soft)]">
          <div className="grid md:grid-cols-[1.1fr_1fr]">
            {/* Left panel */}
            <div className="relative overflow-hidden bg-[image:var(--gradient-primary)] p-10 text-white sm:p-14">
              <div
                className="absolute inset-0 opacity-15"
                style={{ background: "var(--grid-pattern)", backgroundSize: "30px 30px" }}
                aria-hidden
              />
              {/* Animated glow orb */}
              <div
                className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-float"
                aria-hidden
              />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
                  <Star className="h-3 w-3" />
                  The Process
                </span>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  5 phases.
                  <br />
                  <span className="opacity-80">Zero confusion.</span>
                </h2>
                <p className="mt-4 max-w-sm text-base leading-relaxed text-white/80">
                  We break the election cycle into bite-sized steps so anyone can follow along and feel empowered.
                </p>
                <Link
                  to="/steps"
                  className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  See all steps
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right grid of phases */}
            <div className="grid grid-cols-3 grid-rows-2 gap-px bg-border/60">
              {processPhases.map((p, i) => (
                <div
                  key={p.t}
                  className={`group relative flex flex-col items-center justify-center bg-card p-6 text-center transition-all duration-300 hover:bg-[var(--primary-soft)] animate-scale-in delay-${(i + 1) * 100}`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                    aria-hidden
                  />
                  <span className="relative text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6">
                    {p.e}
                  </span>
                  <p className="relative mt-2.5 text-xs font-bold tracking-wide text-foreground">
                    {p.t}
                  </p>
                  <span className="relative mt-1 text-[10px] font-medium text-primary opacity-0 transition-all duration-200 group-hover:opacity-100">
                    Step {i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-primary)] p-12 text-white shadow-[var(--shadow-glow)]">
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
            }}
            aria-hidden
          />
          {/* Floating orbs */}
          <div
            className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl animate-float"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl animate-float-slow"
            aria-hidden
          />

          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" />
                Start learning today
              </span>
              <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                Ready to become an{" "}
                <span className="relative">
                  informed voter
                  <span
                    className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-white/50"
                    aria-hidden
                  />
                </span>
                ?
              </h2>
              <p className="mt-3 text-lg text-white/80">
                Walk through the 5 key election phases and get your questions answered by our AI.
              </p>
            </div>
            <Link
              to="/steps"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-primary shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl whitespace-nowrap"
            >
              Explore the steps
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
