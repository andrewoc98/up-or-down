import { useState, useEffect } from "react";

export default function TagInput({ isWheelieTeam, wheelieTeam, onTagsChange }) {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        if (isWheelieTeam) {
            setEntries(wheelieTeam.map(name => ({ name, weight: 1 })));
        } else {
            setEntries([]);
        }
    }, [isWheelieTeam, wheelieTeam]);

    useEffect(() => {
        onTagsChange(entries);
    }, [entries, onTagsChange]);

    const addEntry = () => {
        setEntries([...entries, { name: "", weight: 1 }]);
    };

    const updateEntry = (index, field, value) => {
        const newEntries = [...entries];
        newEntries[index][field] = field === "weight" ? parseInt(value) || 1 : value;
        setEntries(newEntries);
    };

    const removeEntry = (index) => {
        setEntries(entries.filter((_, i) => i !== index));
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
                        min="1"
                    />
                    <button onClick={() => removeEntry(index)} className="remove-tag">✖</button>
                </div>
            ))}
            <button onClick={addEntry} className="add-entry">Add</button>
        </div>
    );
}
