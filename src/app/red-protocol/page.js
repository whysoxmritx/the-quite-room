import GroundingWidget from "@/components/GroundingWidget";

export default function RedProtocolPage() {
    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <header className="space-y-4 border-b border-white/10 pb-8">
                <div className="flex items-center gap-3 text-red-500/80">
                    <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-widest">Protocol 01 // Red</span>
                </div>
                <h1 className="font-serif text-4xl md:text-5xl text-white">Immediate Panic</h1>
                <p className="text-lg text-text-muted max-w-xl">
                    Use this sequence when you feel overwhelmed, detached, or unable to breathe.
                    Focus on your sensors to return to the physical world.
                </p>
            </header>

            <section className="bg-void border border-white/5 p-6 md:p-12 shadow-2xl shadow-black/50">
                <GroundingWidget />
            </section>

            <footer className="text-sm text-text-muted/40 italic">
                "You are here. You are safe. This feeling is temporary."
            </footer>
        </div>
    );
}
