import { useEffect, useRef, useState } from "react";
import "./Chat.css";

const DEFAULT_MESSAGES = [
  {
    role: "assistant",
    content:
      "Hello there! Welcome to Melodic Voice AI Coach! Tell me your child's age, speech challenge, and favorite interests.",
  },
];

function parseSseEvents(chunkBuffer) {
  const events = chunkBuffer.split(/\r?\n\r?\n/);
  const remainder = events.pop() || "";

  return { events, remainder };
}

export default function AIChat() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("melodic-chat");
    return saved ? JSON.parse(saved) : DEFAULT_MESSAGES;
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showJumpButton, setShowJumpButton] = useState(false);

  const chatRef = useRef(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    const container = chatRef.current;

    if (!container) return;

    const nearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 80;

    if (nearBottom) {
      container.scrollTop = container.scrollHeight;
      setShowJumpButton(false);
    } else {
      setShowJumpButton(true);
    }
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("melodic-chat", JSON.stringify(messages));
  }, [messages]);

  async function sendMessage() {
    const trimmedInput = input.trim();

    if (!trimmedInput || loading) return;

    const userMessage = {
      role: "user",
      content: trimmedInput,
    };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    controllerRef.current = new AbortController();

    try {
      const response = await fetch("http://localhost:3001/chat", {
        method: "POST",
        signal: controllerRef.current.signal,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No response stream received.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";
      let buffer = "";
      let assistantStarted = false;

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const { events, remainder } = parseSseEvents(buffer);
        buffer = remainder;

        for (const eventChunk of events) {
          const lines = eventChunk
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean);
          const eventName =
            lines.find((line) => line.startsWith("event:"))?.slice(6).trim() ||
            "message";
          const data = lines
            .filter((line) => line.startsWith("data:"))
            .map((line) => line.slice(5).trim())
            .join("\n");

          if (!data) {
            continue;
          }

          const payload = JSON.parse(data);

          if (eventName === "error") {
            throw new Error(payload.error || "Streaming request failed.");
          }

          if (eventName === "end" || payload.done) {
            continue;
          }

          if (!payload.text) {
            continue;
          }

          assistantText += payload.text;

          setMessages((prev) => {
            const nextMessages = [...prev];

            if (!assistantStarted) {
              nextMessages.push({
                role: "assistant",
                content: assistantText,
              });
              assistantStarted = true;
            } else {
              nextMessages[nextMessages.length - 1] = {
                role: "assistant",
                content: assistantText,
              };
            }

            return nextMessages;
          });
        }
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error);

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, something went wrong while generating a response.",
          },
        ]);
      }
    } finally {
      setLoading(false);
      controllerRef.current = null;
    }
  }

  function stopGeneration() {
    controllerRef.current?.abort();
    setLoading(false);
  }

  return (
    <div className="chat-page">
      <div className="chat-header">
        <h1 className="chat-title">Melodic Voice AI Coach</h1>
        <p className="chat-subtitle">
  Personalized speech guidance for parents and guardians.
</p>
      </div>

      <div className="chat-container">
        <div className="messages" ref={chatRef}>
          {messages.map((msg, index) => (
            <div key={index} className={msg.role}>
              {msg.content}
            </div>
          ))}

          {loading && messages[messages.length - 1]?.role === "user" && (
            <div className="assistant thinking">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>

        {showJumpButton && (
          <button
            className="jump-button"
            onClick={() => {
              chatRef.current.scrollTop = chatRef.current.scrollHeight;
              setShowJumpButton(false);
            }}
          >
            Jump to latest ↓
          </button>
        )}

        <div className="input-row">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about your child's speech..."
            disabled={loading}
          />

          <button onClick={sendMessage} disabled={loading}>
            Send
          </button>

          {loading && <button onClick={stopGeneration}>Stop</button>}
        </div>
      </div>
    </div>
  );
}
