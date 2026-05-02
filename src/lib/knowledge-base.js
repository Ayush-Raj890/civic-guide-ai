export const WELCOME_TEXT = "Hi! I'm **CivicGuide AI** 🗳️ — ask me anything about voting, registration, or how elections work. You can also attach a screenshot or document and I'll reference it.";

export const initialSuggestions = [
    "How do I register to vote?",
    "What documents do I need?",
    "Can I vote by mail?",
    "When are results announced?",
];

export const knowledgeBase = [
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
        reply: "On voting day, bring your ID to your assigned **polling station**. You'll be given a ballot to mark in private and then drop into a secure box.",
        followups: ["Where is my polling station?", "How do I use a ballot?", "What time do polls close?"],
    },
];

export function findReply(text) {
    const lower = text.toLowerCase();
    for (const entry of knowledgeBase) {
        if (entry.keywords.some((k) => lower.includes(k))) {
            return { reply: entry.reply, followups: entry.followups };
        }
    }
    return { 
        reply: "That's a great question! While I'm a demo assistant, you can usually find detailed answers on your country's official **election commission** website.", 
        followups: initialSuggestions 
    };
}
