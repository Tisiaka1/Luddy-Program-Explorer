import React, { useEffect, useRef, useState } from "react";
import { programs } from "../data/programs";
import { model } from "../firebase";
import "./AskAI.css";

const starterPrompts = [
  "Which programs are online?",
  "I like AI and data",
  "Help me choose a major",
];

const initialMessage = {
  id: 0,
  role: "assistant",
  text: "Hi! I can help you explore Luddy majors, minors, and certificates. What are you interested in?",
};

const programCatalog = programs
  .map((program) => {
    const details = [
      `${program.name} (${program.type})`,
      program.degree,
      program.credits ? `Credits: ${program.credits}` : null,
      program.option ? `Option: ${program.option}` : null,
      program.description,
      program.study?.length ? `Topics: ${program.study.join(", ")}` : null,
      program.careers?.length ? `Careers: ${program.careers.join(", ")}` : null,
      program.recommendation,
      program.format,
    ].filter(Boolean);

    return `- ${details.join("; ")}`;
  })
  .join("\n");

const systemInstruction = `You are the Ask AI guide for the Luddy Program Explorer at IU Indianapolis.
Help prospective students compare the programs in the catalog below. Be friendly, concise, and practical.
Base program-specific claims only on this catalog. If the catalog does not contain an answer, say that clearly and suggest confirming with a Luddy advisor.
Use plain text and short paragraphs rather than Markdown tables.

PROGRAM CATALOG
${programCatalog}`;

function AIIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2.75c.48 4.97 3.28 7.77 8.25 8.25-4.97.48-7.77 3.28-8.25 8.25C11.52 14.28 8.72 11.48 3.75 11 8.72 10.52 11.52 7.72 12 2.75Z"
        fill="currentColor"
      />
      <path
        d="M19.25 2.5c.16 1.67 1.08 2.59 2.75 2.75-1.67.16-2.59 1.08-2.75 2.75-.16-1.67-1.08-2.59-2.75-2.75 1.67-.16 2.59-1.08 2.75-2.75ZM4.25 16.5c.16 1.67 1.08 2.59 2.75 2.75-1.67.16-2.59 1.08-2.75 2.75-.16-1.67-1.08-2.59-2.75-2.75 1.67-.16 2.59-1.08 2.75-2.75Z"
        fill="currentColor"
      />
    </svg>
  );
}

function AskAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);
  const requestInFlightRef = useRef(false);
  const isMountedRef = useRef(true);
  const messageIdRef = useRef(1);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    inputRef.current?.focus();

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        window.requestAnimationFrame(() => launcherRef.current?.focus());
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages, isTyping]);

  const closeChat = () => {
    setIsOpen(false);
    window.requestAnimationFrame(() => launcherRef.current?.focus());
  };


  async function sendMessage(messageText) {
    const trimmedMessage = messageText.trim();
    if (!trimmedMessage || requestInFlightRef.current) return;

    const userMessage = {
      id: messageIdRef.current++,
      role: "user",
      text: trimmedMessage,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInput("");
    setIsTyping(true);
    requestInFlightRef.current = true;

    try {
      if (!model) {
        throw new Error("Firebase is not configured.");
      }

      if (chatRef.current === null) {
        chatRef.current = model.startChat({ systemInstruction });
      }

      const result = await chatRef.current.sendMessage(trimmedMessage);
      const reply = result.response.text().trim();

      if (!isMountedRef.current) return;

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: messageIdRef.current++,
          role: "assistant",
          text: reply || "I’m sorry, I couldn’t generate a response. Please try again.",
        },
      ]);
    } catch (error) {
      console.error("Ask AI request failed:", error);
      chatRef.current = null;

      if (!isMountedRef.current) return;

      const needsConfiguration = !model || ["no-api-key", "no-project-id", "no-app-id", "api-not-enabled"]
        .some((code) => error?.code?.includes(code));

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: messageIdRef.current++,
          role: "assistant",
          isError: true,
          text: needsConfiguration
            ? "Ask AI still needs its Firebase configuration. Add the VITE_FIREBASE values, restart the app, and try again."
            : "I’m having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      requestInFlightRef.current = false;
      if (isMountedRef.current) setIsTyping(false);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div className={`ask-ai-widget${isOpen ? " is-open" : ""}`}>
      {isOpen && (
        <section
          className="ask-ai-panel"
          id="ask-ai-chat"
          role="dialog"
          aria-labelledby="ask-ai-title"
        >
          <header className="ask-ai-header">
            <span className="ask-ai-header-icon">
              <AIIcon />
            </span>
            <span className="ask-ai-heading">
              <strong id="ask-ai-title">Ask AI</strong>
              <span>
                <i className={model ? "" : "is-setup-required"} aria-hidden="true" />
                {model ? "Luddy program guide" : "Firebase setup required"}
              </span>
            </span>
            <button className="ask-ai-close" type="button" onClick={closeChat} aria-label="Close Ask AI chat">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m6.5 6.5 11 11m0-11-11 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </header>

          <div className="ask-ai-conversation" role="log" aria-live="polite" aria-busy={isTyping}>
            {messages.map((message) => (
              <div
                className={`ask-ai-message ask-ai-message--${message.role}${message.isError ? " ask-ai-message--error" : ""}`}
                key={message.id}
              >
                {message.role === "assistant" && (
                  <span className="ask-ai-avatar" aria-hidden="true"><AIIcon /></span>
                )}
                <p>{message.text}</p>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="ask-ai-suggestions" aria-label="Suggested questions">
                {starterPrompts.map((prompt) => (
                  <button type="button" key={prompt} onClick={() => sendMessage(prompt)}>
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {isTyping && (
              <div className="ask-ai-message ask-ai-message--assistant" aria-label="Ask AI is typing">
                <span className="ask-ai-avatar" aria-hidden="true"><AIIcon /></span>
                <span className="ask-ai-typing" aria-hidden="true"><i /><i /><i /></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="ask-ai-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="ask-ai-input">Ask about a Luddy program</label>
            <div className="ask-ai-input-row">
              <input
                id="ask-ai-input"
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about programs..."
                autoComplete="off"
                maxLength={240}
              />
              <button type="submit" disabled={!input.trim() || isTyping} aria-label="Send message">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h13m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <p>AI can make mistakes — confirm program details with a Luddy advisor.</p>
          </form>
        </section>
      )}

      <button
        className="ask-ai-launcher"
        type="button"
        ref={launcherRef}
        aria-expanded={isOpen}
        aria-controls={isOpen ? "ask-ai-chat" : undefined}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="ask-ai-launcher-icon"><AIIcon /></span>
        <span>Ask AI</span>
      </button>
    </div>
  );
}

export default AskAI;
