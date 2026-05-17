import Image from "next/image";
import chinaMap from "@/app/_generated/china-map.json";

type Landmark = {
  id: string;
  zh: string;
  en: string;
  tagline: string;
  lng: number;
  lat: number;
  query: string;
  x: number;
  y: number;
};

const landmarks = chinaMap.landmarks as Landmark[];
const beijing = landmarks.find((l) => l.id === "beijing")!;

export default function PrototypePage() {
  return (
    <article>
      <section
        id="hero"
        data-feedback-id="HERO-01"
        className="relative grid min-h-[calc(100vh-80px)] grid-cols-1 items-center gap-12 py-12 lg:grid-cols-[45fr_55fr] lg:gap-16"
      >
        {/* LEFT — content */}
        <div className="z-10 flex max-w-2xl flex-col gap-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#C9A65C]" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A65C]">
              EXPLORE CHINA · 探索中国
            </span>
          </div>

          <h1
            className="text-[#1F4E5C]"
            style={{ fontFamily: '"Noto Serif SC", "Source Han Serif", serif' }}
          >
            <span className="block text-[clamp(56px,8vw,112px)] leading-[0.95] tracking-tight">
              看景 · 吃喝 · 人文
            </span>
            <span className="mt-3 block text-[clamp(28px,3.5vw,48px)] leading-tight text-[#1F4E5C]/85">
              一站式中国深度行程
            </span>
          </h1>

          <p className="max-w-lg text-lg font-medium text-[#1A1A1A]/90">
            Curated journeys — sights, taste, soul, all in one trip
          </p>

          <p className="max-w-lg text-base leading-relaxed text-[#1A1A1A]/75">
            十年本地策划经验，带境外游客避开打卡套路。每一段行程由当地资深规划师设计 —— 看真景、吃真味、读真历史。
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              type="button"
              className="group flex items-center justify-center gap-2 rounded-xl border border-[#C13829] bg-[#C13829] px-7 py-4 text-sm font-semibold text-[#F8F4EC] shadow-sm transition-all duration-150 hover:-translate-y-px hover:bg-[#A82E22]"
            >
              定制我的中国行程
              <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">
                →
              </span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#1F4E5C] bg-transparent px-7 py-4 text-sm font-semibold text-[#1F4E5C] transition-all duration-150 hover:-translate-y-px hover:bg-[#1F4E5C]/5"
            >
              在线聊聊想去哪里
            </button>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[#E8E0D5] pt-6">
            <TrustItem icon="★" label="5,000+ 五星好评" />
            <TrustItem icon="◐" label="24/7 中英双语客服" />
            <TrustItem icon="◇" label="100% 个性化定制" />
          </div>
        </div>

        {/* RIGHT — China map with landmark portraits */}
        <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-visible rounded-3xl border border-[#E8E0D5]/70 bg-gradient-to-br from-[#F8F4EC] to-[#E8E0D5]/60 lg:aspect-auto lg:h-[640px]">
          <svg
            viewBox={chinaMap.viewBox}
            className="absolute inset-0 h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="中华人民共和国地图（GS(2019)1822 标准底图）"
          >
            <path
              d={chinaMap.path}
              fill="rgba(31, 78, 92, 0.04)"
              stroke="#1F4E5C"
              strokeOpacity={0.55}
              strokeWidth={1.2}
              strokeLinejoin="round"
            />
            {/* Pulse rings (SVG layer for crisp alignment) */}
            {landmarks.map((m) =>
              m.id === "beijing" ? null : (
                <circle
                  key={`pulse-${m.id}`}
                  cx={m.x}
                  cy={m.y}
                  r={22}
                  fill="#C13829"
                  opacity={0.12}
                >
                  <animate attributeName="r" values="18;26;18" dur="3.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.14;0.04;0.14" dur="3.2s" repeatCount="indefinite" />
                </circle>
              ),
            )}
          </svg>

          {/* Landmark portraits (HTML layer for Image optimization) */}
          {landmarks.map((m) => (
            <LandmarkPortrait key={m.id} landmark={m} active={m.id === "beijing"} />
          ))}

          {/* Active popover */}
          <BeijingPopover landmark={beijing} />

          <span className="absolute bottom-3 right-4 text-[10px] text-[#1A1A1A]/35">
            审图号 GS(2019)1822
          </span>
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

function TrustItem({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-base text-[#C9A65C]" aria-hidden>
        {icon}
      </span>
      <span className="text-sm font-medium text-[#1A1A1A]">{label}</span>
    </div>
  );
}

function LandmarkPortrait({ landmark, active }: { landmark: Landmark; active: boolean }) {
  const xPct = (landmark.x / chinaMap.width) * 100;
  const yPct = (landmark.y / chinaMap.height) * 100;
  const size = active ? 64 : 44;

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${xPct}%`, top: `${yPct}%` }}
    >
      <div
        className={`relative overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-[#F8F4EC] transition-all duration-300 hover:scale-110 ${
          active ? "ring-[#C13829]" : "ring-[#C9A65C]/70"
        }`}
        style={{ width: size, height: size }}
      >
        <Image
          src={`/landmarks/${landmark.id}.jpg`}
          alt={`${landmark.zh} ${landmark.en}`}
          fill
          sizes={`${size}px`}
          className="object-cover"
        />
      </div>
      <span className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded bg-[#1F4E5C] px-1.5 py-0.5 text-[10px] font-medium text-[#F8F4EC] opacity-0 shadow transition-opacity duration-200 group-hover:opacity-100">
        {landmark.zh}
      </span>
    </div>
  );
}

function BeijingPopover({ landmark }: { landmark: Landmark }) {
  const xPct = (landmark.x / chinaMap.width) * 100;
  const yPct = (landmark.y / chinaMap.height) * 100;

  return (
    <div
      className="absolute z-20 w-[280px] -translate-y-1/2 translate-x-10 rounded-xl border border-[#E8E0D5] bg-[#F8F4EC] p-3 shadow-[0_12px_32px_rgba(26,26,26,0.10)]"
      style={{ left: `${xPct}%`, top: `${yPct}%` }}
    >
      <div className="flex gap-3">
        <div className="relative h-[60px] w-[80px] flex-shrink-0 overflow-hidden rounded-md">
          <Image
            src={`/landmarks/${landmark.id}.jpg`}
            alt={`${landmark.zh} ${landmark.en}`}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h3
            className="text-sm font-semibold leading-tight text-[#1F4E5C]"
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            {landmark.zh} {landmark.en}
          </h3>
          <p className="mb-2 text-[11px] leading-tight text-[#1A1A1A]/60">{landmark.tagline}</p>
          <a
            className="flex items-center gap-1 text-[11px] font-semibold text-[#C13829] transition-opacity hover:opacity-80"
            href="#"
          >
            查看详情 →
          </a>
        </div>
      </div>
    </div>
  );
}
