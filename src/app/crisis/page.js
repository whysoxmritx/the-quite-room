"use client";

import { Phone, ExternalLink, ShieldAlert } from "lucide-react";

const HELPLINES = [
    {
        name: "Kiran Mental Health",
        number: "1800-599-0019",
        desc: "24/7 Government Support"
    },
    {
        name: "Vandrevala Foundation",
        number: "9999-666-555",
        desc: "Crisis Intervention"
    },
    {
        name: "iCall (TISS)",
        number: "91529-87821",
        desc: "Psychosocial Support (Mon-Sat)"
    }
];

export default function CrisisPage() {
    const handleQuickExit = () => {
        window.location.href = "https://www.google.com";
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 space-y-8 animate-in fade-in duration-500 max-w-md mx-auto">
            <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center text-red-500 animate-pulse">
                    <ShieldAlert size={32} />
                </div>
                <h1 className="text-3xl font-serif text-white">Crisis Support</h1>
                <p className="text-text-muted">
                    You are not alone. If you are in immediate danger, please contact local emergency services or a trusted person.
                </p>
            </div>

            <div className="w-full space-y-4">
                {HELPLINES.map((line) => (
                    <a
                        key={line.number}
                        href={`tel:${line.number.replace(/-/g, "")}`}
                        className="flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group"
                    >
                        <div>
                            <h3 className="font-medium text-white group-hover:text-neon-blue transition-colors">{line.name}</h3>
                            <p className="text-xs text-text-muted">{line.desc}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                            <Phone size={18} />
                        </div>
                    </a>
                ))}
            </div>

            <div className="w-full pt-8 border-t border-white/10">
                <button
                    onClick={handleQuickExit}
                    className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest uppercase rounded-xl transition-colors shadow-lg shadow-red-900/50 flex items-center justify-center gap-2"
                >
                    <span>Quick Exit</span>
                    <ExternalLink size={18} />
                </button>
                <p className="text-center text-[10px] text-text-muted/40 mt-4 uppercase tracking-widest">
                    Redirects immediately to Google
                </p>
            </div>
        </div>
    );
}
