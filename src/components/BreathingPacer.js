"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, Square } from "lucide-react";

const PATTERNS = {
    "4-7-8": {
        id: "4-7-8",
        label: "Relax (4-7-8)",
        color: "text-blue-400",
        bg: "bg-blue-400",
        instruction: "Calm your nervous system.",
        intervals: [
            { phase: "inhale", text: "Inhale", duration: 4 },
            { phase: "hold", text: "Hold", duration: 7 },
            { phase: "exhale", text: "Exhale", duration: 8 }
        ]
    },
    "box": {
        id: "box",
        label: "Focus (Box)",
        color: "text-emerald-400",
        bg: "bg-emerald-400",
        instruction: "Sharpen your concentration.",
        intervals: [
            { phase: "inhale", text: "Inhale", duration: 4 },
            { phase: "hold", text: "Hold", duration: 4 },
            { phase: "exhale", text: "Exhale", duration: 4 },
            { phase: "hold", text: "Hold", duration: 4 }
        ]
    }
};

export default function BreathingPacer() {
    const [activePattern, setActivePattern] = useState("4-7-8");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(4);

    // Refs for animation loop
    const requestRef = useRef();
    const startTimeRef = useRef();

    const pattern = PATTERNS[activePattern];
    const currentInterval = pattern.intervals[currentIndex];

    // Animation Variants
    const getCircleVariants = () => {
        const duration = currentInterval.duration;

        // Base transitions
        const transitions = { duration: duration, ease: "easeInOut" };

        // Overrides for Hold (linear is better)
        if (currentInterval.phase === "hold") {
            transitions.ease = "linear";
        }

        return {
            inhale: { scale: 1.5, opacity: 1, transition: transitions },
            hold: { scale: 1.5, opacity: 0.8, transition: transitions },
            exhale: { scale: 0.75, opacity: 0.6, transition: transitions }
        };
    };

    // The Animation Loop
    const animate = (time) => {
        if (!startTimeRef.current) startTimeRef.current = time;
        const elapsed = (time - startTimeRef.current) / 1000;

        const remaining = Math.max(0, currentInterval.duration - elapsed);
        setTimeLeft(remaining);

        if (remaining <= 0) {
            // Next Step
            setCurrentIndex((prev) => (prev + 1) % pattern.intervals.length);
            startTimeRef.current = time;
        }

        requestRef.current = requestAnimationFrame(animate);
    };

    // Start/Stop Loop on Mount/Unmount/Pattern Change
    useEffect(() => {
        // Reset state on pattern change
        setCurrentIndex(0);
        setTimeLeft(pattern.intervals[0].duration);
        startTimeRef.current = null;

        requestRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(requestRef.current);
    }, [activePattern]);

    // Handle index updates in the loop ref context
    // Actually, the loop function closes over state, so we need a ref-based approach or dependency effect
    // To keep it simple and robust, let's use a simpler useEffect-based timer for the *logic* 
    // and let Framer Motion handle the smooth visuals independently.
    // Re-writing loop to be purely effect-based for simplicity and safety.

    return (
        <BreathingLogic
            activePattern={activePattern}
            setActivePattern={setActivePattern}
            pattern={pattern}
        />
    );
}

// Separated Logic Component to handle the timer cleaner
function BreathingLogic({ activePattern, setActivePattern, pattern }) {
    const [index, setIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(pattern.intervals[0].duration);

    useEffect(() => {
        setIndex(0);
        setTimeLeft(pattern.intervals[0].duration);
    }, [activePattern]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setIndex((prevIndex) => (prevIndex + 1) % pattern.intervals.length);
                    // Return the duration of the NEXT interval roughly
                    // Actually this lag is tricky. 
                    // Let's rely on the `index` change to reset the timer from the `pattern` data?
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [activePattern, pattern]);

    // When index changes, reset time
    useEffect(() => {
        setTimeLeft(pattern.intervals[index].duration);
    }, [index, pattern]);

    const currentInterval = pattern.intervals[index];

    // Variants
    const variants = {
        inhale: {
            scale: 1.5,
            opacity: 1,
            transition: { duration: 4, ease: "easeInOut" }
        },
        hold: {
            scale: 1.5, // Keep expanded
            opacity: 0.9,
            transition: { duration: currentInterval.duration, ease: "linear" }
        },
        exhale: {
            scale: 0.75,
            opacity: 0.6,
            transition: { duration: currentInterval.duration, ease: "easeInOut" }
        }
    };

    // Adjust hold scale for box breathing (keep previous scale)
    // Actually, simply:
    // Inhale -> Scale UP
    // Hold -> Stay UP
    // Exhale -> Scale DOWN
    // Hold -> Stay DOWN

    // We can compute target scale dynamically
    const getScale = () => {
        if (currentInterval.phase === 'inhale') return 1.5;
        if (currentInterval.phase === 'exhale') return 0.75;
        // If hold, check previous? 
        // 4-7-8: Inhale(Up) -> Hold(Up) -> Exhale(Down)
        // Box: Inhale(Up) -> Hold(Up) -> Exhale(Down) -> Hold(Down)

        if (activePattern === '4-7-8') return 1.5; // Hold is always after inhale

        if (activePattern === 'box') {
            // Index 0 in Box = Inhale (Up)
            // Index 1 = Hold (Up)
            // Index 2 = Exhale (Down)
            // Index 3 = Hold (Down)
            if (index === 1) return 1.5;
            if (index === 3) return 0.75;
        }
        return 1;
    };


    return (
        <div className="flex flex-col items-center justify-center py-12 w-full max-w-md mx-auto">
            {/* Pattern Selector */}
            <div className="flex gap-2 mb-16 p-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
                {Object.values(PATTERNS).map((p) => (
                    <button
                        key={p.id}
                        onClick={() => setActivePattern(p.id)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activePattern === p.id
                                ? `${p.bg} text-black shadow-[0_0_20px_rgba(0,0,0,0.3)]`
                                : "text-text-muted hover:text-white hover:bg-white/5"
                            }`}
                    >
                        {p.label}
                    </button>
                ))}
            </div>

            <div className="relative w-80 h-80 flex items-center justify-center mb-12">
                {/* Ambient Glow */}
                <div className={`absolute inset-0 rounded-full blur-3xl animate-pulse transition-colors duration-1000 opacity-20 pointer-events-none ${activePattern === '4-7-8' ? 'bg-blue-500' : 'bg-emerald-500'
                    }`} />

                {/* Breathing Circle */}
                <motion.div
                    className={`w-40 h-40 rounded-full shadow-[0_0_60px_currentColor] border border-white/30 backdrop-blur-md transition-colors duration-1000 ${pattern.color}`}
                    animate={{
                        scale: getScale(),
                        opacity: currentInterval.phase === 'hold' ? 0.8 : 1
                    }}
                    transition={{
                        duration: currentInterval.duration,
                        ease: "easeInOut"
                    }}
                >
                    {/* Inner Pulse for Hold */}
                    {currentInterval.phase === "hold" && (
                        <motion.div
                            className="w-full h-full rounded-full bg-white/20"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        />
                    )}
                </motion.div>

                {/* Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={currentInterval.text}
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.9 }}
                            className="font-serif text-4xl text-white tracking-widest drop-shadow-2xl"
                        >
                            {currentInterval.text}
                        </motion.span>
                    </AnimatePresence>
                    <span className="text-sm font-mono text-white/50 mt-3 tabular-nums tracking-widest">
                        00:0{timeLeft}
                    </span>
                </div>
            </div>

            <div className="text-center space-y-2 h-12">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={activePattern}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-white/60 font-light"
                    >
                        {pattern.instruction}
                    </motion.p>
                </AnimatePresence>
            </div>
        </div>
    );
}
