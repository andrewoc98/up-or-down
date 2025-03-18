import { useState, useEffect } from "react";

export default function TagInput({ isWheelieTeam, wheelieTeam, onTagsChange }) {
    const [tags, setTags] = useState([]);

    // Sync with "Wheelie Team" checkbox state
    useEffect(() => {
        if (isWheelieTeam) {
            setTags(wheelieTeam);
        } else {
            setTags([]);
        }
    }, [isWheelieTeam, wheelieTeam]);

    useEffect(() => {
        onTagsChange(tags.join(", "));
    }, [tags, onTagsChange]);

    const addTag = (e) => {
        if (e.key === "Enter" && e.target.value.trim()) {
            setTags([...tags, e.target.value.trim()]);
            e.target.value = "";
        }
    };

    const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <div className="tag-input-container">
            <div className="tag-textarea">
                {tags.map((tag, index) => (
                    <div key={index} className="tag">
                        {tag}
                        <button onClick={() => removeTag(index)} className="remove-tag">✖</button>
                    </div>
                ))}
                <input
                    type="text"
                    placeholder="Type and press Enter..."
                    onKeyDown={addTag}
                    className="tag-input"
                />
            </div>
        </div>
    );
}
