import { useEffect } from "react";
import PlusOne from "./PlusOne";

export default function TagInput({
                                     isWheelieTeam,
                                     wheelieTeam,
                                     onTagsChange,
                                     showPlusOne,
                                     finalPerson,
                                     entries,
                                 }) {
    useEffect(() => {
        if (showPlusOne && finalPerson) {
            const updated = entries.map(entry => {
                if (entry.name === finalPerson) {
                    return { ...entry, weight: 0 }; // Reset winner
                } else {
                    return { ...entry, weight: entry.weight + 1 }; // Increment others
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
        newEntries[index][field] = field === "weight" ? parseInt(value) : value;
        onTagsChange(newEntries);
    };

    const removeEntry = (index) => {
        onTagsChange(entries.filter((_, i) => i !== index));
    };

    return (
        <div className="tag-input-container">
            {entries.map((entry, index) => (
                <div key={index} className="tag">
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
                    <button onClick={() => removeEntry(index)} className="remove-tag">✖</button>
                    <PlusOne show={showPlusOne && entry.name !== finalPerson} />
                </div>
            ))}
            <button onClick={addEntry} className="add-entry">Add</button>
        </div>
    );
}
