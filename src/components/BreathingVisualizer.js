"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BreathingVisualizer({ mode }) {
    const [instruction, setInstruction] = useState("");

    // Cycle logic for text updates
    useEffect(() => {
        let interval;
        if (mode === "box") {
            // 4-4-4-4 (16s cycle)
            const runBox = () => {
                setInstruction("Inhale (4s)");
                setTimeout(() => {
                    setInstruction("Hold (4s)");
                    setTimeout(() => {
                        setInstruction("Exhale (4s)");
                        setTimeout(() => {
                            setInstruction("Hold (4s)");
                        }, 4000);
                    }, 4000);
                }, 4000);
            };
            runBox();
            interval = setInterval(runBox, 16000);
        } else {
            // 4-7-8 (19s cycle)
            const runRelax = () => {
                setInstruction("Inhale (4s)");
                setTimeout(() => {
                    setInstruction("Hold (7s)");
                    setTimeout(() => {
                        setInstruction("Exhale (8s)");
                    }, 7000);
                }, 4000);
            };
            runRelax();
            interval = setInterval(runRelax, 19000);
        }
        return () => clearInterval(interval);
    }, [mode]);

    return (
        <div className="relative flex items-center justify-center w-80 h-80">
            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <motion.span
                    key={instruction}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-2xl font-serif text-white tracking-widest drop-shadow-lg"
                >
                    {instruction}
                </motion.span>
            </div>

            {mode === "box" ? (
                <svg w="320" h="320" viewBox="0 0 100 100" className="w-full h-full">
                    {/* Track */}
                    <rect x="10" y="10" width="80" height="80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" rx="4" />
                    {/* Moving Indicator */}
                    <motion.rect
                        x="10"
                        y="10"
                        width="80"
                        height="80"
                        fill="none"
                        stroke="#00f0ff"
                        strokeWidth="4"
                        rx="4"
                        strokeDasharray="0 320" // Path length approx 320
                        animate={{
                            strokeDasharray: ["0 320", "80 240", "160 160", "240 80", "320 0"],
                            strokeDashoffset: [0, -80, -160, -240, -320]
                            // Simplification: We need a dot moving, not drawing the line. Let's switch to a moving dot.
                        }}
                    />
                    <motion.circle
                        r="3"
                        fill="#00f0ff"
                        animate={{
                            // Approximate coordinates for the box corners
                            cx: [10, 90, 90, 10, 10],
                            cy: [10, 10, 90, 90, 10],
                        }}
                        transition={{
                            duration: 16,
                            times: [0, 0.25, 0.5, 0.75, 1], // 4s segments
                            ease: "linear",
                            repeat: Infinity
                        }}
                    />
                </svg>
            ) : (
                // 4-7-8 Circle
                <div className="relative flex items-center justify-center">
                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-neon-purple/20 rounded-full blur-3xl animate-pulse" />
                    <motion.div
                        className="w-32 h-32 rounded-full border border-neon-purple/50 bg-neon-purple/10"
                        animate={{
                            scale: [1, 1.5, 1.5, 1], // Inhale, Hold, Exhale (back to start)
                            opacity: [0.5, 1, 0.8, 0.5]
                        }}
                        transition={{
                            duration: 19,
                            times: [0, 0.21, 0.58, 1], // 4/19 ≈ 0.21, (4+7)/19 ≈ 0.58
                            ease: "easeInOut",
                            repeat: Infinity
                        }}
                    />
                </div>
            )}
        </div>
    );
}
