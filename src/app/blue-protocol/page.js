import BreathingPacer from "@/components/BreathingPacer";

export default function BlueProtocolPage() {
    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <header className="space-y-4 border-b border-white/10 pb-8">
                <div className="flex items-center gap-3 text-blue-500/80">
                    <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-widest">Protocol 02 // Blue</span>
                </div>
                <h1 className="font-serif text-4xl md:text-5xl text-white">Physiological Reset</h1>
                <p className="text-lg text-text-muted max-w-xl">
                    Control your breath to control your mind. Choose a pattern below to shift your state.
                </p>
            </header>

            <section className="bg-void border border-white/5 p-6 md:p-12 shadow-2xl shadow-black/50 overflow-hidden">
                <BreathingPacer />
            </section>

            <footer className="text-sm text-text-muted/40 italic">
                "Control your breath, control your mind."
            </footer>
        </div>
    );
}
