import { useEffect, useState } from "react";
import PlusOne from "./PlusOne";

// 🔢 Helper: find next Fibonacci number greater than n
function nextFibonacci(n) {
    if (n < 0) return 1;
    let a = 0, b = 1;
    while (b <= n) {
        [a, b] = [b, a + b];
    }
    return b;
}

export default function TagInput({
                                     isWheelieTeam,
                                     wheelieTeam,
                                     onTagsChange,
                                     showPlusOne,
                                     finalPerson,
                                     entries,
                                 }) {
    const [totalWeight, setTotalWeight] = useState(0);
    const [increaseAmounts, setIncreaseAmounts] = useState({}); // track how much each entry increased

    // 🧮 Update total weight whenever entries change
    useEffect(() => {
        const total = entries.reduce(
            (sum, entry) => sum + (Number(entry.weight) || 0),
            0
        );
        setTotalWeight(total);
    }, [entries]);

    // 🎯 When showPlusOne triggers, update all weights to next Fibonacci
    useEffect(() => {
        if (showPlusOne && finalPerson) {
            const newIncreaseAmounts = {};
            const updated = entries.map((entry) => {
                if (entry.name === finalPerson) {
                    // Reset the final person’s weight
                    newIncreaseAmounts[entry.name] = 0;
                    return { ...entry, weight: 0 };
                } else {
                    // Move to the next Fibonacci number
                    const nextFib = nextFibonacci(entry.weight);
                    const increase = nextFib - entry.weight;
                    newIncreaseAmounts[entry.name] = increase;
                    return { ...entry, weight: nextFib };
                }
            });

            setIncreaseAmounts(newIncreaseAmounts);
            onTagsChange(updated);
        }
    }, [showPlusOne, finalPerson]);

    // ➕ Add a new entry
    const addEntry = () => {
        onTagsChange([...entries, { name: "", weight: 1 }]);
    };

    // ✏️ Update entry values
    const updateEntry = (index, field, value) => {
        const newEntries = [...entries];
        newEntries[index][field] = field === "weight" ? parseInt(value) || 0 : value;
        onTagsChange(newEntries);
    };

    // ❌ Remove entry
    const removeEntry = (index) => {
        onTagsChange(entries.filter((_, i) => i !== index));
    };

    // 🎲 Format percentage with padding
    const formatPercentage = (weight) => {
        if (totalWeight === 0) return "0000";
        return ((weight / totalWeight) * 100).toFixed(2).padStart(5, "0");
    };

    // 🎰 Format Vegas odds
    const formatVegasOdds = (weight) => {
        if (weight === 0) return "+∞".padStart(5, "\u00A0");
        if (totalWeight === 0) return "+100".padStart(5, "\u00A0");

        const p = weight / totalWeight;
        let odds;

        if (p > 0.5) {
            odds = -Math.floor((p / (1 - p) * 100) / 50) * 50;
        } else {
            odds = Math.floor(((1 - p) / p * 100) / 50) * 50;
        }

        const oddsStr = (odds > 0 ? "+" : "") + odds;
        return oddsStr.padStart(5, "\u00A0");
    };

    return (
        <div className="tag-input-container">
            {entries.map((entry, index) => (
                <div key={index} className="tag">
                    {/* Vegas odds display */}
                    <p>{formatVegasOdds(entry.weight)}</p>

                    {/* Name input */}
                    <input
                        type="text"
                        placeholder="Name"
                        value={entry.name}
                        onChange={(e) => updateEntry(index, "name", e.target.value)}
                        className="tag-input"
                    />

                    {/* Weight input */}
                    <input
                        type="number"
                        placeholder="Weight"
                        value={entry.weight}
                        onChange={(e) => updateEntry(index, "weight", e.target.value)}
                        className="weight-input"
                    />

                    {/* Remove button */}
                    <button onClick={() => removeEntry(index)} className="remove-tag">
                        ✖
                    </button>

                    {/* Updated PlusOne animation showing actual increase */}
                    <PlusOne
                        show={showPlusOne && entry.name !== finalPerson}
                        amount={increaseAmounts[entry.name] || 0}
                    />
                </div>
            ))}

            {/* Add new entry button */}
            <button onClick={addEntry} className="add-entry">
                Add
            </button>
        </div>
    );
}
