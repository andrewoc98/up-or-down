import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

export default function PlusOne({ show }) {
    return (
        <div className="plus-one-wrapper">
            <AnimatePresence>
                {show && (
                    <motion.div
                        key="plus1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className="plus-one-text"
                    >
                        +1
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}