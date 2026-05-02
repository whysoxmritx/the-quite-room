import ChatInterface from "@/components/ChatInterface";

export default function ChatPage() {
    return (
        <div className="h-full flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in duration-500">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-serif text-white mb-2">The Drift</h1>
                <p className="text-text-muted text-sm max-w-sm mx-auto">
                    A rule-based companion to help you navigate the storm. Privacy-first, no storage.
                </p>
            </div>

            <ChatInterface />
        </div>
    );
}
