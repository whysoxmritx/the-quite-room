"use client";

import HeroSection from "@/components/HeroSection";
import FeatureGateway from "@/components/FeatureGateway";

export default function Home() {
  return (
    <div className="min-h-screen bg-void text-text-main overflow-hidden selection:bg-neon-blue/20">
      <HeroSection />
      <FeatureGateway />
      <footer className="py-8 text-center text-text-muted text-sm pb-20">
        <p>© {new Date().getFullYear()} The Quiet Room.</p>
        <p className="mt-2 text-xs opacity-50">Private. Secure. Yours.</p>
      </footer>
    </div>
  );
}