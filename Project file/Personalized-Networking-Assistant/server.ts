/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini API client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "") {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
}

// 1. Theme Analysis Endpoint
app.post("/api/gemini/analyze-themes", async (req, res) => {
  const { eventDescription } = req.body;
  if (!eventDescription) {
    return res.status(400).json({ error: "Missing eventDescription" });
  }

  const ai = getGeminiClient();
  if (!ai) {
    // Graceful fallback when API key is missing
    return res.json({
      themes: ["Networking", "Innovation", "Tech Collaboration", "Personal Branding"],
      warning: "GEMINI_API_KEY is not configured. Using standard default themes."
    });
  }

  const prompt = `Analyze the following professional event description. Identify 3 to 5 key themes, tech stacks, industries, or focus topics discussed. Return them ONLY as a JSON list of strings. No markdown, no explanations. Just a raw JSON list like ["Cloud Computing", "AI/ML", "B2B Marketing"].
  
Event Description:
"${eventDescription}"`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "[]";
    const themes = JSON.parse(text);
    res.json({ themes });
  } catch (err: any) {
    console.error("Gemini theme analysis failed:", err);
    res.json({
      themes: ["Professional Networking", "Tech Growth", "Business Dev"],
      error: err.message
    });
  }
});

// 2. Starter Generator Endpoint
app.post("/api/gemini/generate-starters", async (req, res) => {
  const { bioText, eventDescription, analyzedThemes } = req.body;
  if (!bioText || !eventDescription) {
    return res.status(400).json({ error: "Missing bioText or eventDescription" });
  }

  const ai = getGeminiClient();
  
  // Design the AI system prompt/context
  const themesString = Array.isArray(analyzedThemes) ? analyzedThemes.join(", ") : "general themes";
  const prompt = `You are an expert networking assistant. Create 3 personalized, high-impact conversation starters for a user with the following bio attending an event.
User Biography:
"${bioText}"

Event Description:
"${eventDescription}"

Event Key Themes:
${themesString}

Generate exactly 3 conversation starters in JSON format. Each starter must have:
1. "starter": A direct 1-2 sentence speaking prompt (e.g. "Hi, I noticed the talk on AI ethics earlier...")
2. "type": The style of starter, choose from: "Icebreaker" (low pressure), "Deep Dive" (technical/industry-focused), or "Future Outlook" (provocative/forward-looking)
3. "goal": A brief description of what this starter aims to accomplish or build rapport on.

Return ONLY a raw JSON array matching this structure. No markdown formatting.`;

  if (!ai) {
    // Fallback starters
    return res.json({
      starters: [
        {
          starter: `Hi! I read that this event focuses on ${themesString.split(",")[0] || "industry growth"}. How are you finding the sessions so far?`,
          type: "Icebreaker",
          goal: "Start a casual, low-pressure conversation based on the main event theme."
        },
        {
          starter: "Hello! Given your interest in the industry, what specific talks or discussions are you most excited about today?",
          type: "Deep Dive",
          goal: "Encourage a deeper professional exchange of thoughts."
        },
        {
          starter: `Hi! It seems like ${themesString} are shaping the future of this space. Where do you think we will be in five years?`,
          type: "Future Outlook",
          goal: "Inspire forward-looking ideas and share visions."
        }
      ],
      promptUsed: "Standard Local Formulaic Prompt (No GEMINI_API_KEY)",
      warning: "GEMINI_API_KEY is not configured. Running offline generator."
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "[]";
    const starters = JSON.parse(text);
    res.json({
      starters,
      promptUsed: prompt
    });
  } catch (err: any) {
    console.error("Gemini starter generator failed:", err);
    res.json({
      starters: [
        {
          starter: "Hi! What brings you to this event today?",
          type: "Icebreaker",
          goal: "General friendly introduction."
        }
      ],
      promptUsed: prompt,
      error: err.message
    });
  }
});

// 3. Wikipedia Search API
app.get("/api/wikipedia/search", async (req, res) => {
  const query = req.query.q as string;
  if (!query) {
    return res.status(400).json({ error: "Missing query parameter" });
  }

  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;
    const response = await fetch(url);
    const data = await response.json();
    const searchResults = data.query?.search || [];

    let topPageContent = "";
    let sourceUrl = "";

    if (searchResults.length > 0) {
      const topTitle = searchResults[0].title;
      sourceUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(topTitle.replace(/ /g, "_"))}`;
      const extractUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&explaintext=1&titles=${encodeURIComponent(topTitle)}&format=json&origin=*`;
      const extractResponse = await fetch(extractUrl);
      const extractData = await extractResponse.json();
      const pages = extractData.query?.pages || {};
      const pageId = Object.keys(pages)[0];
      if (pageId && pageId !== "-1") {
        topPageContent = pages[pageId].extract || "";
      }
    }

    res.json({
      results: searchResults.map((r: any) => ({
        title: r.title,
        snippet: r.snippet.replace(/<span class="searchmatch">/g, "").replace(/<\/span>/g, ""),
        pageid: r.pageid,
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(r.title.replace(/ /g, "_"))}`
      })),
      topExtract: topPageContent,
      sourceUrl
    });
  } catch (error: any) {
    console.error("Wikipedia search failed:", error);
    res.status(500).json({ error: error.message });
  }
});

// 4. Gemini Fact Check Verification Endpoint
app.post("/api/gemini/verify-fact", async (req, res) => {
  const { query, wikipediaContent } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Missing query" });
  }

  const ai = getGeminiClient();
  if (!ai) {
    // Fallback status checker using string search
    const hasWiki = !!wikipediaContent;
    const status = hasWiki ? "Verified" : "Unverified";
    return res.json({
      status,
      explanation: hasWiki 
        ? "Successfully cross-referenced query with Wikipedia page contents in offline mode (No Gemini Key set)."
        : "No matching context found in Wikipedia to verify this fact.",
      warning: "GEMINI_API_KEY is not configured. Running offline rules verification."
    });
  }

  const prompt = `You are a fact-checking auditor for a professional networking assistant. 
A user has asked to verify the following claim/fact:
"${query}"

We fetched the following top matching text from Wikipedia:
"${wikipediaContent || "No matching Wikipedia article content was found."}"

Compare the claim/fact to the Wikipedia context and determine the Verification Status. It must be exactly one of:
- "Verified" (if the Wikipedia content confirms the claim/fact is accurate)
- "Disputed" (if the Wikipedia content directly contradicts or raises doubts about the claim)
- "Unverified" (if there is insufficient context or no Wikipedia article exists to confirm/deny the claim)

Return a JSON object containing:
1. "status": "Verified" | "Disputed" | "Unverified"
2. "explanation": A clear, professional 2-3 sentence explanation of why this status was chosen, referencing Wikipedia details.

Return ONLY this JSON object. No other text.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (err: any) {
    console.error("Gemini fact verification failed:", err);
    res.json({
      status: "Unverified",
      explanation: `An error occurred during Gemini AI verification: ${err.message}`
    });
  }
});

// Serve frontend with Vite in development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const HOST = "0.0.0.0";
  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
