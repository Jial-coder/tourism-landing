type Promise = {
  kicker: string;
  title: string;
  body: string;
};

const PROMISES: Promise[] = [
  {
    kicker: "01",
    title: "4 小时回信",
    body: "你写信进来，北京顾问真人在 4 小时内回。中国节假日除外，节假日会先发自动信告知值班人。",
  },
  {
    kicker: "02",
    title: "公开起价区间",
    body: "不藏价。每条样板行程都标了 USD 起价区间，是真实成交价的下限，不是「点击咨询」障眼法。",
  },
  {
    kicker: "03",
    title: "无购物店",
    body: "我们的草稿里没有任何隐性回扣点。如果你听说过中国旅行被带去玉器店，那不是这里。",
  },
  {
    kicker: "04",
    title: "顾问署名 + WhatsApp 直链",
    body: "每一封回复署真名。WhatsApp 直链不藏在表单后面，急的时候你可以一键直达。",
  },
  {
    kicker: "05",
    title: "签合同前不收订金",
    body: "草稿、视频、改方案，全部免费。只有等你看完合同条款、确认没问题之后，我们才会发 invoice。",
  },
  {
    kicker: "06",
    title: "数据隐私",
    body: "你填的信息只用来写你的行程。不卖给第三方、不用来推送广告、不在合作伙伴之间共享。",
  },
];

export function PromiseList() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {PROMISES.map((p) => (
        <li
          key={p.kicker}
          className="flex flex-col gap-3 rounded-[14px] bg-paper p-6 ring-1 ring-ink/10"
        >
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-vermilion">
              {p.kicker}
            </span>
            <span className="h-px flex-1 bg-ink/15" aria-hidden />
          </div>
          <h3 className="text-[18px] font-misans-bold leading-snug text-ink">
            {p.title}
          </h3>
          <p className="text-[13px] font-misans-regular leading-relaxed text-ink/70 lg:text-[14px]">
            {p.body}
          </p>
        </li>
      ))}
    </ul>
  );
}
