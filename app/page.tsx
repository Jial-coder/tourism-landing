import { TopNav } from "@/components/chrome/TopNav";
import { HomeHero } from "@/components/sections/HomeHero";
import { AdvisorShortcut } from "@/components/sections/AdvisorShortcut";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { VisaFreeBanner } from "@/components/sections/VisaFreeBanner";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { DestinationGrid } from "@/components/sections/DestinationGrid";
import { SampleItineraries } from "@/components/sections/SampleItineraries";
import { Specialists } from "@/components/sections/Specialists";
import { TrustProofGrid } from "@/components/trust/TrustProofGrid";
import { LeadForm } from "@/components/sections/LeadForm";
import { FAQ } from "@/components/sections/FAQ";
import { PathCFooter } from "@/components/sections/PathCFooter";

export default function Home() {
  return (
    <>
      <TopNav />
      <main className="flex-1">
        <HomeHero />
        <AdvisorShortcut />
        <TrustStrip />
        <VisaFreeBanner />
        <HowWeWork />
        <DestinationGrid />
        <SampleItineraries />
        <Specialists />
        <TrustProofGrid />
        <LeadForm source="home-mid" />
        <FAQ />
      </main>
      <PathCFooter />
    </>
  );
}
