import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState, useRef, useEffect, useMemo, type FormEvent } from "react";
import { Send, Bot, User, Sparkles, RotateCcw, CheckCheck } from "lucide-react";

export const Route = createFileRoute("/chatbot")({
  head: () => ({
    meta: [
      { title: "Chatbot — CivicGuide AI" },
      {
        name: "description",
        content:
          "Chat with CivicGuide AI to get instant answers about voter registration, voting, and election rules.",
      },
      { property: "og:title", content: "Chatbot — CivicGuide AI" },
      {
        property: "og:description",
        content: "Ask any election question and get a friendly answer from CivicGuide AI.",
      },
    ],
  }),
  component: ChatbotPage,
});

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
  ts: number;
};

const STARTER: Message = {
  id: "welcome",
  role: "bot",
  text: "Hi! I'm **CivicGuide AI** 🗳️ — ask me anything about voting, registration, or how elections work.",
  ts: Date.now(),
};

// Keyword-matched mock replies for a smarter feel
const knowledgeBase: { keywords: string[]; reply: string; followups: string[] }[] = [
  {
    keywords: ["register", "registration", "enroll", "sign up"],
    reply:
      "To register as a voter, you typically need a **valid photo ID** and **proof of address**. Many countries let you register online in under 5 minutes through your election commission's website.",
    followups: ["What documents do I need?", "Can I register online?", "Is there a deadline?"],
  },
  {
    keywords: ["document", "id", "proof", "papers"],
    reply:
      "Most regions accept a **government-issued photo ID** (passport, driver's license, national ID) plus **proof of address** like a utility bill or bank statement.",
    followups: ["How do I register to vote?", "What if I don't have ID?", "Where do I submit it?"],
  },
  {
    keywords: ["vote", "voting day", "polling", "ballot", "cast"],
    reply:
      "On voting day, head to your assigned polling station with a valid photo ID. Voting is **secret, free, and quick** — most people are in and out within 15 minutes.",
    followups: ["Can I vote by mail?", "When are votes counted?", "What if I'm away from home?"],
  },
  {
    keywords: ["count", "counting", "tally"],
    reply:
      "Vote counting is done **publicly** by election officials, often with party observers present to ensure transparency. Counting usually starts the moment polls close.",
    followups: ["When are results announced?", "How accurate is counting?", "Who oversees it?"],
  },
  {
    keywords: ["result", "winner", "announce", "declare"],
    reply:
      "Preliminary results often appear within **hours** of polls closing, while official declarations typically come within **1–7 days** depending on the election size.",
    followups: ["How is the winner decided?", "What is a runoff?", "Can results be challenged?"],
  },
  {
    keywords: ["mail", "postal", "absentee", "away"],
    reply:
      "Yes — most countries offer **postal**, **early**, or **absentee voting**. You'll need to apply in advance with proof you can't vote in person on election day.",
    followups: ["How do I apply for postal voting?", "When is the deadline?", "Is it secure?"],
  },
  {
    keywords: ["secret", "private", "anonymous"],
    reply:
      "Ballots are **fully anonymous** and cast inside private booths. Once submitted, your vote can't be traced back to you — that's a core principle of free elections.",
    followups: ["How is fraud prevented?", "Who watches the polls?", "Can I bring my phone?"],
  },
];

const fallbackReply =
  "That's a great question! While I'm a demo assistant, you can usually find detailed answers on your country's official **election commission** website. Try asking about *registration*, *voting day*, or *results*.";

const initialSuggestions = [
  "How do I register to vote?",
  "What documents do I need?",
  "Can I vote by mail?",
  "When are results announced?",
];

function findReply(text: string): { reply: string; followups: string[] } {
  const lower = text.toLowerCase();
  for (const entry of knowledgeBase) {
    if (entry.keywords.some((k) => lower.includes(k))) {
      return { reply: entry.reply, followups: entry.followups };
    }
  }
  return { reply: fallbackReply, followups: initialSuggestions };
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([STARTER]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(initialSuggestions);
  const scrollRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Smooth auto-scroll only when user is near bottom
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    if (distanceFromBottom < 160) {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, typing]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      text: trimmed,
      ts: Date.now(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    // Simulate variable latency for realism
    const delay = 700 + Math.random() * 700;
    window.setTimeout(() => {
      const { reply, followups } = findReply(trimmed);
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        role: "bot",
        text: reply,
        ts: Date.now(),
      };
      setMessages((m) => [...m, botMsg]);
      setSuggestions(followups);
      setTyping(false);
      // Restore focus to input after reply
      window.setTimeout(() => inputRef.current?.focus(), 50);
    }, delay);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  function reset() {
    setMessages([{ ...STARTER, ts: Date.now() }]);
    setSuggestions(initialSuggestions);
    inputRef.current?.focus();
  }

  // Group consecutive messages from the same role for tighter bubbles
  const grouped = useMemo(() => {
    return messages.map((m, i) => {
      const prev = messages[i - 1];
      const next = messages[i + 1];
      return {
        ...m,
        isFirstOfGroup: !prev || prev.role !== m.role,
        isLastOfGroup: !next || next.role !== m.role,
      };
    });
  }, [messages]);

  return (
    <Layout>
      <section className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div
          className="absolute inset-x-0 top-0 -z-10 h-72 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]"
          style={{ background: "var(--grid-pattern)", backgroundSize: "40px 40px" }}
          aria-hidden
        />
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-3 py-1 text-xs font-medium text-primary shadow-[var(--shadow-card)]">
            <Sparkles className="h-3.5 w-3.5" /> AI Assistant
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Chat with{" "}
            <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
              CivicGuide
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Ask anything about elections — from registering to vote to understanding results.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
          {/* Chat header */}
          <div className="flex items-center justify-between gap-3 border-b border-border bg-card px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)]">
                  <Bot className="h-4 w-4" />
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-emerald-500" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold">CivicGuide AI</p>
                <p className="text-xs text-emerald-600">● Online</p>
              </div>
            </div>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-[var(--primary-soft)] hover:text-primary"
              aria-label="Reset conversation"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>

          {/* Chat area */}
          <div
            ref={scrollRef}
            className="h-[480px] space-y-1 overflow-y-auto bg-secondary/30 p-5 [scrollbar-width:thin]"
          >
            {grouped.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
            {typing && <TypingIndicator />}
            <div ref={endRef} />
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 border-t border-border bg-card px-4 py-3">
              <span className="self-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Try asking:
              </span>
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  disabled={typing}
                  className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-[var(--primary-soft)] hover:text-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={onSubmit}
            className="flex items-center gap-2 border-t border-border bg-card p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Demo assistant · Responses are illustrative and may not reflect your local rules.
        </p>
      </section>
    </Layout>
  );
}

type GroupedMessage = Message & { isFirstOfGroup: boolean; isLastOfGroup: boolean };

function MessageBubble({ message }: { message: GroupedMessage }) {
  const isUser = message.role === "user";
  // Lightweight markdown: **bold** and *italic*
  const html = renderInlineMarkdown(message.text);

  return (
    <div
      className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : ""} ${
        message.isFirstOfGroup ? "mt-3" : "mt-1"
      }`}
    >
      <div className={`w-9 shrink-0 ${message.isLastOfGroup ? "" : "invisible"}`}>
        <Avatar role={message.role} />
      </div>
      <div className={`flex max-w-[75%] flex-col ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-4 py-2.5 text-sm leading-relaxed shadow-[var(--shadow-card)] ${
            isUser
              ? "bg-[image:var(--gradient-primary)] text-primary-foreground"
              : "bg-card text-foreground"
          } ${bubbleRadius(isUser, message.isFirstOfGroup, message.isLastOfGroup)}`}
        >
          <span dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        {message.isLastOfGroup && (
          <div
            className={`mt-1 flex items-center gap-1 px-1 text-[11px] text-muted-foreground ${
              isUser ? "flex-row-reverse" : ""
            }`}
          >
            <span>{formatTime(message.ts)}</span>
            {isUser && <CheckCheck className="h-3 w-3 text-primary" aria-label="Sent" />}
          </div>
        )}
      </div>
    </div>
  );
}

function bubbleRadius(isUser: boolean, first: boolean, last: boolean) {
  // Pleasant grouped corners
  const base = "rounded-2xl";
  if (first && last) return base;
  if (isUser) {
    if (first) return `${base} rounded-br-md`;
    if (last) return `${base} rounded-tr-md`;
    return `${base} rounded-tr-md rounded-br-md`;
  } else {
    if (first) return `${base} rounded-bl-md`;
    if (last) return `${base} rounded-tl-md`;
    return `${base} rounded-tl-md rounded-bl-md`;
  }
}

function Avatar({ role }: { role: "user" | "bot" }) {
  const isUser = role === "user";
  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-[var(--shadow-card)] ${
        isUser
          ? "bg-accent text-accent-foreground"
          : "bg-[image:var(--gradient-primary)] text-primary-foreground"
      }`}
    >
      {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="mt-3 flex items-end gap-2">
      <Avatar role="bot" />
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-card px-4 py-3 shadow-[var(--shadow-card)]">
          <Dot delay="0ms" />
          <Dot delay="150ms" />
          <Dot delay="300ms" />
        </div>
        <span className="mt-1 px-1 text-[11px] text-muted-foreground">CivicGuide is typing…</span>
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="h-2 w-2 animate-bounce rounded-full bg-primary/60"
      style={{ animationDelay: delay }}
    />
  );
}

// Tiny safe inline markdown renderer (escapes HTML, then bold/italic)
function renderInlineMarkdown(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br />");
}
