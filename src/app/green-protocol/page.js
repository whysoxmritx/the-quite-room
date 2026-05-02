export default function GreenProtocolPage() {
    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <header className="space-y-4 border-b border-white/10 pb-8">
                <div className="flex items-center gap-3 text-green-500/80">
                    <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-widest">Protocol 04 // Green</span>
                </div>
                <h1 className="font-serif text-4xl md:text-5xl text-white">Understanding</h1>
                <p className="text-lg text-text-muted max-w-xl">
                    Deconstruct the fear response. Knowledge is the antidote to the unknown.
                </p>
            </header>

            <section className="prose prose-invert prose-lg max-w-none text-text-muted font-light leading-relaxed">
                <h3 className="text-white font-serif">Why is this happening?</h3>
                <p>
                    Your body has activated its ancient survival mechanism: the <strong>Fight or Flight</strong> response.
                    It believes you are in immediate physical danger, like facing a predator.
                </p>

                <p>
                    Because there is no physical tiger to fight, your mind creates a "danger" to explain the physical symptoms.
                    This is why you feel a sense of doom or detachment. <strong>It is a false alarm.</strong>
                </p>

                <h3 className="text-white font-serif mt-12">The Symptoms</h3>
                <ul className="list-disc pl-5 space-y-2 marker:text-green-500/50">
                    <li><strong>Racing Heart:</strong> Your body is pumping blood to your muscles to prepare for running.</li>
                    <li><strong>Shortness of Breath:</strong> You are taking in more oxygen to fuel that run.</li>
                    <li><strong>Dizziness/Unreality:</strong> Blood flow is prioritizing survival organs, changing your perception.</li>
                </ul>

                <h3 className="text-white font-serif mt-12">The Resolution</h3>
                <p>
                    Adrenaline metabolizes in about <strong>3 to 5 minutes</strong> once you stop adding to it with fear.
                    By using the Red (Grounding) and Blue (Breathing) protocols, you signal to your amygdala that you are safe.
                    The alarm will turn off. It always does.
                </p>
            </section>
        </div>
    );
}
