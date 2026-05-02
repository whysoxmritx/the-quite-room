"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, Compass, Phone, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
    { path: "/", label: "Breathe", icon: Home },
    { path: "/chat", label: "Drift", icon: MessageCircle },
    { path: "/measure", label: "Measure", icon: Compass },
    { path: "/crisis", label: "Crisis", icon: Phone },
];

export default function GlobalShell({ children }) {
    const pathname = usePathname();

    const isLandingPage = pathname === "/";

    return (
        <div className="min-h-screen bg-void text-text-main flex flex-col relative overflow-hidden">
            {/* Ambient Background - Hidden on Landing Page */}
            {!isLandingPage && (
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-[100px]" />
                    <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/20 via-void to-void" />
                </div>
            )}

            {/* Desktop Top Bar - Hidden on Landing Page */}
            {!isLandingPage && (
                <header className="hidden md:flex items-center justify-between px-8 py-4 border-b border-white/5 bg-void/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple opacity-80" />
                        <span className="font-serif text-xl tracking-wide text-white">The Quiet Room</span>
                    </div>
                    <nav className="flex items-center gap-8">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.path;

                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`relative flex items-center gap-2 text-sm uppercase tracking-widest transition-colors ${isActive ? "text-white" : "text-text-muted hover:text-white"
                                        }`}
                                >
                                    <Icon size={16} />
                                    <span>{item.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="desktopNavHighlight"
                                            className="absolute -bottom-6 left-0 right-0 h-0.5 bg-neon-blue"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </header>
            )}

            {/* Main Content */}
            <main className={`flex-1 relative z-10 ${!isLandingPage ? "pb-24 md:pb-0" : ""} overflow-y-auto`}>
                {children}
            </main>

            {/* Mobile Bottom Bar - Hidden on Landing Page */}
            {!isLandingPage && (
                <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-void/90 backdrop-blur-xl border-t border-white/10 z-50 pb-safe">
                    <div className="flex items-center justify-around px-2 py-3">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.path;

                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className="relative flex flex-col items-center gap-1 p-2 w-16"
                                >
                                    <div className={`relative transition-all duration-300 ${isActive ? "scale-110 -translate-y-1" : "opacity-50"}`}>
                                        <Icon
                                            size={24}
                                            className={isActive ? "text-neon-blue drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]" : "text-white"}
                                        />
                                    </div>
                                    <span className={`text-[10px] font-medium tracking-wide transition-colors ${isActive ? "text-white" : "text-text-muted/50"}`}>
                                        {item.label}
                                    </span>

                                    {isActive && (
                                        <motion.div
                                            layoutId="mobileNavHighlight"
                                            className="absolute -top-3 w-8 h-1 rounded-b-full bg-neon-blue/50 blur-[2px]"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </nav>
            )}
        </div>
    );
}
