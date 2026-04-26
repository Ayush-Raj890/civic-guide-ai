import { Vote } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground">
              <Vote className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold">CivicGuide AI</p>
              <p className="text-sm text-muted-foreground">
                Making elections easy to understand for everyone.
              </p>
            </div>
          </div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Built for Hackathon · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
