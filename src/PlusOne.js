import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

export default function PlusOne({ show, amount = 1 }) {
    if (!amount || amount <= 0) return null;

    // Optional: scale the animation a bit based on amount size
    const scale = Math.min(1 + amount / 10, 2); // caps at 2x

    return (
        <div className="plus-one-wrapper">
            <AnimatePresence>
                {show && (
                    <motion.div
                        key={`plus-${amount}-${Date.now()}`} // ensures rerender per animation
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale }}
                        exit={{ opacity: 0, y: -10, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                        className="plus-one-text"
                    >
                        +{amount}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
