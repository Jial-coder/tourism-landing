import { TopNav } from '@/components/chrome/TopNav';
import { Footer } from '@/components/sections/Footer';
import { PlanWizard } from '@/components/wizard/PlanWizard';
import { buildPlanInitialContext } from '@/lib/plan-context';

export default async function PlanPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const type = Array.isArray(params.type) ? params.type[0] : params.type;
  const initialContext = buildPlanInitialContext(params);

  return (
    <>
      <TopNav variant="always-chromed" />
      <main className="flex-1 bg-cream pt-[88px] text-ink md:pt-[92px]">
        <PlanWizard initialVisaFree={type === 'visa-free'} initialContext={initialContext} />
      </main>
      <Footer />
    </>
  );
}
