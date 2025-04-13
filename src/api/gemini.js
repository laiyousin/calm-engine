import { GoogleGenerativeAI } from '@google/generative-ai';

export async function generateSchedule(todos, emotion, favorites) {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = 
    `You are a compassionate AI assistant that helps anxious users plan a balanced and emotionally supportive one-day schedule.

    Please use the following user input:

    Tasks:
    ${todos.map((t, i) => `${i + 1}. ${t.text} (${t.percent}%)`).join("\n")}

    Mood: ${emotion}
    Preferred relaxing activities: ${favorites}

    Generate a full schedule from 09:00 to 21:00.

    For each time slot, return:
    - "time": time in HH:MM format
    - "title": a concise name for this time slot (e.g. "Resume Polish")
    - "description": 1–2 short sentences describing what the user should do
    - "note": an emotionally supportive message or encouragement for the moment
    - "color": a hex color that matches the type of task:
    - #60a5fa for work/study
    - #34d399 for relaxing/self-care
    - #fbbf24 for light admin
    - #fb7185 for meals or breaks

    Return your output as a JSON array of objects with these 5 fields only.
    Do not include any markdown formatting or explanation.
    `;
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    try {
        const cleaned = text.trim()
            .replace(/^```json/, "")
            .replace(/^```/, "")
            .replace(/```$/, "")
            .trim();
        const schedule = JSON.parse(cleaned);
        return { schedule, raw: null };
    } catch (err) {
        console.error("❌ Failed to parse Gemini response:", text);
        return { schedule: [], raw: text };
    }
}