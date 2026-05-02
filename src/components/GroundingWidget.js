"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Eye, Hand, Ear, Sparkles, Utensils } from "lucide-react";

const steps = [
    {
        id: 1,
        target: 5,
        title: "Sight",
        instruction: "Acknowledge 5 things you see around you.",
        icon: Eye,
        color: "text-blue-400"
    },
    {
        id: 2,
        target: 4,
        title: "Touch",
        instruction: "Acknowledge 4 things you can touch effectively.",
        icon: Hand,
        color: "text-emerald-400"
    },
    {
        id: 3,
        target: 3,
        title: "Sound",
        instruction: "Acknowledge 3 things you can hear.",
        icon: Ear,
        color: "text-amber-400"
    },
    {
        id: 4,
        target: 2,
        title: "Smell",
        instruction: "Acknowledge 2 things you can smell.",
        icon: Sparkles,
        color: "text-purple-400"
    },
    {
        id: 5,
        target: 1,
        title: "Taste",
        instruction: "Acknowledge 1 thing you can taste.",
        icon: Utensils,
        color: "text-rose-400"
    }
];

export default function GroundingWidget() {
    const [currentStep, setCurrentStep] = useState(0);
    const [count, setCount] = useState(0);

    const step = steps[currentStep];
    const isFinished = currentStep >= steps.length;
    const progress = ((currentStep) / steps.length) * 100;

    const handleNextItem = () => {
        if (count + 1 >= step.target) {
            // Step complete
            if (currentStep < steps.length - 1) {
                setCount(0);
                setCurrentStep(currentStep + 1);
            } else {
                setCurrentStep(currentStep + 1); // Finish
            }
        } else {
            setCount(count + 1);
        }
    };

    const reset = () => {
        setCurrentStep(0);
        setCount(0);
    };

    if (isFinished) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 border border-white/10 bg-white/5 rounded-3xl text-center space-y-8 backdrop-blur-sm shadow-2xl shadow-black/50"
            >
                <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full animate-pulse blur-xl" />
                    <div className="relative w-full h-full bg-gradient-to-br from-green-500/20 to-transparent rounded-full flex items-center justify-center border border-green-500/30 text-green-400">
                        <Check size={40} />
                    </div>
                </div>

                <div>
                    <h3 className="font-serif text-3xl text-white mb-2">Sequence Complete</h3>
                    <p className="text-text-muted text-lg">You have grounded yourself in the present moment.</p>
                </div>

                <div className="pt-4">
                    <button
                        onClick={() => {
                            setCurrentStep(0);
                            setCount(0);
                        }}
                        className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm uppercase tracking-widest text-text-muted hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    >
                        Restart Sequence
                    </button>
                </div>
            </motion.div>
        );
    }

    const Icon = step.icon;
    const itemsRemaining = step.target - count;

    return (
        <div className="w-full">
            {/* Progress Bar */}
            <div className="h-1 w-full bg-white/5 mb-8 overflow-hidden">
                <motion.div
                    className="h-full bg-white/20"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                >
                    <div className="flex items-center gap-4 text-text-muted/50 uppercase tracking-widest text-xs font-mono">
                        <span>0{step.id}</span>
                        <span className="flex-1 h-px bg-white/10" />
                        <span>05</span>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <Icon className={`w-6 h-6 ${step.color}`} />
                            <h2 className="font-serif text-3xl text-white">{step.title}</h2>
                        </div>
                        <p className="text-lg text-text-muted font-light leading-relaxed">
                            {step.instruction}
                        </p>
                    </div>

                    <div className="pt-8 flex justify-center">
                        <button
                            onClick={handleNextItem}
                            className="group relative w-full p-6 border border-white/10 bg-black/20 hover:bg-white/5 transition-all duration-300"
                        >
                            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/50 transition-all" />
                            <span className="block text-center text-4xl font-serif text-white mb-2">
                                {itemsRemaining}
                            </span>
                            <span className="block text-center text-xs uppercase tracking-widest text-text-muted group-hover:text-white transition-colors">
                                Remaining
                            </span>
                            <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 text-white/10 group-hover:text-white/50 transition-colors" />
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
