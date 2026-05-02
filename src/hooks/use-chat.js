import { useState, useEffect, useRef, useCallback } from "react";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, deleteDoc, getDocs } from "firebase/firestore";
import { auth, db, geminiModel, analytics } from "@/lib/google-services";
import { logEvent } from "firebase/analytics";

/**
 * Custom hook to manage chatbot state and operations
 */
export function useChat(initialWelcomeText, staticKnowledgeBase) {
    const [messages, setMessages] = useState([
        { id: "welcome", role: "bot", text: initialWelcomeText, ts: Date.now() },
    ]);
    const [typing, setTyping] = useState(false);
    const [pendingAttachments, setPendingAttachments] = useState([]);
    const [historyLoaded, setHistoryLoaded] = useState(false);

    // Sync with Firestore (Auth) or localStorage (Guest)
    useEffect(() => {
        let unsubscribe = () => {};
        
        if (auth.currentUser) {
            const q = query(
                collection(db, "users", auth.currentUser.uid, "chat_history"),
                orderBy("ts", "asc")
            );
            unsubscribe = onSnapshot(q, (snapshot) => {
                const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                if (fetched.length > 0) setMessages(fetched);
                setHistoryLoaded(true);
            });
        } else {
            const saved = localStorage.getItem("civic_chat_history");
            if (saved) setMessages(JSON.parse(saved));
            setHistoryLoaded(true);
        }
        
        return () => unsubscribe();
    }, [auth.currentUser]);

    // Persistent storage for guests
    useEffect(() => {
        if (!auth.currentUser && historyLoaded) {
            localStorage.setItem("civic_chat_history", JSON.stringify(messages));
        }
    }, [messages, historyLoaded]);

    /**
     * Sends a message and gets AI response
     */
    const sendMessage = useCallback(async (text, attachments = []) => {
        const trimmed = text.trim();
        if (!trimmed && !attachments.length) return;

        const userMsg = {
            role: "user",
            text: trimmed,
            ts: Date.now(),
            attachments: attachments.length ? attachments : undefined,
        };

        // UI Update: Immediate user message
        if (!auth.currentUser) {
            setMessages(prev => [...prev, userMsg]);
        }
        
        setTyping(true);

        // Analytics
        if (analytics) logEvent(analytics, "chat_message_sent", { has_attachments: attachments.length > 0 });

        try {
            // 1. Prepare AI prompt
            const promptParts = [trimmed || "Describe this attachment."];
            for (const att of attachments) {
                if (att.kind === "image" && att.url) {
                    promptParts.push({ inlineData: { data: att.url.split(",")[1], mimeType: "image/png" } });
                }
            }

            // 2. Get Response
            const result = await geminiModel.generateContent(promptParts);
            const replyText = result.response.text();

            const botMsg = {
                role: "bot",
                text: replyText,
                ts: Date.now(),
            };

            // 3. Persist
            if (auth.currentUser) {
                const col = collection(db, "users", auth.currentUser.uid, "chat_history");
                await addDoc(col, { ...userMsg, ts: serverTimestamp() });
                await addDoc(col, { ...botMsg, ts: serverTimestamp() });
            } else {
                setMessages(prev => [...prev, botMsg]);
            }
        } catch (err) {
            console.error("Chat Error:", err);
            // Error handling fallback omitted for brevity
        } finally {
            setTyping(false);
        }
    }, []);

    const resetChat = async () => {
        if (auth.currentUser) {
            const col = collection(db, "users", auth.currentUser.uid, "chat_history");
            const snap = await getDocs(col);
            await Promise.all(snap.docs.map(d => deleteDoc(d.ref)));
        } else {
            localStorage.removeItem("civic_chat_history");
            setMessages([{ id: "welcome", role: "bot", text: initialWelcomeText, ts: Date.now() }]);
        }
    };

    return {
        messages,
        typing,
        setTyping,
        sendMessage,
        resetChat,
        historyLoaded,
        pendingAttachments,
        setPendingAttachments
    };
}
