"use client";

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FocusTimer() {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [duration, setDuration] = useState(25); // minutes

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(duration * 60);
    };

    const setTime = (mins) => {
        setDuration(mins);
        setTimeLeft(mins * 60);
        setIsActive(false);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = 100 - (timeLeft / (duration * 60)) * 100;

    return (
        <div className="glass-panel p-6 rounded-xl flex flex-col items-center justify-center h-[300px]">
            <h3 className="text-sm font-medium text-text-muted uppercase tracking-widest mb-6">Focus Timer</h3>

            <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="80" cy="80" r="70" className="stroke-white/10 fill-none" strokeWidth="4" />
                    <motion.circle
                        cx="80" cy="80" r="70"
                        className="stroke-neon-purple fill-none"
                        strokeWidth="4"
                        strokeDasharray="440"
                        strokeDashoffset={440 - (440 * progress) / 100}
                        initial={{ strokeDashoffset: 440 }}
                        animate={{ strokeDashoffset: 440 - (440 * progress) / 100 }}
                    />
                </svg>
                <div className="absolute text-4xl font-light text-white font-mono">
                    {formatTime(timeLeft)}
                </div>
            </div>

            <div className="flex gap-4 mb-4">
                {[5, 15, 25].map(min => (
                    <button
                        key={min}
                        onClick={() => setTime(min)}
                        className={`text-xs px-2 py-1 rounded border border-white/10 hover:bg-white/10 transition-colors ${duration === min ? 'text-neon-purple border-neon-purple/50' : 'text-text-muted'}`}
                    >
                        {min}m
                    </button>
                ))}
            </div>

            <div className="flex gap-4">
                <button
                    onClick={toggleTimer}
                    className="p-3 bg-neon-purple/10 text-neon-purple rounded-full hover:bg-neon-purple/20 transition-colors"
                >
                    {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </button>
                <button
                    onClick={resetTimer}
                    className="p-3 bg-white/5 text-text-muted rounded-full hover:bg-white/10 transition-colors"
                >
                    <RotateCcw className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
