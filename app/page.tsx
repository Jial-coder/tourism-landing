import { TopNav } from "@/components/chrome/TopNav";
import { Hero } from "@/components/sections/Hero";
import { ConciergeBand } from "@/components/sections/ConciergeBand";
import { DiagnosticSection } from "@/components/sections/DiagnosticSection";
import { DestinationTilesSection } from "@/components/sections/DestinationTilesSection";
import { VisaSection } from "@/components/sections/VisaSection";
import { AdvisorCard } from "@/components/sections/AdvisorCard";
import { ConciergeNote } from "@/components/sections/ConciergeNote";
import { DualCTA } from "@/components/sections/DualCTA";
import { TrustFootnote } from "@/components/sections/TrustFootnote";
import { Footer } from "@/components/sections/Footer";
import { ChatLauncher } from "@/components/floating/ChatLauncher";
import { InteractiveDock } from "@/components/floating/InteractiveDock";

export default function Home() {
  return (
    <>
      <TopNav />
      <main className="flex-1">
        <Hero />
        <ConciergeBand />
        <DiagnosticSection />
        <DestinationTilesSection />
        <VisaSection />
        <AdvisorCard />
        <ConciergeNote />
        <DualCTA />
        <TrustFootnote />
      </main>
      <Footer />
      <ChatLauncher />
      <InteractiveDock />
    </>
  );
}
