import Link from "next/link";
import { TopNav } from "@/components/chrome/TopNav";
import { Footer } from "@/components/sections/Footer";
import { CTAPrimary } from "@/components/atoms/CTAGhost";
import { SectionInner } from "@/components/atoms/SectionContainer";
import { MockBadge } from "@/components/trust/MockBadge";
import { AdvisorCard } from "@/components/about/AdvisorCard";
import { PromiseList } from "@/components/about/PromiseList";
import { HowWeWorkSteps } from "@/components/about/HowWeWorkSteps";
import { ADVISORS } from "@/lib/data/advisors";

export const metadata = {
  title: "关于我们 · Beijing-based team. Real names. Real WhatsApp. | pandatravel",
  description:
    "pandatravel 是一支北京本地顾问团队，签约真名、4 小时回信、利润结构透明。这一页写给愿意先认识我们再下决定的旅客。",
};

export default function AboutPage() {
  return (
    <>
      <TopNav />
      <main className="flex-1 bg-cream">
        {/* 1. Hero */}
        <section
          aria-labelledby="about-hero-title"
          className="relative w-full bg-cream pt-28 pb-12 md:pt-36 lg:pb-16"
        >
          <SectionInner>
            <div className="flex max-w-[860px] flex-col gap-5">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                About pandatravel
              </div>
              <h1
                id="about-hero-title"
                className="text-[40px] font-misans-heavy leading-[1.05] tracking-tight text-ink md:text-[56px] lg:text-[68px]"
              >
                A Beijing-based team. Real names. Real WhatsApp.
              </h1>
              <p className="text-[15px] font-misans-regular leading-relaxed text-ink/75 lg:text-[17px]">
                我们没有客服中心，没有外包写信的代理团队。每一封从 pandatravel.com.cn 发出去的回信，背后都是一位住在中国、签约的真人顾问，名字写在邮件上，WhatsApp 直接接到他自己手机上。
              </p>
            </div>
          </SectionInner>
        </section>

        {/* 2. Why we started */}
        <section
          aria-labelledby="about-origin-title"
          className="relative w-full bg-paper py-16 lg:py-24"
        >
          <SectionInner>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-20">
              <div className="flex flex-col gap-3">
                <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                  Why we started
                </div>
                <h2
                  id="about-origin-title"
                  className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]"
                >
                  起点写在长城脚下的一封回信里
                </h2>
              </div>
              <div className="flex flex-col gap-4 text-[14px] font-misans-regular leading-relaxed text-ink/80 lg:text-[15px]">
                <p>
                  2024 年冬天，我们的创始人收到一位澳洲读者的来信，标题写着「14 天的中国，被五家旅行社写成了五份完全一样的清单」。我们一条条对了对，发现连推荐酒店的电话号码都是同一个。那是我们决定开做这件事的早晨。
                </p>
                <p>
                  我们的判断是：海外旅客来中国，最难的不是找到「能去哪」，是找到一个真正住在中国、能为他们某一天某一顿饭某一段高铁负责的人。所以 pandatravel 不是一家旅行社，是一支顾问团队——每位顾问每周接的客户被我们刻意限制在 3 组以内，4 小时回信靠这个上限换。
                </p>
                <p>
                  我们也知道，对于一支 v1 阶段的团队，「真名 + 透明 + 慢」是赌注。我们押在这一面。
                </p>
              </div>
            </div>
          </SectionInner>
        </section>

        {/* 3. Meet our team */}
        <section
          aria-labelledby="about-team-title"
          className="relative w-full bg-cream py-16 lg:py-24"
        >
          <SectionInner>
            <div className="mb-10 flex max-w-[760px] flex-col gap-3 lg:mb-14">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                Meet our team
              </div>
              <h2
                id="about-team-title"
                className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]"
              >
                {ADVISORS.length} 位顾问 · 你一定会被分到其中一位
              </h2>
              <p className="text-[14px] font-misans-regular leading-relaxed text-ink/70 lg:text-[15px]">
                v1 阶段我们刻意只签 {ADVISORS.length} 位全职顾问，每位每周接 ≤ 3 组旅客。下面写的 bio 是真的、案例是真的、WhatsApp 号码上线前会替换为本人手机号。当前页面所有名字标记为占位（"顾问编号 demo"）——上线当天每位顾问会用自己的真名替换。
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {ADVISORS.map((a) => (
                <li key={a.slug}>
                  <AdvisorCard advisor={a} />
                </li>
              ))}
            </ul>
          </SectionInner>
        </section>

        {/* 4. Our promise */}
        <section
          aria-labelledby="about-promise-title"
          className="relative w-full bg-paper py-16 lg:py-24"
        >
          <SectionInner>
            <div className="mb-10 flex max-w-[760px] flex-col gap-3 lg:mb-14">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                Our promise
              </div>
              <h2
                id="about-promise-title"
                className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]"
              >
                我们给你的 6 条承诺
              </h2>
              <p className="text-[14px] font-misans-regular leading-relaxed text-ink/70 lg:text-[15px]">
                这 6 条不是 marketing copy，是我们写在合同前页的条款。你在签约前每一条都可以直接质问 Lin。
              </p>
            </div>
            <PromiseList />
          </SectionInner>
        </section>

        {/* 5. How we work */}
        <section
          aria-labelledby="about-how-title"
          className="relative w-full bg-cream py-16 lg:py-24"
        >
          <SectionInner>
            <div className="mb-10 flex max-w-[760px] flex-col gap-3 lg:mb-14">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                How we work
              </div>
              <h2
                id="about-how-title"
                className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]"
              >
                从你写信进来到回家之后 · 6 步
              </h2>
              <p className="text-[14px] font-misans-regular leading-relaxed text-ink/70 lg:text-[15px]">
                每一步我们都说清楚要花多长时间、谁负责、你需要做什么决定。这是 D1 差异化主轴的落地——不是关于快，是关于诚实告诉你这件事多慢。
              </p>
            </div>
            <HowWeWorkSteps />
          </SectionInner>
        </section>

        {/* 6. Pricing transparency */}
        <section
          aria-labelledby="about-pricing-title"
          className="relative w-full bg-paper py-16 lg:py-24"
        >
          <SectionInner>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-16">
              <div className="flex flex-col gap-3">
                <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                  Pricing transparency
                </div>
                <h2
                  id="about-pricing-title"
                  className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]"
                >
                  你付的钱去了哪里
                </h2>
                <MockBadge>示例百分比 · 实际按行程区间浮动</MockBadge>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-[14px] font-misans-regular leading-relaxed text-ink/80 lg:text-[15px]">
                  以一份 USD 5,000 / 人的 12 天定制行程为例，我们的成本结构大致是这样的。每条具体行程的合同里会写出真实数字，不藏。
                </p>
                <ul className="grid grid-cols-1 gap-3">
                  <PriceRow
                    pct="≈ 70%"
                    label="Ground costs · 落地真实成本"
                    body="酒店、司机、导游、景区门票、餐厅、火车 / 内陆机票。我们给你看分项 invoice。"
                  />
                  <PriceRow
                    pct="≈ 12%"
                    label="Advisory · 顾问设计费"
                    body="顾问从第一封信到回家后回信全程的时间成本。这一项是我们给顾问发工资的来源，不分提成。"
                  />
                  <PriceRow
                    pct="≈ 10%"
                    label="Operations · 运营 / 24h 值班 / 风险准备"
                    body="后端协调、地面应急、保险预付、签约公司运营成本。"
                  />
                  <PriceRow
                    pct="≈ 8%"
                    label="Margin · 公司利润"
                    body="是的，我们也要赚钱。但这一栏的占比写在合同里，不动手脚。"
                  />
                </ul>
                <p className="text-[12px] font-misans-regular leading-relaxed text-ink/55">
                  对比同业「礼包打包售价 + 隐形回扣点」的做法，这一页是我们最偏执的差异化。如果你看到任何一项不舒服，我们都可以单独和你聊。
                </p>
              </div>
            </div>
          </SectionInner>
        </section>

        {/* 7. CTA */}
        <section
          aria-labelledby="about-cta-title"
          className="relative w-full bg-cream py-16 lg:py-24 border-t border-ink/10"
        >
          <SectionInner>
            <div className="flex flex-col items-start gap-6 rounded-[16px] bg-paper p-8 ring-1 ring-ink/10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
              <div className="flex flex-col gap-2">
                <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                  Talk to an advisor
                </div>
                <h2
                  id="about-cta-title"
                  className="text-[24px] font-misans-heavy tracking-tight text-ink lg:text-[32px]"
                >
                  挑一位顾问，先认识一下
                </h2>
                <p className="max-w-[560px] text-[14px] font-misans-regular leading-relaxed text-ink/70">
                  你可以填一份 5 步草稿，让我们替你分配最合适的顾问；也可以直接 WhatsApp 上面任何一位顾问开始聊。
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <CTAPrimary href="/plan" className="h-12 px-7">
                  填 5 步草稿
                </CTAPrimary>
                <Link
                  href="#advisor-lin"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-paper px-7 text-[14px] font-misans-bold text-ink ring-1 ring-ink/15 transition-colors hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream motion-reduce:transition-none"
                >
                  看顾问名单
                </Link>
              </div>
            </div>
          </SectionInner>
        </section>
      </main>
      <Footer />
    </>
  );
}

function PriceRow({
  pct,
  label,
  body,
}: {
  pct: string;
  label: string;
  body: string;
}) {
  return (
    <li className="grid grid-cols-[80px_1fr] items-baseline gap-4 rounded-[10px] bg-cream p-4 ring-1 ring-ink/8">
      <span className="text-[18px] font-misans-heavy text-vermilion lg:text-[20px]">
        {pct}
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-[14px] font-misans-bold text-ink">{label}</span>
        <span className="text-[12px] font-misans-regular leading-relaxed text-ink/65 lg:text-[13px]">
          {body}
        </span>
      </div>
    </li>
  );
}
