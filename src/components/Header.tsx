import { Link } from "@tanstack/react-router";
import { Vote } from "lucide-react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/steps", label: "Steps" },
  { to: "/timeline", label: "Timeline" },
  { to: "/chatbot", label: "Chatbot" },
  { to: "/faq", label: "FAQ" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)]">
            <Vote className="h-5 w-5" />
          </span>
          <span className="text-lg tracking-tight">
            CivicGuide <span className="text-primary">AI</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "rounded-lg px-3 py-2 text-sm font-medium bg-secondary text-foreground" }}
              activeOptions={{ exact: true }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/chatbot"
          className="md:hidden rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
        >
          Ask AI
        </Link>
      </div>
    </header>
  );
}
