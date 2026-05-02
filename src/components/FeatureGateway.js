"use client";

import { motion } from "framer-motion";
import { Wind, Shield, Activity, Phone } from "lucide-react";
import Link from "next/link";

const features = [
    {
        icon: Wind,
        title: "Breathe",
        description: "Immediate grounding with guided breathing exercises.",
        href: "/blue-protocol", // Or keep on page with a modal, but linking to protocol seems cleaner for now
        color: "text-neon-blue",
        bgHover: "hover:bg-neon-blue/5",
        borderHover: "hover:border-neon-blue/30"
    },
    {
        icon: Shield,
        title: "Sanctuary",
        description: "Write and release in the Burn Box. 100% private.",
        href: "/sanctuary",
        color: "text-neon-purple",
        bgHover: "hover:bg-neon-purple/5",
        borderHover: "hover:border-neon-purple/30"
    },
    {
        icon: Activity,
        title: "Check-in",
        description: "Assess your stress levels with a clinical tool.",
        href: "/assessment",
        color: "text-emerald-400",
        bgHover: "hover:bg-emerald-400/5",
        borderHover: "hover:border-emerald-400/30"
    },
    {
        icon: Phone,
        title: "Crisis Support",
        description: "Immediate resources if you're in distress.",
        href: "/crisis",
        color: "text-rose-400",
        bgHover: "hover:bg-rose-400/5",
        borderHover: "hover:border-rose-400/30"
    }
];

export default function FeatureGateway() {
    return (
        <section className="px-6 pb-20 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.title}
                    >
                        <Link
                            href={feature.href}
                            className={`block h-full p-6 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 group ${feature.bgHover} ${feature.borderHover}`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-xl bg-white/5 ${feature.color}`}>
                                    <feature.icon size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-medium text-white mb-2 group-hover:translate-x-1 transition-transform">
                                        {feature.title}
                                    </h3>
                                    <p className="text-text-muted text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
