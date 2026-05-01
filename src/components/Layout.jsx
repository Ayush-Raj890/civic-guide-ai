// @ts-nocheck
import { useEffect, useState } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "IN", name: "India" },
  { code: "AU", name: "Australia" },
];

export function Layout({ children }) {
  const [country, setCountry] = useState("IN");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cg_country");
      if (saved) setCountry(saved);
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cg_country", country);
    } catch (e) {}
  }, [country]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">{children}</main>

      <Footer />

      <div className="fixed top-4 right-4 z-50">
        <label className="sr-only">Select country</label>
        <div className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground border border-border bg-background/60 shadow-[var(--shadow-soft)] backdrop-blur">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="bg-transparent text-sm outline-none cursor-pointer"
            aria-label="Select country"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
