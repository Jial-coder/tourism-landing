type SampleReview = {
  scenario: string;
  body: string;
  hypotheticalAuthor: string;
};

export function SampleReviewCard({ review }: { review: SampleReview }) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-[14px] bg-paper p-6 ring-1 ring-ink/10 lg:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-misans-regular tracking-[0.18em] uppercase text-jade">
          这是占位样例 · 不是真实客户原话
        </span>
      </div>
      <h3 className="text-[16px] font-misans-bold leading-snug text-ink">
        当我们有了首批旅客之后，他们的回信大概会长这样：
      </h3>
      <p className="text-[13px] font-misans-regular italic leading-relaxed text-ink/70 lg:text-[14px]">
        “{review.body}”
      </p>
      <p className="mt-auto text-[12px] font-misans-regular text-ink/70">
        Scenario · {review.scenario}
        <br />
        <span className="text-ink/70">
          Hypothetical traveller profile (not a real customer): {review.hypotheticalAuthor}
        </span>
      </p>
    </article>
  );
}

export const SAMPLE_REVIEWS: SampleReview[] = [
  {
    scenario: "14 天文化路线 · 第一次来中国的家庭",
    body: "This is what a typical post-trip note will look like once we have customers — covering pace, food, the moments that landed, and what we should have done differently. We are not putting fictional names or photos here because we have not earned them yet.",
    hypotheticalAuthor: "Sample profile only · no real traveller",
  },
  {
    scenario: "9 天蜜月 · 桂林 / 阳朔 / 大理",
    body: "Once a real honeymoon couple writes in, this card will show their actual voice with their permission. Until then, we want this slot to read as exactly what it is: a placeholder reserved for somebody who has not booked yet.",
    hypotheticalAuthor: "Sample profile only · no real traveller",
  },
];
