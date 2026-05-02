"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Wind, Activity, Flame, Leaf, Menu, X } from "lucide-react";

const chapters = [
    {
        id: "red",
        title: "I. The Red Protocol",
        subtitle: "Immediate Panic",
        path: "/red-protocol",
        icon: Activity,
        color: "text-red-500",
        gradient: "from-red-900/20 to-transparent"
    },
    {
        id: "blue",
        title: "II. The Blue Protocol",
        subtitle: "High Anxiety",
        path: "/blue-protocol",
        icon: Wind,
        color: "text-blue-500",
        gradient: "from-blue-900/20 to-transparent"
    },
    {
        id: "violet",
        title: "III. The Violet Protocol",
        subtitle: "Intrusive Thoughts",
        path: "/violet-protocol",
        icon: Flame, // Visual metaphor for "burning" thoughts
        color: "text-violet-500",
        gradient: "from-violet-900/20 to-transparent"
    },
    {
        id: "green",
        title: "IV. The Green Protocol",
        subtitle: "Understanding",
        path: "/green-protocol",
        icon: Leaf,
        color: "text-green-500",
        gradient: "from-green-900/20 to-transparent"
    }
];

export default function ReaderShell({ children }) {
    const pathname = usePathname();
    const isCover = pathname === "/";
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    if (isCover) {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen relative overflow-hidden">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-80 h-screen fixed left-0 top-0 border-r border-white/10 bg-void/80 backdrop-blur-xl z-50">
                <div className="p-8 border-b border-white/5">
                    <Link href="/" className="group">
                        <h1 className="font-serif text-2xl text-white tracking-wide group-hover:text-text-muted transition-colors">
                            The Quiet Room
                        </h1>
                        <p className="text-xs text-text-muted mt-1 tracking-widest uppercase opacity-60">
                            Field Guide v2.0
                        </p>
                    </Link>
                </div>

                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                    {chapters.map((chapter) => {
                        const isActive = pathname === chapter.path;
                        const Icon = chapter.icon;

                        return (
                            <Link
                                key={chapter.id}
                                href={chapter.path}
                                className={`relative group flex items-start gap-4 p-4 rounded-lg transition-all duration-300 ${isActive ? "bg-white/5 border border-white/5" : "hover:bg-white/5 hover:border-white/5 border border-transparent"
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className={`absolute inset-0 rounded-lg bg-gradient-to-r ${chapter.gradient} opacity-20`}
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}

                                <div className={`mt-1 p-2 rounded-md bg-black/40 ${isActive ? chapter.color : "text-text-muted group-hover:text-white"}`}>
                                    <Icon size={20} />
                                </div>

                                <div>
                                    <h3 className={`font-serif text-lg leading-tight ${isActive ? "text-white" : "text-text-muted group-hover:text-white"}`}>
                                        {chapter.title}
                                    </h3>
                                    <p className="text-xs text-text-muted/60 mt-1 uppercase tracking-wider">
                                        {chapter.subtitle}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-white/5 text-xs text-text-muted/40 text-center font-mono">
                    NO DATA COLLECTED
                    <br />
                    OFFLINE READY
                </div>
            </aside>

            {/* Mobile Header / Nav Trigger */}
            <div className="md:hidden fixed top-0 w-full z-50 bg-void/80 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center">
                <span className="font-serif text-lg text-white">The Quiet Room</span>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-text-main hover:text-white transition-colors"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden fixed inset-0 z-40 bg-void pt-20 px-4 pb-8 overflow-y-auto"
                    >
                        <nav className="space-y-4">
                            {chapters.map((chapter) => (
                                <Link
                                    key={chapter.id}
                                    href={chapter.path}
                                    className="block p-4 rounded-lg border border-white/10 bg-white/5 active:bg-white/10"
                                >
                                    <div className="flex items-center gap-4">
                                        <chapter.icon className={chapter.color} size={24} />
                                        <div>
                                            <h3 className="font-serif text-xl text-white">{chapter.title}</h3>
                                            <p className="text-sm text-text-muted">{chapter.subtitle}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-80 min-h-screen relative z-0">
                <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
                    {children}
                </div>
            </main>
        </div>
    );
}
