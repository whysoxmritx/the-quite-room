"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import useStore from "@/lib/store";

const STEPS = [
    { id: 1, title: "Source", question: "Where is the pressure coming from? (Select all that apply)" },
    { id: 2, title: "Severity", question: "How intense is it right now (1-10)?" },
    { id: 3, title: "Symptoms", question: "What are you feeling predominantly? (Select all that apply)" },
    { id: 4, title: "Context", question: "Anything else you want to note? (Optional)" },
];

export default function StressWizard() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({ source: [], severity: 5, symptom: [], context: "" });
    const [isFinished, setIsFinished] = useState(false);
    const addEntry = useStore((state) => state.addStressEntry);

    const handleNext = () => {
        if (step < 4) {
            setStep(step + 1);
        } else {
            finish();
        }
    };

    const toggleSelection = (field, value) => {
        setData(prev => {
            const current = prev[field] || [];
            if (current.includes(value)) {
                return { ...prev, [field]: current.filter(item => item !== value) };
            } else {
                return { ...prev, [field]: [...current, value] };
            }
        });
    };

    const finish = () => {
        // Calculate Score
        // Base score = severity * 10
        // Modifier: +2 for each additional source/symptom beyond the first one
        let score = data.severity * 10;

        if (data.source.length > 1) score += (data.source.length - 1) * 2;
        if (data.symptom.length > 1) score += (data.symptom.length - 1) * 2;

        // Cap at 100
        score = Math.min(score, 100);

        addEntry({ ...data, score });
        setIsFinished(true);
    };

    if (isFinished) {
        // Recalculate for display to be safe
        let calculatedScore = data.severity * 10;
        if (data.source.length > 1) calculatedScore += (data.source.length - 1) * 2;
        if (data.symptom.length > 1) calculatedScore += (data.symptom.length - 1) * 2;
        calculatedScore = Math.min(calculatedScore, 100);

        const isHighStress = calculatedScore >= 70;

        return (
            <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center border-4 ${isHighStress ? "border-red-500 text-red-500" : "border-neon-blue text-neon-blue"}`}>
                    <span className="text-4xl font-serif font-bold">{calculatedScore}</span>
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-serif text-white">
                        {isHighStress ? "High Stress Detected" : "Stable Baseline"}
                    </h2>
                    <p className="text-text-muted max-w-xs mx-auto">
                        {isHighStress
                            ? "Your signals indicate immediate regulation is needed."
                            : "You are within a manageable range. Keep monitoring."}
                    </p>
                </div>

                <div className="flex flex-col gap-3 max-w-xs mx-auto">
                    {isHighStress ? (
                        <Link
                            href="/"
                            className="w-full py-4 bg-red-500/20 hover:bg-red-500/30 text-red-500 border border-red-500/50 rounded-xl font-medium transition-colors"
                        >
                            Start Panic Breathing
                        </Link>
                    ) : (
                        <Link
                            href="/chat"
                            className="w-full py-4 bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue border border-neon-blue/50 rounded-xl font-medium transition-colors"
                        >
                            Talk to Drift
                        </Link>
                    )}

                    <button
                        onClick={() => window.location.reload()}
                        className="text-sm text-text-muted hover:text-white mt-4"
                    >
                        New Assessment
                    </button>
                </div>
            </div>
        );
    }

    const currentStepData = STEPS[step - 1];

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Progress */}
            <div className="flex justify-between mb-8 px-2">
                {STEPS.map((s) => (
                    <div key={s.id} className={`h-1 flex-1 mx-1 rounded-full transition-colors ${s.id <= step ? "bg-neon-purple" : "bg-white/10"}`} />
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="bg-white/5 border border-white/10 p-8 rounded-2xl min-h-[400px] flex flex-col"
                >
                    <h2 className="text-xl font-serif text-white mb-6 leading-tight">{currentStepData.question}</h2>

                    <div className="flex-1">
                        {/* Step 1: Source (Multi-select) */}
                        {step === 1 && (
                            <div className="grid grid-cols-1 gap-3">
                                {["Work/School", "Relationships", "Health", "Existential", "Unknown"].map((opt) => {
                                    const isSelected = data.source.includes(opt);
                                    return (
                                        <button
                                            key={opt}
                                            onClick={() => toggleSelection('source', opt)}
                                            className={`p-3 rounded-lg text-left transition-colors border flex justify-between items-center ${isSelected
                                                ? "bg-neon-purple/20 border-neon-purple text-white"
                                                : "bg-black/20 border-transparent text-text-muted hover:bg-white/5"
                                                }`}
                                        >
                                            <span>{opt}</span>
                                            {isSelected && <Check size={16} className="text-neon-purple" />}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {/* Step 2: Severity */}
                        {step === 2 && (
                            <div className="space-y-8 py-4">
                                <div className="flex justify-between text-xs text-text-muted uppercase tracking-widest">
                                    <span>Calm</span>
                                    <span>Panic</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={data.severity}
                                    onChange={(e) => setData({ ...data, severity: parseInt(e.target.value) })}
                                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-purple"
                                />
                                <div className="text-center text-4xl font-serif text-neon-purple">
                                    {data.severity}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Symptoms (Multi-select) */}
                        {step === 3 && (
                            <div className="grid grid-cols-1 gap-3">
                                {["Racing Heart", "Brain Fog", "Irritability", "Insomnia", "Numbness"].map((opt) => {
                                    const isSelected = data.symptom.includes(opt);
                                    return (
                                        <button
                                            key={opt}
                                            onClick={() => toggleSelection('symptom', opt)}
                                            className={`p-3 rounded-lg text-left transition-colors border flex justify-between items-center ${isSelected
                                                ? "bg-neon-purple/20 border-neon-purple text-white"
                                                : "bg-black/20 border-transparent text-text-muted hover:bg-white/5"
                                                }`}
                                        >
                                            <span>{opt}</span>
                                            {isSelected && <Check size={16} className="text-neon-purple" />}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {/* Step 4: Context (Text) */}
                        {step === 4 && (
                            <div className="space-y-4">
                                <textarea
                                    value={data.context}
                                    onChange={(e) => setData({ ...data, context: e.target.value })}
                                    placeholder="Is there anything specific triggering this? (Optional)"
                                    className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-neon-purple/50 resize-none font-sans"
                                />
                                <p className="text-xs text-text-muted">
                                    Writing it down helps externalize the stress.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleNext}
                            // Disable next if Step 1 or 3 has no selection
                            disabled={
                                (step === 1 && data.source.length === 0) ||
                                (step === 3 && data.symptom.length === 0)
                            }
                            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-colors ${(step === 1 && data.source.length === 0) || (step === 3 && data.symptom.length === 0)
                                    ? "bg-white/5 text-white/40 cursor-not-allowed"
                                    : "bg-white/10 hover:bg-white/20 text-white"
                                }`}
                        >
                            <span>{step === 4 ? "Complete" : "Next"}</span>
                            {step === 4 ? <Check size={16} /> : <ChevronRight size={16} />}
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
