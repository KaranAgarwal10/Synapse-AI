require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// Serve static files from the current directory
app.use(express.static(__dirname));

// Initialize Gemini Client
let ai;
try {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
} catch (error) {
    console.warn("Failed to initialize GoogleGenAI. Please check your API key in the .env file.");
}

// System Instructions to act as Synapse AI (Gemma 4 persona)
const systemInstruction = "You are Synapse AI, an advanced cross-disciplinary research catalyst powered by Gemma 4. You analyze biomedical, pharmacological, and clinical data to uncover novel insights. Maintain a professional, highly scientific, yet accessible tone.";

// Endpoint: Synthesize Data
app.post('/api/synthesize', async (req, res) => {
    try {
        const { streams } = req.body;
        if (!streams || streams.length < 2) {
            return res.status(400).json({ error: "At least two data streams are required." });
        }

        const prompt = `Act as Synapse AI. The user has inputted data streams from the following fields: ${streams.join(', ')}. 
Generate a brief (2-3 sentences) theoretical, highly plausible correlation or discovery that links these specific fields. Focus on a novel therapeutic intervention or biological mechanism. Format the response as a single, impactful paragraph.`;

        if (!ai || !process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_api_key') {
            return res.json({ result: `[MOCK AI RESPONSE - ADD API KEY] High correlation detected between ${streams.join(' and ')} variables. This suggests a novel therapeutic intervention pathway involving secondary protein folding anomalies.` });
        }

        let responseText;
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    systemInstruction: systemInstruction,
                    temperature: 0.7,
                }
            });
            responseText = response.text;
        } catch (apiError) {
            console.error("Gemini API Error (Synthesis):", apiError.message);
            responseText = `<ul><li><strong style="color:var(--accent-red);">[MOCK RESPONSE - Google API Overloaded]</strong></li><li>High correlation detected between ${streams.join(' and ')}.</li><li>Suggests a novel therapeutic intervention pathway involving secondary protein folding anomalies.</li></ul>`;
        }

        res.json({ result: responseText });
    } catch (error) {
        console.error("Synthesis Error:", error);
        res.status(500).json({ error: "Failed to generate synthesis." });
    }
});

// Endpoint: Contextual Translation
app.post('/api/translate', async (req, res) => {
    try {
        const { text, targetAudience } = req.body;
        if (!text || !targetAudience) {
            return res.status(400).json({ error: "Text and target audience are required." });
        }

        let personaInstruction = "";
        if (targetAudience === "researcher") {
            personaInstruction = "Translate the following text or medical concept into highly technical, peer-reviewed journal style language. Focus on cellular mechanisms, statistical significance, and biological pathways. Use 2-3 clear bullet points.";
        } else if (targetAudience === "clinician") {
            personaInstruction = "Translate the following text or medical concept into a practical, actionable summary for a medical clinician. Focus heavily on diagnosis, screening protocols, patient outcomes, and treatment efficacy. Use 2-3 clear, short bullet points.";
        } else if (targetAudience === "policy") {
            personaInstruction = "Translate the following text or medical concept for a public policy maker. Explain it very simply, avoiding all complex jargon. Use 2-3 clear bullet points emphasizing public health impact, funding, and community actionable steps.";
        } else {
            return res.status(400).json({ error: "Invalid target audience." });
        }

        const prompt = `${personaInstruction}\n\nText to translate:\n"${text}"\n\nProvide ONLY the translated text formatted as an HTML list (<ul><li>...</li></ul>). Do not use markdown backticks.`;

        if (!ai || !process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_api_key') {
             return res.json({ result: `[MOCK AI TRANSLATION - ADD API KEY] Translated for ${targetAudience}: The data suggests significant correlations requiring attention in this domain.` });
        }

        let responseText;
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    systemInstruction: systemInstruction,
                    temperature: 0.4,
                }
            });
            responseText = response.text;
        } catch (apiError) {
            console.error("Gemini API Error (Translation):", apiError.message);
            responseText = `<ul><li><strong style="color:var(--accent-red);">[MOCK RESPONSE - Google API Overloaded]</strong></li><li>This is a simulated translation for a <b>${targetAudience}</b> regarding "<i>${text}</i>".</li><li>The data suggests significant correlations requiring immediate attention in this specific domain to improve targeted outcomes.</li></ul>`;
        }

        res.json({ result: responseText });
    } catch (error) {
        console.error("Translation Error:", error);
        res.status(500).json({ error: "Failed to translate text." });
    }
});

// Endpoint: Hypothesis Generation
app.post('/api/hypothesis', async (req, res) => {
    try {
        const { topic } = req.body;
        if (!topic) {
            return res.status(400).json({ error: "Topic is required." });
        }

        const prompt = `Act as Synapse AI. The user is researching the topic: "${topic}".
Generate a highly specific, cutting-edge, and testable scientific hypothesis related to this topic. It should bridge at least two disciplines (e.g., genetics and environment, or pharmacology and neurology). Keep it concise, 1 to 2 sentences max.`;

        if (!ai || !process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_api_key') {
             return res.json({ result: `[MOCK AI HYPOTHESIS - ADD API KEY] Based on recent cohorts, modulating neural pathways related to ${topic} could mitigate progression by altering local inflammatory responses.` });
        }

        let responseText;
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    systemInstruction: systemInstruction,
                    temperature: 0.8,
                }
            });
            responseText = response.text;
        } catch (apiError) {
            console.error("Gemini API Error (Hypothesis):", apiError.message);
            responseText = `<span style="color:var(--accent-red);">[MOCK RESPONSE - Google API Overloaded]</span> Based on recent cohorts, modulating neural pathways related to "${topic}" could mitigate progression by altering local inflammatory responses.`;
        }

        res.json({ result: responseText });
    } catch (error) {
        console.error("Hypothesis Error:", error);
        res.status(500).json({ error: "Failed to generate hypothesis." });
    }
});

app.listen(port, () => {
    console.log(`Synapse AI server running at http://localhost:${port}`);
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_api_key') {
        console.log("WARNING: GEMINI_API_KEY is not set in .env file. API will return mock responses.");
    }
});
