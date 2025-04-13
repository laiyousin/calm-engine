import { useRef } from "react";

export default function TodoInputList({ todos, setTodos }) {
    const inputRefs = useRef([]);

    const handleTextChange = (value, index) => {
        const updated = [...todos];
        updated[index] = {
            ...updated[index], 
            text: value
        };
        setTodos(updated);
    };

    const handlePercentChange = (value, index) => {
        const updated = [...todos];
        updated[index] = {
            ...updated[index],
            percent: parseInt(value)
        };
        setTodos(updated);
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const current = todos[index];
            const hasContent = current && current.text.trim() !== "";
            if (hasContent) {
                const newTodos = [...todos];
                const last = newTodos[newTodos.length - 1];
                if (!last || last.text.trim() !== "") {
                    newTodos.push({ text: "", percent: 0 });
                    setTodos(newTodos);
                    setTimeout(() => {
                        inputRefs.current[index + 1]?.focus();
                    }, 0);
                }
            }
        }
    };

    const removeTodo = (index) => {
        if (todos.length === 1) {
            alert("You must have at least one task."); 
            return;
        }
        const updated = [...todos];
        updated.splice(index, 1);
        setTodos(updated);
    };

    return (
        <div className="space-y-6">
            <label className="block font-medium text-lg mb-1 text-center">What do you need to do today?</label>
            {todos.map((item, index) => (
                <div
                    key={index}
                    className="animate-fade-in bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-4"
                >
                    <div className="flex items-center gap-2">
                        <input
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            className="w-full bg-gray-800 border border-gray-600 text-white rounded p-2"
                            placeholder={`Task ${index + 1}`}
                            value={item.text}
                            onChange={(e) => handleTextChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                        <button
                            className="text-red-500 font-bold disabled:opacity-30"
                            disabled={todos.length === 1}
                            onClick={() => removeTodo(index)}
                        >
                            ×
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <input
                            type="range"
                            min="5"
                            max="100"
                            value={item.percent}
                            onChange={(e) => handlePercentChange(e.target.value, index)}
                            className="w-full"
                        />
                        <span className="w-12 text-right text-sm text-white">{item.percent}%</span>
                    </div>
                </div>
            ))}
        </div>
    );
}