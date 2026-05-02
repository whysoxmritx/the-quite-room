import { NextResponse } from 'next/server';

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

const RESPONSES = {
    panic: [
        { text: "Okay, I'm right here with you. You are safe.", delay: 500 },
        {
            text: "Let's slow everything down. Can you feel your feet on the ground right now?", delay: 1500, options: [
                { label: "Yes, I feel them", value: "grounded" },
                { label: "No, I'm floating/dizzy", value: "ungrounded" }
            ]
        }
    ],
    grounded: [
        { text: "Good. That's your anchor. Keep your attention there.", delay: 500 },
        { text: "Now, let's try to shift your breathing. Deep breath in for 4 seconds...", delay: 2000, action: { label: "Start Box Breathing", href: "/blue-protocol" } }
    ],
    ungrounded: [
        { text: "That's okay. It's just adrenaline. It can't hurt you.", delay: 500 },
        {
            text: "Look around you. Find 3 things you can see. Name them in your head.", delay: 2000, options: [
                { label: "I did it", value: "grounded" },
                { label: "It's too hard", value: "hard" }
            ]
        }
    ],
    hard: [
        { text: "I know it's hard. You're doing great just by staying here.", delay: 500 },
        { text: "Let's just focus on one thing: Exhale.", delay: 1500, action: { label: "Go to Breathing Tools", href: "/blue-protocol" } }
    ],

    overwhelmed: [
        { text: "I hear you. It feels like too much right now.", delay: 500 },
        {
            text: "When everything is loud, we need to find one quiet corner. What is the single biggest thing on your mind?", delay: 1500, options: [
                { label: "Work/School pressure", value: "pressure" },
                { label: "Relationship issues", value: "relationship" },
                { label: "Everything at once", value: "everything" }
            ]
        }
    ],
    pressure: [
        { text: "That weight is heavy. But urgency is often a trick of anxiety.", delay: 500 },
        {
            text: "Can this specific problem wait for just 10 minutes while you reset?", delay: 1500, options: [
                { label: "Yes, it can wait", value: "wait" },
                { label: "No, it's urgent", value: "urgent" }
            ]
        }
    ],
    relationship: [
        { text: "People are complex. Relationships are hard.", delay: 500 },
        {
            text: "Right now, you can only control your own state. Let's get you back to center.", delay: 1500, options: [
                { label: "Okay, help me breathe", value: "grounded" },
                { label: "I need to vent more", value: "vent" }
            ]
        }
    ],
    everything: [
        { text: "The 'everything' feeling is valid, but it's a lie your brain tells you to keep you alert.", delay: 500 },
        { text: "You don't have to solve everything today. You just have to get through this next minute.", delay: 2000, action: { label: "Take a Minute", href: "/blue-protocol" } }
    ],

    vent: [
        { text: "I'm listening. No judgment here. You can type whatever you need to get out.", input: true, delay: 500 }
    ],

    wait: [
        { text: "Good. Let's use those 10 minutes to reset. Your brain works better when it's calm.", delay: 500, action: { label: "Start Reset", href: "/blue-protocol" } }
    ],
    urgent: [
        { text: "If it's truly urgent, you need a clear head to solve it.", delay: 500 },
        { text: "Do one minute of box breathing. It will sharpen your focus.", delay: 1500, action: { label: "Go to Breathing", href: "/blue-protocol" } }
    ],

    default: [
        { text: "I hear you. Keep going if you need to.", input: true, delay: 500 }
    ],

    restart: [INITIAL_MESSAGE]
};

export async function POST(request) {
    try {
        const body = await request.json();
        const { message, type, value } = body;

        // Simulate network delay for realism if needed, though client handles display delay

        let responseSequence = [];

        if (type === 'option') {
            if (value === 'restart') {
                return NextResponse.json({ sequence: [INITIAL_MESSAGE] });
            }
            responseSequence = RESPONSES[value] || RESPONSES["default"];
        } else if (type === 'text') {
            // Simple keyword matching could go here
            responseSequence = [
                { text: "I'm listening. Sometimes just getting it out helps.", delay: 1000, input: true },
                {
                    text: "Is there anything else on your mind?", delay: 2000, options: [
                        { label: "No, I'm ready to move on", value: "grounded" },
                        { label: "Yes, more to say", value: "vent" }
                    ]
                }
            ];
        } else {
            // Initial load or reset
            return NextResponse.json({ sequence: [INITIAL_MESSAGE] });
        }

        return NextResponse.json({ sequence: responseSequence });

    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { error: "Failed to process message" },
            { status: 500 }
        );
    }
}
