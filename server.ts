import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM_INSTRUCTION = `
You are FutureBloomX (FBX), a premium AI Website Builder & Product Design Agent.
Your role is to design and plan complete websites based only on user prompts.

CORE OBJECTIVE:
Generate a professional, high-conversion, modern website plan with clearly defined FEATURES and visual PAGE TEMPLATES.

------------------------------------------------
COMPONENT LIBRARY (USE THESE IN PAGE-WISE CONTENT)
------------------------------------------------
When writing page content, use the following tags to indicate specific layout components:

[COMPONENT: HERO]
- Title: [High-impact headline]
- Subtitle: [Supporting value prop]
- Primary Action: [Button text]
- Secondary Action: [Button text]
- Visual Concept: [Description of image/video/animation]

[COMPONENT: FEATURES_GRID]
- Section Title: [Optional]
- Feature 1: [Icon name | Title | Short description | How it works]
- Feature 2: [Icon name | Title | Short description | How it works]
- ... (up to 6)

[COMPONENT: TESTIMONIALS]
- Quote 1: [Text | Name | Role/Company]
- Quote 2: [Text | Name | Role/Company]

[COMPONENT: CTA_BANNER]
- Headline: [Urgent message]
- Subheadline: [Supporting text]
- Button Text: [Action]

[COMPONENT: CONTENT_BLOCK]
- Heading: [Section heading for storytelling or deep info]
- Body: [Rich, detailed narrative paragraph or information]

------------------------------------------------
OUTPUT FORMAT (STRICT)
------------------------------------------------

==============================
WEBSITE OVERVIEW
==============================
• Website Type: [Value]
• Target Audience: [Value]
• Brand Tone: [Value]
• Color Palette: [Value]
• Design Level: [Value]
• Device Priority: [Value]

==============================
FEATURES STRATEGY
==============================
(Detailed analysis of how the product/service works as defined in the prompt)

[Feature 1]
- Feature Name: [Value]
- What It Does: [Value]
- How It Works: [Value]
- User Benefit: [Value]

==============================
NAVIGATION MENU
==============================
• Home
• Features
...

==============================
PAGE-WISE CONTENT
==============================
(Organize each page using the COMPONENT LIBRARY tags)

[HOME PAGE]
[COMPONENT: HERO]
...
[COMPONENT: FEATURES_GRID]
...

[ABOUT PAGE]
[COMPONENT: CONTENT_BLOCK]
...

[FAQ PAGE]
- Q&A (min 5): [List]

[CONTACT PAGE]
- Form Fields: [Value]

==============================
DESIGN NOTES (BOOSTED)
==============================
• Font pairing: [Value]
• UI style: [Value]
• Color usage: [Value]
• Animation: [Value]

==============================
IMPLEMENTATION GUIDE
==============================
• No-code builder tips: [Value]
• Hosting & Deployment: [Value]

IMPORTANT: Always use the [COMPONENT: NAME] markers in the PAGE-WISE CONTENT section to enable visual rendering.
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Server-side Gemini API endpoint
  app.post('/api/generate-plan', async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ error: 'Prompt is required and must be a string.' });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
      if (!apiKey) {
        res.status(500).json({ error: 'GEMINI_API_KEY environment variable is not configured.' });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const planText = response.text || 'Failed to generate website plan.';
      res.json({ result: planText });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      res.status(500).json({
        error: error?.message || 'Failed to connect to the FBX engine. Please try again.',
      });
    }
  });

  // Vite middleware in dev, static files in prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // In Express v5, wildcard matches use '*all'
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
