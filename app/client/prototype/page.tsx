export default function PrototypePage() {
  return (
    <article>
      <section
        id="hero"
        data-feedback-id="HERO-01"
        className="flex min-h-[60vh] flex-col items-start justify-center gap-6 py-16"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-[#C9A65C]">
          HERO-01 · 占位
        </span>
        <h1 className="font-serif text-[clamp(48px,7vw,96px)] leading-[1.05] text-[#1F4E5C] tracking-tight">
          中国深度行程
          <br />
          为懂得旅行的人
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-[#1A1A1A]/80">
          这是 Day 1 portal 占位 HERO。Stitch 高保真稿 + DESIGN.md 锁定后将填充真实文案、视觉与 CTA。
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            className="rounded-md bg-[#C13829] px-6 py-3 text-sm font-medium text-[#F8F4EC] transition-transform hover:-translate-y-px"
          >
            获取行程方案（占位）
          </button>
          <button
            type="button"
            className="rounded-md border border-[#1F4E5C]/30 px-6 py-3 text-sm font-medium text-[#1F4E5C] transition-colors hover:border-[#1F4E5C]"
          >
            电话咨询（占位)
          </button>
        </div>
      </section>

      <section className="border-t border-[#E8E0D5] py-8 text-sm text-[#1A1A1A]/60">
        <p>
          后续 section 待 v9 落地：ITIN-01 行程卡片 · PRICE-01 价格区 · FORM-01 询价表单 · FAQ-01 · FOOT-01。
        </p>
      </section>
    </article>
  );
}
