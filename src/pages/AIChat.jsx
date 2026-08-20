import { useEffect, useRef, useState } from "react";
import "./Chat.css";

export default function AIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;

    const updatedMessages = [
      ...messages,
      { role: "user", content: input }
    ];

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

      // Create an empty assistant message that will be updated
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "" }
      ]);

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value);

        const lines = chunk
          .split("\n")
          .filter(line => line.startsWith("data:"));

        for (const line of lines) {
          const json = line.replace("data: ", "").trim();

          if (!json) continue;

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
            console.error("SSE parse error:", err);
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
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role}>
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="assistant">
            Melodic Voice AI is thinking...
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      <div className="input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your child's speech..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={sendMessage}>Send</button>

        {loading && (
          <button onClick={stopGeneration}>Stop</button>
        )}
      </div>
    </div>
  );
}