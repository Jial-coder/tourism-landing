import { TopNav } from "@/components/chrome/TopNav";
import { Footer } from "@/components/sections/Footer";
import { CTAPrimary } from "@/components/atoms/CTAGhost";
import { SectionInner } from "@/components/atoms/SectionContainer";
import { MockBadge } from "@/components/trust/MockBadge";
import { PromiseList } from "@/components/about/PromiseList";
import { EarlyStatusBanner } from "@/components/reviews/EarlyStatusBanner";
import {
  SampleReviewCard,
  SAMPLE_REVIEWS,
} from "@/components/reviews/SampleReviewCard";

export const metadata = {
  title: "Reviews · We're new. Here's how we'll prove ourselves. | pandatravel",
  description:
    "pandatravel v1 还没有真实评价。这一页写给愿意听完早期叙事的旅客——6 条承诺、Trustindex 接入计划、为什么我们不打算造数据。",
};

const PARTNERS = [
  {
    name: "Tripadvisor",
    note: "上线后接入 widget · 真实旅客评价",
  },
  {
    name: "Trustindex",
    note: "首批旅客回信后聚合显示",
  },
  {
    name: "Google Reviews",
    note: "经营 6 个月后开通商家页",
  },
  {
    name: "Feefo",
    note: "暂未签约 · 列在升级计划",
  },
];

export default function ReviewsPage() {
  return (
    <>
      <TopNav variant="always-chromed" />
      <main className="flex-1 bg-cream">
        {/* 1. Hero */}
        <section
          aria-labelledby="reviews-hero-title"
          className="relative w-full bg-cream pt-28 pb-12 md:pt-36 lg:pb-16"
        >
          <SectionInner>
            <div className="flex max-w-[860px] flex-col gap-5">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                Reviews · early-cohort transparency
              </div>
              <h1
                id="reviews-hero-title"
                className="text-[40px] font-misans-heavy leading-[1.05] tracking-tight text-ink md:text-[56px] lg:text-[68px]"
              >
                We're new. Here's how we'll prove ourselves.
              </h1>
              <p className="text-[15px] font-misans-regular leading-relaxed text-ink/75 lg:text-[17px]">
                我们没有 16,917 条评价、没有 4.9 星 Tripadvisor 徽章——那些数字我们不打算造。这一页写给愿意先听清我们承诺、再决定是否当一名首批旅客的人。
              </p>
            </div>
          </SectionInner>
        </section>

        {/* 2. Status block */}
        <section
          aria-labelledby="reviews-status-title"
          className="relative w-full bg-cream py-10 lg:py-16"
        >
          <SectionInner>
            <h2 id="reviews-status-title" className="sr-only">
              当前进度
            </h2>
            <EarlyStatusBanner />
          </SectionInner>
        </section>

        {/* 3. What we promise (6 承诺) */}
        <section
          aria-labelledby="reviews-promise-title"
          className="relative w-full bg-paper py-16 lg:py-24"
        >
          <SectionInner>
            <div className="mb-10 flex max-w-[760px] flex-col gap-3 lg:mb-14">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                What we promise
              </div>
              <h2
                id="reviews-promise-title"
                className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]"
              >
                在没有评价之前，请用这 6 条尺子量我们
              </h2>
              <p className="text-[14px] font-misans-regular leading-relaxed text-ink/70 lg:text-[15px]">
                这 6 条同时也写在 /about 页和合同前页。任何一条做不到，你都可以拿这一页来反问我们。
              </p>
            </div>
            <PromiseList />
          </SectionInner>
        </section>

        {/* 4. Awards (空状态) */}
        <section
          aria-labelledby="reviews-awards-title"
          className="relative w-full bg-cream py-16 lg:py-24"
        >
          <SectionInner>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-16">
              <div className="flex flex-col gap-3">
                <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                  Awards
                </div>
                <h2
                  id="reviews-awards-title"
                  className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]"
                >
                  暂无 · 我们刚起步
                </h2>
              </div>
              <div className="flex flex-col gap-4 rounded-[14px] bg-paper p-6 ring-1 ring-ink/10 lg:p-8">
                <p className="text-[14px] font-misans-regular leading-relaxed text-ink/75 lg:text-[15px]">
                  v1 阶段的 pandatravel 没拿过任何旅游业奖项。Travel + Leisure、Conde Nast Traveler、TTG、ITB 这些榜单，我们一个都没上。我们打算等到正式接客 12 个月后再去申请——那时候我们才有资格说话。
                </p>
                <p className="text-[13px] font-misans-regular leading-relaxed text-ink/70">
                  如果有任何同业网站现在就在「Awards & Recognition」栏挂了一排你没听说过的 logo——你大概也猜到那是怎么来的。
                </p>
              </div>
            </div>
          </SectionInner>
        </section>

        {/* 5. Trustindex / Tripadvisor 占位 */}
        <section
          aria-labelledby="reviews-partners-title"
          className="relative w-full bg-paper py-16 lg:py-24"
        >
          <SectionInner>
            <div className="mb-10 flex max-w-[760px] flex-col gap-3 lg:mb-14">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                Third-party reviews
              </div>
              <h2
                id="reviews-partners-title"
                className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]"
              >
                我们打算接入哪些第三方
              </h2>
              <p className="text-[14px] font-misans-regular leading-relaxed text-ink/70 lg:text-[15px]">
                等首批 5 组旅客回家之后，我们会邀请他们到下面这些平台真实打分。当前都是 placeholder——我们没有偷偷开账号。
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PARTNERS.map((p) => (
                <li
                  key={p.name}
                  className="flex h-full flex-col gap-3 rounded-[12px] bg-cream p-5 ring-1 ring-ink/10"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[16px] font-misans-bold tracking-tight text-ink/70 grayscale">
                      {p.name}
                    </span>
                    <MockBadge>pending</MockBadge>
                  </div>
                  <p className="text-[12px] font-misans-regular leading-relaxed text-ink/60 lg:text-[13px]">
                    {p.note}
                  </p>
                </li>
              ))}
            </ul>
          </SectionInner>
        </section>

        {/* 6. Sample of how reviews will look */}
        <section
          aria-labelledby="reviews-sample-title"
          className="relative w-full bg-cream py-16 lg:py-24"
        >
          <SectionInner>
            <div className="mb-10 flex max-w-[760px] flex-col gap-3 lg:mb-14">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                Sample slot · placeholder
              </div>
              <h2
                id="reviews-sample-title"
                className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]"
              >
                未来这一栏会长成什么样
              </h2>
              <p className="text-[14px] font-misans-regular leading-relaxed text-ink/70 lg:text-[15px]">
                下面两张卡是占位样例——它们是我们故意不写得「像真客户原话」，让你一眼就能认出这是预留位。等真有旅客同意把回信公开发出来之后，我们才会用他们的真实文字替换。
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {SAMPLE_REVIEWS.map((r, i) => (
                <li key={i}>
                  <SampleReviewCard review={r} />
                </li>
              ))}
            </ul>
          </SectionInner>
        </section>

        {/* 7. CTA */}
        <section
          aria-labelledby="reviews-cta-title"
          className="relative w-full bg-paper py-16 lg:py-24 border-t border-ink/10"
        >
          <SectionInner>
            <div className="flex flex-col items-start gap-6 rounded-[16px] bg-cream p-8 ring-1 ring-ink/10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
              <div className="flex flex-col gap-2">
                <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-vermilion">
                  Cohort 0
                </div>
                <h2
                  id="reviews-cta-title"
                  className="text-[24px] font-misans-heavy tracking-tight text-ink lg:text-[32px]"
                >
                  愿意当我们首批 5 组旅客之一吗？
                </h2>
                <p className="max-w-[560px] text-[14px] font-misans-regular leading-relaxed text-ink/70">
                  首批旅客行程结束后，我们会请你写一份诚实回信——好坏都写。作为交换，你享受全程顾问优先档期 + cohort 0 标记的合同。
                </p>
              </div>
              <CTAPrimary href="/plan" className="h-12 px-7">
                我先写一份草稿 →
              </CTAPrimary>
            </div>
          </SectionInner>
        </section>
      </main>
      <Footer />
    </>
  );
}
