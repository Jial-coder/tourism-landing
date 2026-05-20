import { Pill } from "@/components/atoms/Pill";
import { SectionInner } from "@/components/atoms/SectionContainer";

/**
 * DiagnosticSection — M-DIAGNOSTIC（独立段，不是 hero 内的 4 pill）。
 * brief: docs/modules/M-DIAGNOSTIC.md
 *
 * 把客户分成 4 类自我归类入口，每类点进去引到对应行程或聊天。
 */

const DIAGNOSTICS = [
  { label: "还没想好", desc: "Not sure yet", href: "/plan?path=undecided" },
  { label: "只有 10 天", desc: "Only 10 days", href: "/itineraries/sample-10d" },
  { label: "带孩子", desc: "Traveling with kids", href: "/themes/family" },
  { label: "想看自然", desc: "Nature, not cities", href: "/themes/nature" },
  { label: "在中国出差", desc: "Business trip extension", href: "/themes/business-add-on" },
  { label: "回乡探亲 + 玩", desc: "Heritage + leisure combo", href: "/themes/heritage" },
];

export function DiagnosticSection() {
  return (
    <section
      data-feedback-id="DIAGNOSTIC-01"
      className="relative w-full bg-deep-slate py-16 lg:py-24"
    >
      <SectionInner>
        <div className="flex flex-col gap-3 max-w-[640px] mb-8">
          <div className="text-[12px] font-misans-regular tracking-[0.18em] text-alpine-blue/80">
            6 种切入
          </div>
          <h2 className="text-[24px] lg:text-[36px] font-misans-bold leading-tight text-soft-ivory tracking-tight">
            从你最像的一种开始
          </h2>
          <p className="text-[14px] lg:text-[15px] font-misans-regular text-soft-ivory/70 leading-relaxed">
            不需要先填表，先告诉我们你大概是哪种状态。我们会根据这个推荐 1-2 条最少弯路的方向。
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {DIAGNOSTICS.map((d) => (
            <a key={d.label} href={d.href} className="block">
              <Pill className="px-5 py-2.5 text-[14px]">
                <span className="font-misans-bold mr-2">{d.label}</span>
                <span className="text-soft-ivory/55 text-[12px]">· {d.desc}</span>
              </Pill>
            </a>
          ))}
        </div>
      </SectionInner>
    </section>
  );
}
