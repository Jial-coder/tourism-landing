import { TopNav } from '@/components/chrome/TopNav';
import { Footer } from '@/components/sections/Footer';
import { PlanWizard } from '@/components/wizard/PlanWizard';

export default async function PlanPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const type = Array.isArray(params.type) ? params.type[0] : params.type;

  return (
    <>
      <TopNav />
      <main className="flex-1 bg-cream text-ink">
        <PlanWizard initialVisaFree={type === 'visa-free'} />
      </main>
      <Footer />
    </>
  );
}
