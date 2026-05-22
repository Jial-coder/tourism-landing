type Step = {
  num: string;
  title: string;
  body: string;
  hint: string;
};

const STEPS: Step[] = [
  {
    num: "1",
    title: "Intake · 我们先认识你",
    body: "你写信进来，顾问会在 4 小时内回，约一次 30 分钟视频。我们要先听清楚同行人、节奏偏好、对吃的耐受度，再开笔。",
    hint: "≤ 4h reply · 30 min video",
  },
  {
    num: "2",
    title: "Draft · 顾问起草第一版",
    body: "1-2 个工作日内，你会收到一份 PDF 草稿——逐日节奏、推荐住宿等级、价格区间、Lin 替你做的取舍说明。",
    hint: "1-2 business days",
  },
  {
    num: "3",
    title: "Refine · 我们一起改",
    body: "你看完想加 / 减 / 换的细节，可以邮件，也可以在 WhatsApp 里直接说。每一次回复仍然是同一位顾问，不会换人。",
    hint: "通常 2-3 轮",
  },
  {
    num: "4",
    title: "Confirm · 合同 + 订金",
    body: "方案确认后我们发合同，里面写清楚取消政策、汇率锚点、不可抗力条款。看完没问题，再付 30% 订金，余款落地后付。",
    hint: "30% on signing",
  },
  {
    num: "5",
    title: "In-trip · 落地后顾问值班",
    body: "你在中国期间，原顾问会在 WhatsApp 上待机。航班延误、临时改主意、想多住一晚——一句话发过来，我们在地面上帮你处理。",
    hint: "WhatsApp 24/7（中国时区）",
  },
  {
    num: "6",
    title: "Debrief · 回家之后回信",
    body: "你回去之后，我们会发一封简短的回信问哪里好哪里不好——不是 marketing email，是真的把你的反馈写进下一份草稿。",
    hint: "1 周内",
  },
];

export function HowWeWorkSteps() {
  return (
    <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {STEPS.map((s) => (
        <li
          key={s.num}
          className="flex flex-col gap-3 rounded-[14px] bg-cream p-6 ring-1 ring-ink/10"
        >
          <div className="flex items-baseline gap-3">
            <span className="text-[34px] font-misans-heavy leading-none text-vermilion">
              {s.num}
            </span>
            <span className="text-[11px] font-misans-regular tracking-[0.18em] uppercase text-jade">
              {s.hint}
            </span>
          </div>
          <h3 className="text-[18px] font-misans-bold leading-snug text-ink">
            {s.title}
          </h3>
          <p className="text-[13px] font-misans-regular leading-relaxed text-ink/70 lg:text-[14px]">
            {s.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
