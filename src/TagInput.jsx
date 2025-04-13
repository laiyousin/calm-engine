import { useState } from "react";

export default function TagInput({ tags, setTags }) {
    const [input, setInput] = useState("");

    const handleKeyDown = (e) => {
        if ((e.key === "Enter" || e.key === ",") && input.trim()) {
            e.preventDefault();
            const newTag = input.trim();
            if (!tags.includes(newTag)) {
                setTags([...tags, newTag]);
            }
            setInput("");
        }
    };

    const removeTag = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

    return (
        <div className="bg-gray-800 border border-gray-600 text-white rounded p-2 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
                <div
                    key={index}
                    className="bg-[#8FA3BF] px-2 py-1 rounded-md text-white"
                >
                    {tag}
                    <button
                        onClick={() => removeTag(index)}
                        className="ml-1 text-white hover:text-gray-200 text-xs"
                    >
                        ×
                    </button>
                </div>
            ))}
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent outline-none text-white text-sm flex-1 min-w-[100px]"
                placeholder="Type & press enter..."
            />
        </div>
    );
}
