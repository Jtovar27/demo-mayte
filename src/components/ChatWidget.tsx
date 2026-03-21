"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { SITE } from "@/config/site";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME: Record<"es" | "en", string> = {
  es: "Hola! Soy el asistente virtual de Taxes and Insurance Group LLC. ¿En qué puedo ayudarte hoy?",
  en: "Hello! I'm the virtual assistant for Taxes and Insurance Group LLC. How can I help you today?",
};

const PLACEHOLDER: Record<"es" | "en", string> = {
  es: "Escribe tu pregunta...",
  en: "Type your question...",
};

const TITLE: Record<"es" | "en", string> = {
  es: "Asistente Virtual",
  en: "Virtual Assistant",
};

const SUBTITLE: Record<"es" | "en", string> = {
  es: "Taxes & Insurance Group LLC",
  en: "Taxes & Insurance Group LLC",
};

export default function ChatWidget() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME[lang] },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update welcome message when language changes (only if it's still the default)
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].role === "assistant") {
        return [{ role: "assistant", content: WELCOME[lang] }];
      }
      return prev;
    });
  }, [lang]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Add empty assistant message to stream into
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: updated[updated.length - 1].content + chunk,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content:
            lang === "es"
              ? `Lo siento, ocurrió un error. Por favor llámanos al ${SITE.phone}.`
              : `Sorry, an error occurred. Please call us at ${SITE.phone}.`,
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-4 z-50 flex flex-col rounded-2xl shadow-2xl overflow-hidden"
          style={{
            width: "min(380px, calc(100vw - 2rem))",
            height: "min(520px, calc(100vh - 8rem))",
            border: "1px solid #2E2E2E",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{ backgroundColor: "#1C1C1C" }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(185,149,79,0.2)", border: "1px solid #B9954F" }}
            >
              <Bot size={18} style={{ color: "#B9954F" }} />
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold leading-tight">{TITLE[lang]}</p>
              <p className="text-xs leading-tight truncate" style={{ color: "#B9954F" }}>
                {SUBTITLE[lang]}
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto p-1 rounded-lg transition-colors hover:bg-white/10"
            >
              <X size={18} className="text-white" />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            style={{ backgroundColor: "#F5F5F5" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                  style={
                    msg.role === "user"
                      ? { backgroundColor: "#1C1C1C", color: "#FFFFFF", borderBottomRightRadius: 4 }
                      : { backgroundColor: "#FFFFFF", color: "#1C1C1C", borderBottomLeftRadius: 4, border: "1px solid #E4E4E4" }
                  }
                >
                  {msg.content || (
                    <span className="flex gap-1 items-center" style={{ color: "#B9954F" }}>
                      <span className="animate-bounce" style={{ animationDelay: "0ms" }}>•</span>
                      <span className="animate-bounce" style={{ animationDelay: "150ms" }}>•</span>
                      <span className="animate-bounce" style={{ animationDelay: "300ms" }}>•</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            className="flex items-center gap-2 px-3 py-3 flex-shrink-0"
            style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid #E4E4E4" }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder={PLACEHOLDER[lang]}
              disabled={loading}
              className="flex-1 text-sm px-3 py-2 rounded-xl outline-none disabled:opacity-50"
              style={{ backgroundColor: "#F5F5F5", border: "1px solid #E4E4E4", color: "#1C1C1C" }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-opacity disabled:opacity-40"
              style={{ backgroundColor: "#B9954F" }}
            >
              <Send size={15} className="text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
        style={{ backgroundColor: "#B9954F" }}
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
      >
        {open ? (
          <X size={22} className="text-white" />
        ) : (
          <MessageCircle size={22} className="text-white" />
        )}
      </button>
    </>
  );
}
