import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState, useRef, useEffect, type FormEvent } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";

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

type Message = { role: "user" | "bot"; text: string };

const initialMessages: Message[] = [
  {
    role: "bot",
    text: "Hi! I'm CivicGuide AI 🗳️ — ask me anything about voting, registration, or how elections work.",
  },
];

const sampleReplies = [
  "Great question! To register as a voter, you typically need a valid ID and proof of address. The exact process depends on your country.",
  "On voting day, head to your assigned polling station with a valid photo ID. Voting is secret and free of cost.",
  "Vote counting is done publicly by election officials, often with observers from each party present to ensure transparency.",
  "Election results are announced once all ballots are counted — usually within a day or two for most national elections.",
];

const suggestions = [
  "How do I register to vote?",
  "What documents do I need?",
  "When are votes counted?",
  "How are results announced?",
];

function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = sampleReplies[Math.floor(Math.random() * sampleReplies.length)];
      setMessages((m) => [...m, { role: "bot", text: reply }]);
      setTyping(false);
    }, 900);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--primary-soft)] px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> AI Assistant
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Chat with CivicGuide</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Ask anything about elections — from registering to vote to understanding results.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
          {/* Chat area */}
          <div ref={scrollRef} className="h-[440px] space-y-4 overflow-y-auto bg-secondary/30 p-5">
            {messages.map((m, i) => (
              <MessageBubble key={i} role={m.role} text={m.text} />
            ))}
            {typing && (
              <div className="flex items-center gap-3">
                <Avatar role="bot" />
                <div className="flex gap-1 rounded-2xl bg-card px-4 py-3 shadow-[var(--shadow-card)]">
                  <Dot delay="0ms" />
                  <Dot delay="150ms" />
                  <Dot delay="300ms" />
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 border-t border-border bg-card px-4 py-3">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-[var(--primary-soft)] hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-border bg-card p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}

function MessageBubble({ role, text }: Message) {
  const isUser = role === "user";
  return (
    <div className={`flex items-end gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <Avatar role={role} />
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-[var(--shadow-card)] ${
          isUser
            ? "rounded-br-sm bg-[image:var(--gradient-primary)] text-primary-foreground"
            : "rounded-bl-sm bg-card text-foreground"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

function Avatar({ role }: { role: "user" | "bot" }) {
  const isUser = role === "user";
  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
        isUser ? "bg-accent text-accent-foreground" : "bg-[image:var(--gradient-primary)] text-primary-foreground"
      }`}
    >
      {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60"
      style={{ animationDelay: delay }}
    />
  );
}
