// @ts-nocheck
import { Link, useNavigate } from "@tanstack/react-router";
import { Vote, LogOut, User as UserIcon, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState, useEffect } from "react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/steps", label: "Steps" },
  { to: "/timeline", label: "Timeline" },
  { to: "/chatbot", label: "Chatbot" },
  { to: "/faq", label: "FAQ" },
];

export function Header() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) { toast.error(error.message); return; }
    toast.success("Signed out");
    navigate({ to: "/" });
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/50 bg-background/80 shadow-[var(--shadow-card)] backdrop-blur-xl"
          : "border-b border-transparent bg-background/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-2.5 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Vote className="h-5 w-5" />
          </span>
          <span className="text-[1.05rem] font-bold tracking-tight">
            CivicGuide{" "}
            <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
              AI
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground"
              activeProps={{
                className:
                  "relative rounded-lg px-3.5 py-2 text-sm font-semibold bg-[var(--primary-soft)] text-primary",
              }}
              activeOptions={{ exact: true }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {!loading && user ? (
            <>
              <span className="hidden items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-foreground sm:inline-flex">
                <UserIcon className="h-3.5 w-3.5" />
                {user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-all hover:bg-secondary hover:border-primary/20"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </>
          ) : (
            !loading && (
              <Link
                to="/auth"
                className="rounded-xl bg-[image:var(--gradient-primary)] px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)]"
              >
                Sign in
              </Link>
            )
          )}

          {/* Mobile hamburger */}
          <button
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-secondary md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-80 border-b border-border" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-1 bg-background/95 px-4 pb-4 pt-2 backdrop-blur-xl">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{
                className:
                  "rounded-lg px-3 py-2.5 text-sm font-semibold bg-[var(--primary-soft)] text-primary",
              }}
              activeOptions={{ exact: true }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
