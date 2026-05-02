"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';

export default function BurnBox() {
  const [text, setText] = useState('');
  const [isBurning, setIsBurning] = useState(false);

  const handleBurn = () => {
    if (!text.trim()) return;
    setIsBurning(true);
    setTimeout(() => {
      setText('');
      setIsBurning(false);
    }, 2500);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative p-1 border border-white/10 rounded-xl bg-black/20 backdrop-blur-sm overflow-hidden min-h-[300px]">
        {/* Text Area Layer */}
        <textarea
          className={`relative z-10 w-full h-full min-h-[300px] bg-transparent p-6 text-lg md:text-xl font-serif text-white placeholder:text-text-muted/30 resize-none focus:outline-none transition-all duration-[2000ms] ${isBurning ? 'opacity-0 blur-sm scale-95' : 'opacity-100 blur-0 scale-100'
            }`}
          placeholder="Type the thought that won't leave. Be specific..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isBurning}
          spellCheck={false}
        />

        {/* Animation Layer - Absolute positioned to cover textarea */}
        <AnimatePresence>
          {isBurning && (
            <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
              {/* Overlay that dims the background */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-violet-900/10 mix-blend-overlay"
              />

              {/* Rising Fire Particles */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bottom-0 w-full h-[150%] bg-gradient-to-t from-orange-500/0 via-violet-500/20 to-transparent"
                  initial={{ y: "100%", opacity: 0, scale: 1 }}
                  animate={{
                    y: "-120%",
                    opacity: [0, 0.8, 0],
                    scale: [1, 1.2, 1.5],
                    x: Math.random() * 40 - 20
                  }}
                  transition={{
                    duration: 1.5 + Math.random(),
                    ease: "easeInOut",
                    delay: Math.random() * 0.5
                  }}
                  style={{
                    left: `${Math.random() * 20 - 10}%`,
                    width: `${80 + Math.random() * 40}%`
                  }}
                />
              ))}

              {/* Central Dissolve Text */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1.2, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
                transition={{ duration: 1.5 }}
                className="absolute z-30 text-violet-200 font-serif italic text-3xl tracking-widest mix-blend-plus-lighter"
              >
                letting go...
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleBurn}
          disabled={!text || isBurning}
          className="group relative inline-flex items-center gap-3 px-8 py-3 bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-violet-500/10 border border-white/10 rounded-full transition-all duration-500 hover:border-violet-500/50"
        >
          <span className="text-sm font-medium text-text-muted group-hover:text-violet-300 transition-colors uppercase tracking-widest">
            {isBurning ? "Releasing..." : "Burn Thought"}
          </span>
          <Flame className={`w-4 h-4 text-text-muted group-hover:text-violet-400 transition-colors ${isBurning ? 'animate-pulse text-violet-400' : ''}`} />
        </button>
      </div>
    </div>
  );
}