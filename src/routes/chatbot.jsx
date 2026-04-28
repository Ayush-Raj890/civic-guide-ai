// @ts-nocheck
import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState, useRef, useEffect, useMemo } from "react";
import { Send, Bot, User, Sparkles, RotateCcw, CheckCheck, Paperclip, X, FileText, ImageIcon, Cloud, CloudOff, } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
export const Route = createFileRoute("/chatbot")({
    head: () => ({
        meta: [
            { title: "Chatbot — CivicGuide AI" },
            {
                name: "description",
                content: "Chat with CivicGuide AI to get instant answers about voter registration, voting, and election rules.",
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
const WELCOME_TEXT = "Hi! I'm **CivicGuide AI** 🗳️ — ask me anything about voting, registration, or how elections work. You can also attach a screenshot or document and I'll reference it.";
// Keyword-matched mock replies for a smarter feel
const knowledgeBase = [
    {
        keywords: ["register", "registration", "enroll", "sign up"],
        reply: "To register as a voter, you typically need a **valid photo ID** and **proof of address**. Many countries let you register online in under 5 minutes through your election commission's website.",
        followups: ["What documents do I need?", "Can I register online?", "Is there a deadline?"],
    },
    {
        keywords: ["document", "id", "proof", "papers"],
        reply: "Most regions accept a **government-issued photo ID** (passport, driver's license, national ID) plus **proof of address** like a utility bill or bank statement.",
        followups: ["How do I register to vote?", "What if I don't have ID?", "Where do I submit it?"],
    },
    {
        keywords: ["vote", "voting day", "polling", "ballot", "cast"],
        reply: "On voting day, head to your assigned polling station with a valid photo ID. Voting is **secret, free, and quick** — most people are in and out within 15 minutes.",
        followups: ["Can I vote by mail?", "When are votes counted?", "What if I'm away from home?"],
    },
    {
        keywords: ["count", "counting", "tally"],
        reply: "Vote counting is done **publicly** by election officials, often with party observers present to ensure transparency. Counting usually starts the moment polls close.",
        followups: ["When are results announced?", "How accurate is counting?", "Who oversees it?"],
    },
    {
        keywords: ["result", "winner", "announce", "declare"],
        reply: "Preliminary results often appear within **hours** of polls closing, while official declarations typically come within **1–7 days** depending on the election size.",
        followups: ["How is the winner decided?", "What is a runoff?", "Can results be challenged?"],
    },
    {
        keywords: ["mail", "postal", "absentee", "away"],
        reply: "Yes — most countries offer **postal**, **early**, or **absentee voting**. You'll need to apply in advance with proof you can't vote in person on election day.",
        followups: ["How do I apply for postal voting?", "When is the deadline?", "Is it secure?"],
    },
    {
        keywords: ["secret", "private", "anonymous"],
        reply: "Ballots are **fully anonymous** and cast inside private booths. Once submitted, your vote can't be traced back to you — that's a core principle of free elections.",
        followups: ["How is fraud prevented?", "Who watches the polls?", "Can I bring my phone?"],
    },
];
const fallbackReply = "That's a great question! While I'm a demo assistant, you can usually find detailed answers on your country's official **election commission** website. Try asking about *registration*, *voting day*, or *results*.";
const initialSuggestions = [
    "How do I register to vote?",
    "What documents do I need?",
    "Can I vote by mail?",
    "When are results announced?",
];
const MAX_FILES = 4;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
function findReply(text) {
    const lower = text.toLowerCase();
    for (const entry of knowledgeBase) {
        if (entry.keywords.some((k) => lower.includes(k))) {
            return { reply: entry.reply, followups: entry.followups };
        }
    }
    return { reply: fallbackReply, followups: initialSuggestions };
}
function buildAttachmentReply(attachments, text) {
    const imgs = attachments.filter((a) => a.kind === "image");
    const docs = attachments.filter((a) => a.kind === "file");
    const parts = [];
    if (imgs.length && docs.length) {
        parts.push(`Thanks for sharing **${imgs.length} image${imgs.length > 1 ? "s" : ""}** and **${docs.length} document${docs.length > 1 ? "s" : ""}**.`);
    }
    else if (imgs.length) {
        parts.push(`Thanks for the screenshot${imgs.length > 1 ? "s" : ""} — I can see *${imgs.map((a) => a.name).join(", ")}*.`);
    }
    else if (docs.length) {
        parts.push(`Got your document${docs.length > 1 ? "s" : ""}: *${docs.map((a) => a.name).join(", ")}*.`);
    }
    if (text.trim()) {
        const { reply } = findReply(text);
        parts.push(reply);
    }
    else {
        parts.push("In a live deployment I'd analyze the contents and pull out the relevant election info. For now, tell me **what you'd like me to look for** — for example *“Is this a valid voter ID?”* or *“Summarize this registration form.”*");
    }
    return parts.join("\n\n");
}
function formatTime(ts) {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function formatBytes(n) {
    if (n < 1024)
        return `${n} B`;
    if (n < 1024 * 1024)
        return `${(n / 1024).toFixed(1)} KB`;
    return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}
function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}
function ChatbotPage() {
    const { user, loading: authLoading } = useAuth();
    const [conversationId, setConversationId] = useState(null);
    const [historyLoaded, setHistoryLoaded] = useState(false);
    const [messages, setMessages] = useState([
        { id: "welcome", role: "bot", text: WELCOME_TEXT, ts: 0 },
    ]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const [suggestions, setSuggestions] = useState(initialSuggestions);
    const [pending, setPending] = useState([]);
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState(null);
    const scrollRef = useRef(null);
    const endRef = useRef(null);
    const inputRef = useRef(null);
    const fileInputRef = useRef(null);
    // Load (or create) the user's most recent conversation when they sign in
    useEffect(() => {
        let cancelled = false;
        async function loadHistory() {
            if (authLoading)
                return;
            if (!user) {
                setConversationId(null);
                setHistoryLoaded(true);
                return;
            }
            setHistoryLoaded(false);
            const { data: convos } = await supabase
                .from("conversations")
                .select("id")
                .eq("user_id", user.id)
                .order("updated_at", { ascending: false })
                .limit(1);
            let convId = convos?.[0]?.id;
            if (!convId) {
                const { data: created, error: createErr } = await supabase
                    .from("conversations")
                    .insert({ user_id: user.id, title: "CivicGuide chat" })
                    .select("id")
                    .single();
                if (createErr) {
                    if (!cancelled)
                        setError("Couldn't create your conversation.");
                    return;
                }
                convId = created.id;
            }
            const { data: rows } = await supabase
                .from("messages")
                .select("id, role, content, created_at")
                .eq("conversation_id", convId)
                .order("created_at", { ascending: true });
            if (cancelled)
                return;
            setConversationId(convId);
            if (rows && rows.length) {
                setMessages(rows.map((r) => ({
                    id: r.id,
                    role: r.role === "assistant" ? "bot" : r.role,
                    text: r.content,
                    ts: new Date(r.created_at).getTime(),
                })));
            }
            else {
                setMessages([{ id: "welcome", role: "bot", text: WELCOME_TEXT, ts: 0 }]);
            }
            setHistoryLoaded(true);
        }
        void loadHistory();
        return () => {
            cancelled = true;
        };
    }, [user, authLoading]);
    async function persistMessage(role, content) {
        if (!user || !conversationId)
            return;
        const dbRole = role === "bot" ? "assistant" : role;
        const { error: insertErr } = await supabase.from("messages").insert({
            conversation_id: conversationId,
            user_id: user.id,
            role: dbRole,
            content,
        });
        if (insertErr) {
            setError("Couldn't save message.");
            return;
        }
        await supabase
            .from("conversations")
            .update({ updated_at: new Date().toISOString() })
            .eq("id", conversationId);
    }
    // Smooth auto-scroll only when user is near bottom
    useEffect(() => {
        const el = scrollRef.current;
        if (!el)
            return;
        const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
        if (distanceFromBottom < 200) {
            endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [messages, typing, pending.length]);
    // Auto-clear error after a moment
    useEffect(() => {
        if (!error)
            return;
        const t = window.setTimeout(() => setError(null), 3500);
        return () => window.clearTimeout(t);
    }, [error]);
    async function handleFiles(fileList) {
        const incoming = Array.from(fileList);
        if (!incoming.length)
            return;
        const remainingSlots = MAX_FILES - pending.length;
        if (remainingSlots <= 0) {
            setError(`You can attach up to ${MAX_FILES} files per message.`);
            return;
        }
        const accepted = [];
        for (const file of incoming.slice(0, remainingSlots)) {
            if (file.size > MAX_FILE_SIZE) {
                setError(`"${file.name}" is larger than 5 MB.`);
                continue;
            }
            try {
                const url = await readFileAsDataURL(file);
                accepted.push({
                    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                    name: file.name,
                    size: file.size,
                    type: file.type || "application/octet-stream",
                    url,
                    kind: file.type.startsWith("image/") ? "image" : "file",
                });
            }
            catch {
                setError(`Couldn't read "${file.name}".`);
            }
        }
        if (incoming.length > remainingSlots) {
            setError(`Only the first ${remainingSlots} file(s) were attached (max ${MAX_FILES}).`);
        }
        if (accepted.length)
            setPending((p) => [...p, ...accepted]);
    }
    function onPickFiles(e) {
        if (e.target.files)
            void handleFiles(e.target.files);
        // Reset so picking the same file again still triggers change
        e.target.value = "";
    }
    function removePending(id) {
        setPending((p) => p.filter((a) => a.id !== id));
    }
    function send(text) {
        const trimmed = text.trim();
        const hasAttachments = pending.length > 0;
        if ((!trimmed && !hasAttachments) || typing)
            return;
        const attachments = pending;
        const userMsg = {
            id: `u-${Date.now()}`,
            role: "user",
            text: trimmed,
            ts: Date.now(),
            attachments: attachments.length ? attachments : undefined,
        };
        setMessages((m) => [...m, userMsg]);
        setInput("");
        setPending([]);
        setTyping(true);
        // Persist user message (best-effort)
        if (trimmed)
            void persistMessage("user", trimmed);
        const delay = 700 + Math.random() * 700;
        window.setTimeout(() => {
            const replyText = hasAttachments
                ? buildAttachmentReply(attachments, trimmed)
                : findReply(trimmed).reply;
            const followups = hasAttachments
                ? [
                    "Is this document valid?",
                    "Summarize the key details",
                    "What information is missing?",
                    "Where do I submit this?",
                ]
                : findReply(trimmed).followups;
            const botMsg = {
                id: `b-${Date.now()}`,
                role: "bot",
                text: replyText,
                ts: Date.now(),
            };
            setMessages((m) => [...m, botMsg]);
            setSuggestions(followups);
            setTyping(false);
            void persistMessage("assistant", replyText);
            window.setTimeout(() => inputRef.current?.focus(), 50);
        }, delay);
    }
    function onSubmit(e) {
        e.preventDefault();
        send(input);
    }
    async function reset() {
        setMessages([{ id: "welcome", role: "bot", text: WELCOME_TEXT, ts: 0 }]);
        setSuggestions(initialSuggestions);
        setPending([]);
        setError(null);
        // Start a fresh conversation for signed-in users
        if (user) {
            const { data: created } = await supabase
                .from("conversations")
                .insert({ user_id: user.id, title: "CivicGuide chat" })
                .select("id")
                .single();
            if (created?.id)
                setConversationId(created.id);
        }
        inputRef.current?.focus();
    }
    // Drag-and-drop
    function onDrop(e) {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files?.length)
            void handleFiles(e.dataTransfer.files);
    }
    function onDragOver(e) {
        e.preventDefault();
        if (!dragOver)
            setDragOver(true);
    }
    function onDragLeave(e) {
        e.preventDefault();
        setDragOver(false);
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
    return (<Layout>
      <section className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="absolute inset-x-0 top-0 -z-10 h-72 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" style={{ background: "var(--grid-pattern)", backgroundSize: "40px 40px" }} aria-hidden/>
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-3 py-1 text-xs font-medium text-primary shadow-[var(--shadow-card)]">
            <Sparkles className="h-3.5 w-3.5"/> AI Assistant
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

        <div className={`relative mt-10 overflow-hidden rounded-3xl border bg-card shadow-[var(--shadow-soft)] transition-colors ${dragOver ? "border-primary ring-2 ring-primary/30" : "border-border"}`} onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}>
          {/* Drag overlay */}
          {dragOver && (<div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-[var(--primary-soft)]/80 backdrop-blur-sm">
              <div className="rounded-2xl border-2 border-dashed border-primary bg-card px-6 py-4 text-center shadow-[var(--shadow-soft)]">
                <Paperclip className="mx-auto h-6 w-6 text-primary"/>
                <p className="mt-1 text-sm font-semibold text-primary">Drop to attach</p>
              </div>
            </div>)}

          {/* Chat header */}
          <div className="flex items-center justify-between gap-3 border-b border-border bg-card px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)]">
                  <Bot className="h-4 w-4"/>
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-emerald-500"/>
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold">CivicGuide AI</p>
                <p className="text-xs text-emerald-600">● Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {user ? (<span className="hidden items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-700 sm:inline-flex">
                  <Cloud className="h-3 w-3"/> Saved
                </span>) : (<Link to="/auth" className="hidden items-center gap-1 rounded-full border border-border bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground hover:bg-[var(--primary-soft)] hover:text-primary sm:inline-flex">
                  <CloudOff className="h-3 w-3"/> Sign in to save
                </Link>)}
              <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-[var(--primary-soft)] hover:text-primary" aria-label="Reset conversation">
                <RotateCcw className="h-3.5 w-3.5"/> Reset
              </button>
            </div>
          </div>

          {/* Chat area */}
          <div ref={scrollRef} className="h-[480px] space-y-1 overflow-y-auto bg-secondary/30 p-5 [scrollbar-width:thin]">
            {grouped.map((m) => (<MessageBubble key={m.id} message={m}/>))}
            {typing && <TypingIndicator />}
            <div ref={endRef}/>
          </div>

          {/* Pending attachments preview */}
          {pending.length > 0 && (<div className="flex flex-wrap gap-2 border-t border-border bg-card px-4 py-3">
              {pending.map((a) => (<PendingChip key={a.id} attachment={a} onRemove={() => removePending(a.id)}/>))}
            </div>)}

          {/* Error banner */}
          {error && (<div className="border-t border-destructive/30 bg-destructive/10 px-4 py-2 text-xs font-medium text-destructive">
              {error}
            </div>)}

          {/* Suggestions */}
          {suggestions.length > 0 && pending.length === 0 && (<div className="flex flex-wrap gap-2 border-t border-border bg-card px-4 py-3">
              <span className="self-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Try asking:
              </span>
              {suggestions.map((s) => (<button key={s} type="button" onClick={() => send(s)} disabled={typing} className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-[var(--primary-soft)] hover:text-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0">
                  {s}
                </button>))}
            </div>)}

          {/* Input */}
          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-border bg-card p-3">
            <input ref={fileInputRef} type="file" multiple accept="image/*,.pdf,.doc,.docx,.txt,.csv" onChange={onPickFiles} className="sr-only" aria-hidden/>
            <button type="button" onClick={() => fileInputRef.current?.click()} disabled={typing || pending.length >= MAX_FILES} className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-[var(--primary-soft)] hover:text-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0" aria-label="Attach file" title="Attach a screenshot or document">
              <Paperclip className="h-5 w-5"/>
            </button>
            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder={pending.length
            ? "Add a question about your attachment…"
            : "Type your question or drop a file…"} className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20" autoComplete="off"/>
            <button type="submit" disabled={(!input.trim() && pending.length === 0) || typing} className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0" aria-label="Send message">
              <Send className="h-5 w-5"/>
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Demo assistant · Attach screenshots or documents (max {MAX_FILES} files, 5 MB each).
          Files stay in your browser.
        </p>
      </section>
    </Layout>);
}
function MessageBubble({ message }) {
    const isUser = message.role === "user";
    const html = renderInlineMarkdown(message.text);
    const hasText = message.text.trim().length > 0;
    const hasAttachments = !!message.attachments?.length;
    return (<div className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : ""} ${message.isFirstOfGroup ? "mt-3" : "mt-1"}`}>
      <div className={`w-9 shrink-0 ${message.isLastOfGroup ? "" : "invisible"}`}>
        <Avatar role={message.role}/>
      </div>
      <div className={`flex max-w-[75%] flex-col gap-1.5 ${isUser ? "items-end" : "items-start"}`}>
        {hasAttachments && (<div className={`flex flex-wrap gap-1.5 ${isUser ? "justify-end" : ""}`}>
            {message.attachments.map((a) => a.kind === "image" ? (<a key={a.id} href={a.url} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5">
                  <img src={a.url} alt={a.name} className="max-h-56 max-w-[240px] object-cover"/>
                </a>) : (<a key={a.id} href={a.url} download={a.name} className={`flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs shadow-[var(--shadow-card)] transition-colors ${isUser
                    ? "border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
                    : "border-border bg-card text-foreground hover:bg-secondary"}`}>
                  <FileText className="h-4 w-4 shrink-0"/>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{a.name}</p>
                    <p className={`text-[10px] ${isUser ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {formatBytes(a.size)}
                    </p>
                  </div>
                </a>))}
          </div>)}
        {hasText && (<div className={`px-4 py-2.5 text-sm leading-relaxed shadow-[var(--shadow-card)] ${isUser
                ? "bg-[image:var(--gradient-primary)] text-primary-foreground"
                : "bg-card text-foreground"} ${bubbleRadius(isUser, message.isFirstOfGroup, message.isLastOfGroup)}`}>
            <span dangerouslySetInnerHTML={{ __html: html }}/>
          </div>)}
        {message.isLastOfGroup && (<div className={`flex items-center gap-1 px-1 text-[11px] text-muted-foreground ${isUser ? "flex-row-reverse" : ""}`}>
            <ClientTime ts={message.ts}/>
            {isUser && <CheckCheck className="h-3 w-3 text-primary" aria-label="Sent"/>}
          </div>)}
      </div>
    </div>);
}
function PendingChip({ attachment, onRemove }) {
    return (<div className="group relative flex items-center gap-2 rounded-xl border border-border bg-secondary/70 py-1.5 pl-1.5 pr-3 shadow-[var(--shadow-card)]">
      {attachment.kind === "image" ? (<img src={attachment.url} alt={attachment.name} className="h-10 w-10 rounded-lg object-cover"/>) : (<span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary-soft)] text-primary">
          <FileText className="h-5 w-5"/>
        </span>)}
      <div className="min-w-0 max-w-[180px]">
        <p className="truncate text-xs font-medium text-foreground">{attachment.name}</p>
        <p className="text-[10px] text-muted-foreground">
          {attachment.kind === "image" ? (<span className="inline-flex items-center gap-1">
              <ImageIcon className="h-3 w-3"/> Image · {formatBytes(attachment.size)}
            </span>) : (`${formatBytes(attachment.size)}`)}
        </p>
      </div>
      <button type="button" onClick={onRemove} className="ml-1 flex h-6 w-6 items-center justify-center rounded-full bg-card text-muted-foreground shadow-[var(--shadow-card)] transition-colors hover:bg-destructive hover:text-destructive-foreground" aria-label={`Remove ${attachment.name}`}>
        <X className="h-3.5 w-3.5"/>
      </button>
    </div>);
}
function bubbleRadius(isUser, first, last) {
    const base = "rounded-2xl";
    if (first && last)
        return base;
    if (isUser) {
        if (first)
            return `${base} rounded-br-md`;
        if (last)
            return `${base} rounded-tr-md`;
        return `${base} rounded-tr-md rounded-br-md`;
    }
    else {
        if (first)
            return `${base} rounded-bl-md`;
        if (last)
            return `${base} rounded-tl-md`;
        return `${base} rounded-tl-md rounded-bl-md`;
    }
}
function Avatar({ role }) {
    const isUser = role === "user";
    return (<div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-[var(--shadow-card)] ${isUser
            ? "bg-accent text-accent-foreground"
            : "bg-[image:var(--gradient-primary)] text-primary-foreground"}`}>
      {isUser ? <User className="h-4 w-4"/> : <Bot className="h-4 w-4"/>}
    </div>);
}
function TypingIndicator() {
    return (<div className="mt-3 flex items-end gap-2">
      <Avatar role="bot"/>
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-card px-4 py-3 shadow-[var(--shadow-card)]">
          <Dot delay="0ms"/>
          <Dot delay="150ms"/>
          <Dot delay="300ms"/>
        </div>
        <span className="mt-1 px-1 text-[11px] text-muted-foreground">CivicGuide is typing…</span>
      </div>
    </div>);
}
function Dot({ delay }) {
    return (<span className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: delay }}/>);
}
// Renders timestamp only after mount to avoid SSR/client locale mismatches.
function ClientTime({ ts }) {
    const [label, setLabel] = useState("");
    useEffect(() => {
        setLabel(ts ? formatTime(ts) : formatTime(Date.now()));
    }, [ts]);
    return <span suppressHydrationWarning>{label}</span>;
}
// Tiny safe inline markdown renderer (escapes HTML, then bold/italic)
function renderInlineMarkdown(text) {
    const escaped = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    return escaped
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/\n/g, "<br />");
}
