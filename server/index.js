import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MODEL, SYSTEM_PROMPT } from "./config.js";

// Load the .env file inside the server folder
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  console.log("Received /chat request");
  console.log("Chat request received:", req.body);

  try {
    const { messages } = req.body;

    const conversation = messages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    // Streaming headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent?alt=sse&key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${SYSTEM_PROMPT}\n\n${conversation}`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
  const errorText = await response.text();
  console.error("Gemini API Error:");
  console.error(errorText);
  return res.status(500).json({ error: errorText });
}

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", response.status, errorText);

      res.status(500).json({
        error: errorText,
      });

      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value);
      res.write(chunk);
    }

    res.write("event: end\ndata: done\n\n");
    res.end();
  } catch (error) {
  console.error("Server Error:", error);

  if (error.cause) {
    console.error("Cause:", error.cause);
  }

  res.status(500).json({
    error: error.message,
  });
}
});

app.listen(3001, () => {
  console.log("Server running at http://localhost:3001");
  console.log("Using model:", MODEL);
});