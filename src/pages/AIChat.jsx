import { useEffect, useRef, useState } from "react";
import "./Chat.css";

export default function AIChat() {
  const defaultMessages = [
  {
    role: "assistant",
    content:
      "Hello there! 🎶 Welcome to Melodic Voice AI Coach! Tell me your child's age, speech challenge, and favorite interests."
  }
];

const [messages, setMessages] = useState(() => {
  const saved = localStorage.getItem("melodic-chat");

  return saved ? JSON.parse(saved) : defaultMessages;
});

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(null);
const controllerRef = useRef(null);
const [showJumpButton, setShowJumpButton] = useState(false);

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
    if (!input.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: input
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
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: updatedMessages })
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

      // Create an empty assistant message that will update while streaming
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "" }
      ]);

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;

          const json = line.slice(5).trim();

          if (!json || json === "done" || json === "[DONE]") continue;

          try {
            const data = JSON.parse(json);

            const text =
              data.candidates?.[0]?.content?.parts?.[0]?.text || "";

            if (!text) continue;

            assistantText += text;

            setMessages(prev => {
              const copy = [...prev];
              copy[copy.length - 1] = {
                role: "assistant",
                content: assistantText
              };
              return copy;
            });
          } catch (err) {
            console.log("Skipping invalid SSE chunk:", json);
          }
        }
      }
    } catch (error) {
      console.error(error);

      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong while generating a response."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function stopGeneration() {
    controllerRef.current?.abort();
    setLoading(false);
  }

  return (
    <div className="chat-page">
      <div className="chat-header">
        <h1>Melodic Voice AI Coach</h1>
        <p>Personalized speech guidance for parents and guardians.</p>
      </div>

      <div className="chat-container">
        <div className="messages" ref={chatRef}>
  {messages.map((msg, index) => (
    <div key={index} className={msg.role}>
      {msg.content}
    </div>
  ))}

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
</div>

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

          {loading && (
  <>
    <div className="thinking">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>

    <button onClick={stopGeneration}>
      Stop
    </button>
  </>
)}
        </div>
      </div>
    </div>
  );
}