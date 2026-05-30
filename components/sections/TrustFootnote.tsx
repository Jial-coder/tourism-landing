import { SectionInner } from "@/components/atoms/SectionContainer";

/**
 * TrustFootnote — M-TRUST-FOOTNOTE Variant B (96px detail-page band, 4 数字编号 footnote)。
 * brief: docs/modules/M-TRUST-FOOTNOTE.md
 *
 * 不做 icon band / TripAdvisor logo 墙 / 5-star 大数字。
 */

const FOOTNOTES = [
  {
    n: "01",
    title: "本地真实顾问",
    desc: "Beijing / Chengdu / Shanghai 三地小团队，全部签合同的本地员工。无外包、无中介转包。",
  },
  {
    n: "02",
    title: "双语逐字回复",
    desc: "English · 中文为主，日语德语法语按顾问匹配。每一封行程回复都是真人写的，不是模板。",
  },
  {
    n: "03",
    title: "全包透明价",
    desc: "酒店 · 用车 · 景区 · 票务 · 餐 全包估价；不再单加项，不再现场推升级。",
  },
  {
    n: "04",
    title: "客人原话",
    desc: "真实客人原话会在取得授权和来源核验后展示。",
  },
];

export function TrustFootnote() {
  return (
    <section
      data-feedback-id="TRUST-01"
      className="relative w-full bg-cream py-16 lg:py-24 border-t border-ink/10"
    >
      <SectionInner>
        <div className="mb-10 lg:mb-12 max-w-[640px]">
          <h2 className="text-[20px] lg:text-[28px] font-misans-bold tracking-tight text-ink italic">
            Why people stay with us
          </h2>
        </div>
        <div className="flex flex-col gap-10 lg:gap-12">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-x-16 gap-y-8 items-start">
            <Footnote {...FOOTNOTES[0]} />
            <Footnote {...FOOTNOTES[1]} className="lg:mt-6" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-x-16 gap-y-8 items-start lg:pl-12">
            <Footnote {...FOOTNOTES[2]} />
            <Footnote {...FOOTNOTES[3]} className="lg:mt-10" />
          </div>
        </div>
      </SectionInner>
    </section>
  );
}

function Footnote({
  n,
  title,
  desc,
  className,
}: {
  n: string;
  title: string;
  desc: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <div className="text-[14px] font-misans-regular tracking-widest text-ink/40">
        {n}
      </div>
      <div className="text-[15px] font-misans-bold text-ink">
        {title}
      </div>
      <p className="text-[13px] font-misans-regular text-ink/70 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
