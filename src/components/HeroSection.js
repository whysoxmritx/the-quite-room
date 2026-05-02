"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <section className="flex flex-col items-center justify-center text-center py-20 px-6 max-w-4xl mx-auto">
            <motion.div
                className="space-y-6"
            >
                <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-text-muted tracking-wider uppercase">
                    Zero-Knowledge Mental Health
                </span>

                <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
                    Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Quiet Place</span>
                </h1>

                <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
                    A safe, private space to breathe, reflect, and regain control.
                    No accounts. No tracking. just you and your peace of mind.
                </p>
            </motion.div>
        </section>
    );
}
