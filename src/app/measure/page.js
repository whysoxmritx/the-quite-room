import StressWizard from "@/components/StressWizard";

export default function MeasurePage() {
    return (
        <div className="h-full flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in duration-500">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-serif text-white mb-2">Stress Compass</h1>
                <p className="text-text-muted text-sm max-w-sm mx-auto">
                    Calibrate your state. 3 simple questions to orient yourself.
                </p>
            </div>

            <StressWizard />
        </div>
    );
}
