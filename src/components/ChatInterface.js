"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, ArrowRight, RefreshCw } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_MESSAGE = {
    id: 1,
    sender: "bot",
    text: "I'm Drift. I'm here to help you navigate this moment. What's happening right now?",
    options: [
        { label: "Panic attack coming", value: "panic" },
        { label: "I'm overwhelmed", value: "overwhelmed" },
        { label: "Just need to vent", value: "vent" }
    ]
};

export default function ChatInterface() {
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [isTyping, setIsTyping] = useState(false);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const fetchBotResponse = async (payload) => {
        setIsTyping(true);
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Failed to fetch response');

            const data = await res.json();
            const sequence = data.sequence || [];

            await addBotMessageSequence(sequence);
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, {
                id: Date.now(),
                sender: "bot",
                text: "I'm having trouble connecting right now. Please try again.",
                options: [{ label: "Retry", value: payload.value || "restart" }]
            }]);
            setIsTyping(false);
        }
    };

    const addBotMessageSequence = async (sequence) => {
        for (const msgTemplate of sequence) {
            setIsTyping(true);

            // Wait for the specific delay of this message
            await new Promise(resolve => setTimeout(resolve, msgTemplate.delay || 1000));

            const botMsg = {
                id: Date.now() + Math.random(), // Ensure unique ID
                sender: "bot",
                text: msgTemplate.text,
                options: msgTemplate.options,
                action: msgTemplate.action,
                input: msgTemplate.input
            };

            setMessages(prev => [...prev, botMsg]);

            // Should ensure typing is off before next message starts if needed, 
            // but we keep it true until loop ends for "continuous" feel? 
            // Actually, we need to toggle it off to show the message, then back on if there's another.
            // But since we await delay BEFORE adding, we can just keep it true?
            // No, the UI shows typing indicator separately. 
            // Let's turn it off briefly to "reveal" the message.
            setIsTyping(false);
        }
        setIsTyping(false);
    };

    const handleOptionClick = (option) => {
        // 1. Add user message immediately
        const userMsg = { id: Date.now(), sender: "user", text: option.label };
        setMessages(prev => [...prev, userMsg]);

        // 2. Trigger Bot Response
        if (option.value === 'restart') {
            setMessages([INITIAL_MESSAGE]); // Client-side reset for speed, or API? API is safer for consistency.
            // Let's actually fetch restart from API to keep logic centralized
            fetchBotResponse({ type: 'option', value: 'restart' });
            return;
        }

        fetchBotResponse({ type: 'option', value: option.value });
    };

    const handleTextSubmit = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userMsg = { id: Date.now(), sender: "user", text: inputText };
        setMessages(prev => [...prev, userMsg]);
        setInputText("");

        fetchBotResponse({ type: 'text', message: inputText });
    };

    const lastMessage = messages[messages.length - 1];

    // Only show inputs if the LAST message is from bot and has them
    const showInput = lastMessage.sender === "bot" && lastMessage.input;
    const showOptions = lastMessage.sender === "bot" && lastMessage.options;

    return (
        <div className="flex flex-col h-[80vh] md:h-[600px] w-full max-w-2xl mx-auto bg-black/20 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center text-neon-purple border border-neon-purple/30">
                        <Bot size={18} />
                    </div>
                    <div>
                        <h2 className="font-serif text-white leading-none">Drift</h2>
                        <p className="text-xs text-text-muted mt-1">Always available</p>
                    </div>
                </div>
                <button
                    onClick={() => setMessages([INITIAL_MESSAGE])}
                    className="p-2 text-text-muted hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    title="Restart Chat"
                >
                    <RefreshCw size={16} />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.sender === "user"
                            ? "bg-neon-blue/20 text-neon-blue"
                            : "bg-neon-purple/20 text-neon-purple"
                            }`}>
                            {msg.sender === "user" ? <User size={16} /> : <Bot size={16} />}
                        </div>

                        <div className="space-y-3 max-w-[85%]">
                            <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.sender === "user"
                                ? "bg-neon-blue/10 text-white rounded-tr-none border border-neon-blue/20"
                                : "bg-white/5 text-text-main rounded-tl-none border border-white/10"
                                }`}>
                                {msg.text}
                            </div>

                            {/* Action Button (Link) */}
                            {msg.action && (
                                <Link
                                    href={msg.action.href}
                                    className="inline-flex items-center gap-2 px-4 py-3 bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue rounded-xl text-sm border border-neon-blue/20 transition-all w-full justify-center group"
                                >
                                    <span>{msg.action.label}</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            )}
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-3"
                    >
                        <div className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center text-neon-purple">
                            <Bot size={16} />
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none flex gap-1 items-center h-[52px]">
                            <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" />
                            <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce delay-100" />
                            <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce delay-200" />
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area (Chips or Text) */}
            <div className="p-4 border-t border-white/10 bg-white/5 min-h-[80px] flex items-center">
                <AnimatePresence mode="wait">
                    {showOptions ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="flex flex-wrap gap-2 w-full"
                        >
                            {lastMessage.options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleOptionClick(option)}
                                    className="flex-1 min-w-[120px] px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-xl text-sm text-text-muted hover:text-white transition-all text-center"
                                >
                                    {option.label}
                                </button>
                            ))}
                        </motion.div>
                    ) : showInput ? (
                        <motion.form
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            onSubmit={handleTextSubmit}
                            className="relative w-full"
                        >
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type here..."
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm text-white focus:outline-none focus:border-neon-purple/50 transition-colors"
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={!inputText.trim()}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-neon-purple hover:bg-neon-purple/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={16} />
                            </button>
                        </motion.form>
                    ) : (
                        <div className="w-full text-center text-xs text-text-muted/40 italic">
                            Thinking...
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
