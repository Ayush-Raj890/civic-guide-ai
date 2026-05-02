// @ts-nocheck
import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Menu, User as UserIcon, Vote, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { auth, googleProvider, analytics } from "@/lib/google-services";
import { signInWithPopup, signOut } from "firebase/auth";
import { logEvent } from "firebase/analytics";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/steps", label: "Steps" },
  { to: "/timeline", label: "Timeline" },
  { to: "/chatbot", label: "Chatbot" },
  { to: "/finder", label: "Finder" },
  { to: "/faq", label: "FAQ" },
];

export function Header() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    
    // Auth Listener
    const unsubscribe = auth.onAuthStateChanged((u) => {
        setUser(u);
    });

    return () => {
        window.removeEventListener("scroll", handler);
        unsubscribe();
    };
  }, []);

  const login = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
        if (analytics) logEvent(analytics, "login", { method: "google" });
        toast.success("Signed in successfully!");
    } catch (err) {
        console.error(err);
        toast.error("Failed to sign in.");
    }
  };

  const logout = async () => {
    await signOut(auth);
    toast.success("Signed out.");
  };

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
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden flex-col items-end sm:flex">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Voter Profile</span>
                <span className="text-xs font-semibold text-foreground">{user.displayName}</span>
              </div>
              <button 
                onClick={logout}
                className="group relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition-all hover:bg-secondary"
                title="Sign out"
              >
                <img src={user.photoURL} alt="" className="h-6 w-6 rounded-full" />
                <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-background ring-2 ring-background">
                  <LogOut className="h-2.5 w-2.5 text-muted-foreground" />
                </div>
              </button>
            </div>
          ) : (
            <button
              onClick={login}
              className="inline-flex items-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2 text-xs font-bold text-white shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
            >
              <UserIcon className="h-3.5 w-3.5" />
              Sign In
            </button>
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
