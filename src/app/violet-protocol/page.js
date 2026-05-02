import BurnBox from "@/components/BurnBox";

export default function VioletProtocolPage() {
    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <header className="space-y-4 border-b border-white/10 pb-8">
                <div className="flex items-center gap-3 text-violet-500/80">
                    <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-widest">Protocol 03 // Violet</span>
                </div>
                <h1 className="font-serif text-4xl md:text-5xl text-white">Intrusive Thoughts</h1>
                <p className="text-lg text-text-muted max-w-xl">
                    Externalize the loop. Write the thought down to separate it from your identity, then watch it dissolve.
                </p>
            </header>

            <section className="py-8 md:py-16">
                <BurnBox />
            </section>

            <footer className="text-sm text-text-muted/40 italic text-center">
                "You are not your thoughts. You are the observer of your thoughts."
            </footer>
        </div>
    );
}
