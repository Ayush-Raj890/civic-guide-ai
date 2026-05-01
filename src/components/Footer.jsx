// @ts-nocheck
import { Vote, Github, Twitter, Globe } from "lucide-react";
import { Link } from "@tanstack/react-router";

const links = [
  { to: "/steps", label: "Steps" },
  { to: "/timeline", label: "Timeline" },
  { to: "/chatbot", label: "Chatbot" },
  { to: "/faq", label: "FAQ" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border/60">
      {/* subtle grid bg */}
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{ background: "var(--grid-pattern)", backgroundSize: "32px 32px" }}
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-secondary/20 to-secondary/40" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-[1fr_auto_auto] sm:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="group inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)] transition-transform group-hover:scale-110">
                <Vote className="h-5 w-5" />
              </span>
              <span className="text-base font-bold tracking-tight">
                CivicGuide{" "}
                <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                  AI
                </span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Making democracy understandable for everyone — one election at a time.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Explore
            </p>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <p className="text-xs text-muted-foreground">{new Date().getFullYear()} · CivicGuide AI</p>
          </div>
        </div>

        <div className="mt-10 border-t border-border/60 pt-6">
          <p className="text-center text-xs text-muted-foreground">
            Non-partisan · For everyone · Built with ❤️ for democracy
          </p>
        </div>
      </div>
    </footer>
  );
}
