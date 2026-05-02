// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState, useRef, useEffect, useMemo } from "react";
import { Send, Bot, Sparkles, RotateCcw, Paperclip, X, Cloud, AlertCircle } from "lucide-react";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { useChat } from "@/hooks/use-chat";
import { readFileAsDataURL, validateFile, formatBytes } from "@/lib/chat-utils";
import { WELCOME_TEXT, initialSuggestions, findReply } from "@/lib/knowledge-base";

export const Route = createFileRoute("/chatbot")({
  head: () => ({
    meta: [
      { title: "Chatbot — CivicGuide AI" },
      { name: "description", content: "Chat with CivicGuide AI for voter guidance." },
    ],
  }),
  component: ChatbotPage,
});

const MAX_FILES = 4;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export function ChatbotPage() {
  const { 
    messages, 
    typing, 
    sendMessage, 
    resetChat, 
    historyLoaded 
  } = useChat(WELCOME_TEXT);

  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [pending, setPending] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState(null);

  const scrollRef = useRef(null);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typing]);

  // Sync suggestions
  useEffect(() => {
    if (messages.length > 1) {
        const lastBotMsg = [...messages].reverse().find(m => m.role === 'bot');
        if (lastBotMsg) {
            const result = findReply(messages[messages.length - 2]?.text || "");
            setSuggestions(result.followups);
        }
    }
  }, [messages]);

  const handleFiles = async (files) => {
    setError(null);
    const incoming = Array.from(files);
    const remainingSlots = MAX_FILES - pending.length;
    const accepted = [];

    for (const file of incoming.slice(0, remainingSlots)) {
      const validation = validateFile(file, MAX_FILE_SIZE);
      if (!validation.valid) {
        setError(validation.error);
        continue;
      }
      try {
        const url = await readFileAsDataURL(file);
        accepted.push({
          id: Math.random().toString(36).substring(7),
          name: file.name,
          size: file.size,
          type: file.type,
          url,
          kind: file.type.startsWith("image/") ? "image" : "file",
        });
      } catch (err) {
        setError(`Failed to read ${file.name}`);
      }
    }
    if (accepted.length) setPending(p => [...p, ...accepted]);
  };

  const onSend = (text = input) => {
    if ((!text.trim() && !pending.length) || typing) return;
    sendMessage(text, pending);
    setInput("");
    setPending([]);
    inputRef.current?.focus();
  };

  const groupedMessages = useMemo(() => {
    return messages.map((m, i) => ({
      ...m,
      isFirstOfGroup: !messages[i - 1] || messages[i - 1].role !== m.role,
      isLastOfGroup: !messages[i + 1] || messages[i + 1].role !== m.role,
    }));
  }, [messages]);

  return (
    <Layout>
      <section className="relative mx-auto max-w-4xl px-4 py-4 sm:px-6 flex flex-col h-[calc(100dvh-5rem)]">
        <div className="absolute inset-x-0 top-0 -z-10 h-72 opacity-50" style={{ background: "var(--grid-pattern)", backgroundSize: "40px 40px" }} />
        
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-3 py-1 text-xs font-medium text-primary shadow-sm">
            <Sparkles className="h-3.5 w-3.5" /> AI Assistant
          </span>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Chat with <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">CivicGuide</span>
          </h1>
        </header>

        <main className={`relative mt-4 flex-1 flex flex-col overflow-hidden rounded-3xl border bg-card/80 backdrop-blur-xl shadow-lg transition-colors ${dragOver ? "border-primary ring-2 ring-primary/30" : "border-border/50"}`}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
        >
          {/* Chat Controls */}
          <div className="flex items-center justify-between gap-3 border-b border-border bg-card px-5 py-3">
            <div className="flex items-center gap-3">
              <BotAvatar />
              <div className="leading-tight">
                <p className="text-sm font-semibold">CivicGuide AI</p>
                <p className="text-xs text-emerald-600">● Online</p>
              </div>
            </div>
            <button onClick={resetChat} aria-label="Reset chat" className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>

          {/* Chat area */}
          <div 
            ref={scrollRef} 
            className="flex-1 space-y-1 overflow-y-auto bg-secondary/30 p-5 scroll-smooth"
            aria-live="polite"
            aria-relevant="additions"
            role="log"
          >
            {groupedMessages.map((m) => (
              <MessageBubble key={m.id || m.ts} message={m} />
            ))}
            {typing && <TypingIndicator />}
            <div ref={endRef} />
          </div>

          {/* Attachments Preview */}
          {pending.length > 0 && (
            <div className="flex flex-wrap gap-2 border-t border-border bg-card px-4 py-3">
              {pending.map((a) => (
                <PendingChip key={a.id} attachment={a} onRemove={() => setPending(p => p.filter(x => x.id !== a.id))} />
              ))}
            </div>
          )}

          {/* Error Banner */}
          {error && <div className="border-t border-destructive/30 bg-destructive/10 px-4 py-2 text-xs font-medium text-destructive">{error}</div>}

          {/* Suggestions & Input */}
          <footer className="border-t border-border bg-card">
            {suggestions.length > 0 && !pending.length && (
              <div className="flex flex-wrap gap-2 px-4 py-3 border-b border-border/50">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => onSend(s)} disabled={typing} className="rounded-full border border-border/50 bg-secondary/80 px-4 py-2 text-xs font-medium hover:border-primary/40 hover:bg-[var(--primary-soft)] hover:text-primary transition-all">
                    {s}
                  </button>
                ))}
              </div>
            )}
            
            <form onSubmit={(e) => { e.preventDefault(); onSend(); }} className="flex items-center gap-2 p-3">
              <input ref={fileInputRef} type="file" multiple accept="image/*,.pdf,.doc,.docx,.txt,.csv" onChange={(e) => handleFiles(e.target.files)} className="sr-only" />
              <button type="button" onClick={() => fileInputRef.current?.click()} disabled={typing || pending.length >= MAX_FILES} className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-secondary text-muted-foreground hover:text-primary transition-colors">
                <Paperclip className="h-5 w-5" />
              </button>
              <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question..." className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20" />
              <button type="submit" disabled={(!input.trim() && !pending.length) || typing} className="flex h-12 w-12 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-md hover:scale-105 transition-transform">
                <Send className="h-5 w-5" />
              </button>
            </form>
          </footer>
        </main>
      </section>
    </Layout>
  );
}

function BotAvatar() {
  return (
    <div className="relative">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground shadow-sm">
        <Bot className="h-4 w-4" />
      </span>
      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-emerald-500" />
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 mt-3 animate-fade-in">
      <div className="w-9 shrink-0"><BotAvatar /></div>
      <div className="flex gap-1 rounded-2xl bg-card border border-border/50 px-4 py-3 shadow-sm">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40 [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40 [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40" />
      </div>
    </div>
  );
}

function PendingChip({ attachment, onRemove }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-[var(--primary-soft)] pl-2 pr-1 py-1 text-[10px] font-bold text-primary animate-scale-in">
      <span className="truncate max-w-[100px]">{attachment.name}</span>
      <button onClick={onRemove} className="rounded-full p-0.5 hover:bg-primary/20 transition-colors"><X className="h-3 w-3" /></button>
    </div>
  );
}
