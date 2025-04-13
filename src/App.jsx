import { useState } from "react";
import TodoInputList from "./TodoInputList";
import ScheduleTimeline from "./ScheduleTimeline";
import TagInput from "./TagInput";
import { generateSchedule } from "./api/gemini";
import { useEffect } from "react";



export default function App() {
    const [todos, setTodos] = useState([{ text: "", percent: 0 }]);
    const [emotion, setEmotion] = useState("anxious");
    const [favorites, setFavorites] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(false);
    const [rawText, setRawText] = useState("");

    const [currentSlot, setCurrentSlot] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            setCurrentSlot(`${hours}:${minutes}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const handleGenerate = async () => {
        setLoading(true);
        const filtered = todos.filter((t) => t.text.trim() !== "");
        const favoritesText = favorites.join(", ");
        const result = await generateSchedule(filtered, emotion, favoritesText);
        setSchedule(result.schedule);
        setRawText(result.raw || "");
        setLoading(false);
    };
    

    return (
        
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
            <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-wide animate-fade-in-scale">
                CalmEngine
            </h1>
                <p className="text-lg text-gray-300 mt-2">Feel better by planning smarter.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-10 gap-8 max-w-7xl mx-auto">
                {/* Input Panel */}
                <div className="md:col-span-3 space-y-6">
                    <div>
                        <TodoInputList todos={todos} setTodos={setTodos} />
                    </div>

                    <div>
                        <label className="block font-medium text-lg mb-1 text-center">Your current mood:</label>
                        <select
                            className="w-full bg-gray-800 border border-gray-600 text-white rounded p-2"
                            value={emotion}
                            onChange={(e) => setEmotion(e.target.value)}
                        >
                            <option value="anxious">😰 Anxious</option>
                            <option value="overwhelmed">😵 Overwhelmed</option>
                            <option value="stressed">😣 Stressed</option>
                            <option value="tired">😴 Tired</option>
                            <option value="unmotivated">😶‍🌫️ Unmotivated</option>
                            <option value="frustrated">😤 Frustrated</option>
                            <option value="neutral">😐 Neutral</option>
                            <option value="lonely">😔 Lonely</option>
                            <option value="sad">😢 Sad</option>
                            <option value="hopeful">🌤️ Hopeful</option>
                            <option value="calm">😌 Calm</option>
                            <option value="happy">😊 Happy</option>
                            <option value="excited">🤩 Excited</option>
                            <option value="energized">⚡ Energized</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium text-lg mb-1 text-center">What helps you feel better?</label>
                        <TagInput tags={favorites} setTags={setFavorites} />
                    </div>

                    <div className="flex justify-center">
                        <button
                            className="bg-[#8FA3BF] hover:bg-[#7c91ad] text-white transition-colors duration-200 px-4 py-2 rounded"
                            onClick={handleGenerate}
                            disabled={loading}
                        >
                            {loading ? "Generating..." : "Generate My Day Plan"}
                        </button>
                    </div>
                </div>

                {/* Timeline Panel */}
                <div className="md:col-span-7">
                    <ScheduleTimeline schedule={schedule} currentSlot={currentSlot}/>
                    {rawText && (
                        <div className="mt-4 p-4 bg-yellow-100 text-sm whitespace-pre-wrap rounded">
                            ⚠️ Failed to parse schedule. Here's the raw Gemini response:
                            <pre>{rawText}</pre>
                        </div>
                    )}
                </div>
                
            </div>
        </div>
    );
}
