import { useEffect, useState } from "react";
import PlusOne from "./PlusOne";

export default function TagInput({
                                     isWheelieTeam,
                                     wheelieTeam,
                                     onTagsChange,
                                     showPlusOne,
                                     finalPerson,
                                     entries,
                                 }) {
    const [totalWeight, setTotalWeight] = useState(0);

    // Update totalWeight whenever entries change
    useEffect(() => {
        const total = entries.reduce(
            (sum, entry) => sum + (Number(entry.weight) || 0),
            0
        );
        setTotalWeight(total);
    }, [entries]);

    // Handle PlusOne logic
    useEffect(() => {
        if (showPlusOne && finalPerson) {
            const updated = entries.map((entry) => {
                if (entry.name === finalPerson) {
                    return { ...entry, weight: 0 };
                } else {
                    return { ...entry, weight: entry.weight + 1 };
                }
            });
            onTagsChange(updated);
        }
    }, [showPlusOne, finalPerson]);

    const addEntry = () => {
        onTagsChange([...entries, { name: "", weight: 1 }]);
    };

    const updateEntry = (index, field, value) => {
        const newEntries = [...entries];
        newEntries[index][field] = field === "weight" ? parseInt(value) || 0 : value;
        onTagsChange(newEntries);
    };

    const removeEntry = (index) => {
        onTagsChange(entries.filter((_, i) => i !== index));
    };

    // Helper to format percentage with 2 decimals and 4 total digits
    const formatPercentage = (weight) => {
        if (totalWeight === 0) return "0000";
        return ((weight / totalWeight) * 100).toFixed(2).padStart(5, "0");
    };

    // Helper to format Vegas odds and pad to 5 characters
    const formatVegasOdds = (weight) => {
        if (weight === 0) return "+∞".padStart(5, "\u00A0"); // pad infinity
        if (totalWeight === 0) return "+100".padStart(5, "\u00A0"); // default

        const p = weight / totalWeight;
        let odds;

        if (p > 0.5) {
            odds = -Math.floor((p / (1 - p) * 100) / 50) * 50; // favorite → negative odds
        } else {
            odds = Math.floor(((1 - p) / p * 100) / 50) * 50; // underdog → positive odds
        }

        const oddsStr = (odds > 0 ? "+" : "") + odds;
        return oddsStr.padStart(5, "\u00A0"); // pad to 5 characters
    };


    return (
        <div className="tag-input-container">
            {entries.map((entry, index) => (
                <div key={index} className="tag">
                    <p>{formatVegasOdds(entry.weight)} </p>
                    <input
                        type="text"
                        placeholder="Name"
                        value={entry.name}
                        onChange={(e) => updateEntry(index, "name", e.target.value)}
                        className="tag-input"
                    />
                    <input
                        type="number"
                        placeholder="Weight"
                        value={entry.weight}
                        onChange={(e) => updateEntry(index, "weight", e.target.value)}
                        className="weight-input"
                    />
                    <button onClick={() => removeEntry(index)} className="remove-tag">
                        ✖
                    </button>
                    <PlusOne show={showPlusOne && entry.name !== finalPerson} />
                </div>
            ))}
            <button onClick={addEntry} className="add-entry">
                Add
            </button>
        </div>
    );
}
