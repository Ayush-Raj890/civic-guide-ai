import React from "react";
import ReactMarkdown from "react-markdown";
import { Bot, User, FileText, CheckCheck } from "lucide-react";
import { formatTime, formatBytes } from "@/lib/chat-utils";

export function MessageBubble({ message }) {
  const isUser = message.role === "user";
  const hasText = message.text && message.text.trim().length > 0;
  const hasAttachments = !!message.attachments?.length;

  return (
    <div className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : ""} ${message.isFirstOfGroup ? "mt-3" : "mt-1"}`}>
      <div className={`w-9 shrink-0 ${message.isLastOfGroup ? "" : "invisible"}`}>
        <Avatar role={message.role} />
      </div>
      
      <div className={`flex max-w-[75%] flex-col gap-1.5 ${isUser ? "items-end" : "items-start"}`}>
        {/* Attachments */}
        {hasAttachments && (
          <div className={`flex flex-wrap gap-1.5 ${isUser ? "justify-end" : ""}`}>
            {message.attachments.map((a) => (
              <AttachmentItem key={a.id} attachment={a} isUser={isUser} />
            ))}
          </div>
        )}

        {/* Text Bubble */}
        {hasText && (
          <div className={`px-4 py-2.5 text-sm leading-relaxed shadow-[var(--shadow-card)] ${
            isUser
              ? "bg-[image:var(--gradient-primary)] text-primary-foreground rounded-2xl rounded-tr-sm"
              : "bg-card text-foreground rounded-2xl rounded-tl-sm border border-border/50"
          }`}>
            <ReactMarkdown className="prose-sm max-w-none prose-invert font-medium">
              {message.text}
            </ReactMarkdown>
          </div>
        )}

        {/* Timestamp */}
        {message.isLastOfGroup && (
          <div className={`flex items-center gap-1 px-1 text-[11px] text-muted-foreground ${isUser ? "flex-row-reverse" : ""}`}>
            <span>{formatTime(message.ts)}</span>
            {isUser && <CheckCheck className="h-3 w-3 text-primary" />}
          </div>
        )}
      </div>
    </div>
  );
}

function Avatar({ role }) {
  const isBot = role === "bot";
  return (
    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-[var(--shadow-card)] ${
      isBot ? "bg-[image:var(--gradient-primary)] text-primary-foreground" : "bg-accent text-accent-foreground"
    }`}>
      {isBot ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
    </div>
  );
}

function AttachmentItem({ attachment, isUser }) {
  const isImage = attachment.kind === "image";

  if (isImage) {
    return (
      <a href={attachment.url} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5">
        <img src={attachment.url} alt={attachment.name} className="max-h-56 max-w-[240px] object-cover" />
      </a>
    );
  }

  return (
    <a href={attachment.url} download={attachment.name} className={`flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs shadow-[var(--shadow-card)] transition-colors ${
      isUser ? "border-white/20 bg-white/10 text-white hover:bg-white/20" : "border-border bg-card text-foreground hover:bg-secondary"
    }`}>
      <FileText className="h-4 w-4 shrink-0" />
      <div className="min-w-0">
        <p className="truncate font-medium">{attachment.name}</p>
        <p className={`text-[10px] ${isUser ? "text-white/70" : "text-muted-foreground"}`}>
          {formatBytes(attachment.size)}
        </p>
      </div>
    </a>
  );
}
