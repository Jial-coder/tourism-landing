import type { useLocale } from '@/components/i18n/LocaleProvider';

export function CaveatsList({
  dict,
}: {
  dict: ReturnType<typeof useLocale>['t']['home']['visaFree'];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {dict.caveats.items.map((item) => (
        <article
          key={item.title}
          className="flex flex-col gap-2 rounded-[10px] bg-cream p-5 ring-1 ring-ink/10"
        >
          <h3 className="text-[16px] font-misans-bold text-ink">{item.title}</h3>
          <p className="text-[13px] font-misans-regular leading-relaxed text-ink/75 lg:text-[14px]">
            {item.body}
          </p>
        </article>
      ))}
    </div>
  );
}
