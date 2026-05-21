import { TopNav } from "@/components/chrome/TopNav";
import { HomeHero } from "@/components/sections/HomeHero";
import { TrustStrip } from "@/components/sections/TrustStrip";
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
        <TrustStrip />
        <HowWeWork />
        <DestinationGrid />
        <SampleItineraries />
        <Specialists />
        <TrustProofGrid />
        <section
          id="lead-form"
          className="relative w-full bg-paper py-20 lg:py-28"
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <p className="font-serif text-sm uppercase tracking-[0.2em] text-jade">
                Plan your trip
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-ink mt-3">
                Tell us your China trip idea
              </h2>
              <p className="text-ink-soft mt-4 text-lg leading-relaxed">
                One Beijing-based specialist, one tailor-made route, one reply within 24 hours
                (mainland-China public holidays excluded).
              </p>
            </div>
            <LeadForm source="home-mid" />
          </div>
        </section>
        <FAQ />
      </main>
      <PathCFooter />
    </>
  );
}
