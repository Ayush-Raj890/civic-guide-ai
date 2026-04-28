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
  const [country, setCountry] = useState("US");

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
        <div className="rounded-md border bg-white/80 px-2 py-1 shadow-sm backdrop-blur">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="bg-transparent text-sm outline-none"
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
