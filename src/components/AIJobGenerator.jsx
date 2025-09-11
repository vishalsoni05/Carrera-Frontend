import React, { useMemo, useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function buildPrompt(userText) {
  const flavors = [
    "Be concise but vivid. Use bullet lists.",
    "Focus on today’s market. Be practical and direct.",
    "Be a mentor. Prioritize impact and salary clarity.",
    "Be energetic with a hacker-terminal vibe (no fluff).",
  ];
  const flavor = flavors[Math.floor(Math.random() * flavors.length)];
  const today = new Date().toLocaleDateString();
  return `
You are a senior career coach + labor-market analyst.
${flavor}

User dream (verbatim): "${userText}"

Return:
1) 3–5 matching careers (title + 1-line why-fit)
2) Skills to acquire (grouped: Core, Tools, Bonus)
3) Action plan (next 30/90 days)
4) 3 example job titles to search right now

BONUS (optional, only if useful):
- Adjacent career paths
- Typical salary ranges
- 1 motivational tip

Rules:
- Use clear headings and bullets.
- Keep it < 2500 chars.
- Avoid repetition. Date context: ${today}.
`;
}

export default function AIJobGenerator({ aiQuery, setAiQuery, aiOutput, setAiOutput }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const termRef = useRef(null);

  const model = useMemo(() => {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    return genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { temperature: 0.9, topP: 0.95 },
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setAiOutput(""); 
    if (!aiQuery.trim()) return;

    setLoading(true);
    try {
      const stream = await model.generateContentStream(buildPrompt(aiQuery));
      let full = "";

      for await (const chunk of stream.stream) {
        const text = chunk.text();
        full += text;
        setAiOutput((prev) => prev + text);

        if (termRef.current) {
          termRef.current.scrollTop = termRef.current.scrollHeight;
        }
      }
    } catch (err) {
      console.error(err);
      if (String(err).includes("429")) setError("Rate limit hit. Try again later.");
      else if (String(err).includes("API key")) setError("Missing/invalid API key.");
      else setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function copyOutput() {
    if (!aiOutput) return;
    navigator.clipboard.writeText(aiOutput);
  }

  return (
    <section className="ai-terminal-section">
      <div className="ai-terminal-wrap">
        <div className="ai-terminal-header">
          <div className="pulse-dot" aria-label="live" />
          <span>AI Dream Job Generator</span>
          <button className="ghost-btn" onClick={copyOutput} disabled={!aiOutput}>
            Copy
          </button>
        </div>

        <form className="ai-terminal-form" onSubmit={handleSubmit}>
          <input
            className="ai-terminal-input"
            type="text"
            placeholder='Describe your dream (e.g., "I want to work with rockets 🚀")'
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
          />
          <button className="ai-terminal-btn" type="submit" disabled={loading}>
            {loading ? "Thinking…" : "Generate"}
          </button>
        </form>

        {error && <div className="ai-terminal-error">⚠ {error}</div>}

        <div className="ai-terminal-screen" ref={termRef}>
          {loading && (
            <div className="ai-terminal-loader">
              <span className="scanline" />
              <p>Accessing career multiverse…</p>
              <p>Analyzing labor-market vectors…</p>
              <p>Compiling action plan…</p>
            </div>
          )}
          {aiOutput && <pre className="ai-terminal-output">{aiOutput}</pre>}
          {!loading && !aiOutput && !error && (
            <div className="ai-terminal-hint">
              Search Here to get real AI Answer.
              Pro tip: be specific — “I love biotech + coding, remote, India, ₹20–30L”.
            </div>
          )}
        </div>

        <div className="ai-terminal-footnote">
          <span className="live-tag"><span className="dot" /> LIVE</span>
          <span>Powered by Gemini 1.5 Flash</span>
        </div>
      </div>
    </section>
  );
}
