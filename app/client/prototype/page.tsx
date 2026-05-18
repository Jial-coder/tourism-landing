"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import {
  ArrowRight,
  BookOpen,
  Camera,
  Check,
  Headset,
  Music,
  Plus,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import chinaMap from "@/app/_generated/china-map.json";
import { LANDMARK_DETAILS } from "./landmark-details";
import { FadeContent } from "@/components/animated/FadeContent";
import { SplitText } from "@/components/animated/SplitText";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

type LandmarkDetail = (typeof LANDMARK_DETAILS)[keyof typeof LANDMARK_DETAILS];

const landmarks = chinaMap.landmarks as Landmark[];

const SERIF_FONT = '"Noto Serif SC", "Source Han Serif", serif';

type Itinerary = {
  id: string;
  badge: string;
  title: string;
  desc: string;
  cities: string[];
  price: string;
  includes: string[];
};

const ITINERARIES: Itinerary[] = [
  {
    id: "classic-5",
    badge: "经典",
    title: "5 天经典",
    desc: "首站三城，看真长城、外滩夜景与古都风骨",
    cities: ["北京", "上海", "西安"],
    price: "¥9,800 起",
    includes: ["5 星酒店 4 晚", "故宫·兵马俑专导", "外滩夜游 + 米其林晚宴"],
  },
  {
    id: "culture-7",
    badge: "文化",
    title: "7 天文化深度",
    desc: "丝路与江南双线，从沙漠到古城的时空跨越",
    cities: ["北京", "西安", "敦煌", "桂林"],
    price: "¥18,800 起",
    includes: ["莫高窟特窟通票", "桂林漓江包船", "中英双语文化导师"],
  },
  {
    id: "deep-10",
    badge: "深度",
    title: "10 天大江南北",
    desc: "六城贯通，山水、人文、美食一次走遍",
    cities: ["北京", "上海", "西安", "桂林", "成都", "张家界"],
    price: "¥28,800 起",
    includes: ["熊猫基地半日体验", "张家界天门山缆车", "全程跨城商务舱接送"],
  },
];

const INCLUDES = [
  "5 星酒店全程入住",
  "中英双语专车专导",
  "热门景区门票全包",
  "机场及高铁站接送",
  "24/7 微信旅程客服",
];

const EXCLUDES = ["跨城机票（可代订）", "境外旅行保险（强烈推荐）", "正餐外的自费餐饮"];

const ADD_ONS = [
  "私人摄影师跟拍",
  "米其林餐厅预订",
  "驻地文化导师讲解",
  "100% 定制化日程"
];

const AREA_OPTIONS = [
  "北京",
  "上海",
  "西安",
  "张家界",
  "桂林",
  "成都",
  "杭州",
  "敦煌",
  "拉萨",
  "丽江",
];

const MONTHS = [
  "1 月",
  "2 月",
  "3 月",
  "4 月",
  "5 月",
  "6 月",
  "7 月",
  "8 月",
  "9 月",
  "10 月",
  "11 月",
  "12 月",
];

const BUDGETS = [
  { value: "10k", label: "¥10K 以内" },
  { value: "20k", label: "¥20K 左右" },
  { value: "30k", label: "¥30K 左右" },
  { value: "50k+", label: "¥50K+ 旗舰" },
];

export default function PrototypePage() {
  const [hoverId, setHoverId] = useState<string | null>("beijing");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    origin: "",
    month: "",
    budget: "",
    email: "",
    wechat: "",
  });

  const handleEnter = useCallback((id: string) => setHoverId(id), []);
  const handleLeave = useCallback(() => setHoverId(null), []);
  const handleClick = useCallback((id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  }, []);

  const toggleArea = useCallback((area: string) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area],
    );
  }, []);

  const handleFormChange = useCallback(
    (field: keyof typeof formData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitting(true);
      console.log("[FORM-01] inquiry payload", {
        ...formData,
        areas: selectedAreas,
      });
      setTimeout(() => setSubmitting(false), 600);
    },
    [formData, selectedAreas],
  );

  const popoverLandmark =
    landmarks.find((l) => l.id === hoverId) ??
    landmarks.find((l) => l.id === "beijing")!;
  const activeLandmark = activeId
    ? landmarks.find((l) => l.id === activeId)!
    : null;
  const activeDetail = activeLandmark ? LANDMARK_DETAILS[activeLandmark.id] : null;

  return (
    <article>
      <section
        id="hero"
        data-feedback-id="HERO-01"
        className="relative grid min-h-[calc(100vh-80px)] grid-cols-1 items-center gap-8 py-8 lg:grid-cols-[45fr_55fr] lg:gap-16 lg:py-12"
      >
        {/* LEFT — content */}
        <div className="z-10 flex max-w-2xl flex-col gap-6 lg:gap-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-paper-gold" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-paper-gold">
              EXPLORE CHINA · 探索中国
            </span>
          </div>

          <h1 className="text-ink-teal" style={{ fontFamily: SERIF_FONT }}>
            <SplitText
              as="span"
              text="看景 · 吃喝 · 人文"
              stagger={0.08}
              duration={0.3}
              className="block text-[clamp(40px,8vw,112px)] leading-[1] tracking-tight lg:leading-[0.95]"
            />
            <SplitText
              as="span"
              text="一站式中国深度行程"
              stagger={0.05}
              duration={0.3}
              delay={0.4}
              className="mt-2 block text-[clamp(22px,4vw,48px)] leading-tight text-ink-teal/85 lg:mt-3"
            />
          </h1>

          <p className="max-w-lg text-base font-medium text-charcoal/90 lg:text-lg">
            Curated journeys — sights, taste, soul, all in one trip
          </p>

          <p className="max-w-lg text-sm leading-relaxed text-charcoal/75 lg:text-base">
            十年本地策划经验，带境外游客避开打卡套路。每一段行程由当地资深规划师设计 —— 看真景、吃真味、读真历史。
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button
              size="lg"
              className="group h-auto rounded-xl px-7 py-4 text-sm font-semibold shadow-sm transition-all duration-150 hover:-translate-y-px hover:bg-cinnabar/90"
            >
              定制我的中国行程
              <ArrowRight
                aria-hidden
                className="transition-transform duration-150 group-hover:translate-x-0.5"
              />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-auto rounded-xl border-ink-teal bg-transparent px-7 py-4 text-sm font-semibold text-ink-teal transition-all duration-150 hover:-translate-y-px hover:bg-ink-teal/5 hover:text-ink-teal"
            >
              在线聊聊想去哪里
            </Button>
          </div>

          <Separator className="mt-2 bg-soft-mist" />

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:gap-x-8">
            <TrustItem icon={<Star className="size-4 fill-paper-gold text-paper-gold" />} label="5,000+ 五星好评" />
            <TrustItem icon={<Headset className="size-4 text-paper-gold" />} label="24/7 中英双语客服" />
            <TrustItem icon={<Sparkles className="size-4 text-paper-gold" />} label="100% 个性化定制" />
          </div>
        </div>

        {/* RIGHT — China map */}
        <div className="flex flex-col gap-3">
          <div className="relative flex aspect-square w-full items-center justify-center overflow-visible rounded-3xl border border-soft-mist/70 bg-gradient-to-br from-warm-white to-soft-mist/60 lg:aspect-auto lg:h-[640px]">
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
              {landmarks.map((m) =>
                m.id === hoverId || m.id === activeId ? null : (
                  <circle
                    key={`pulse-${m.id}`}
                    cx={m.x}
                    cy={m.y}
                    r={22}
                    fill="#C13829"
                    opacity={0.12}
                  >
                    <animate attributeName="r" values="18;26;18" dur="3.2s" repeatCount="indefinite" />
                    <animate
                      attributeName="opacity"
                      values="0.14;0.04;0.14"
                      dur="3.2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                ),
              )}

              {/* SVG renders in source order — put hovered/active LAST so they sit on top */}
              {[...landmarks]
                .sort((a, b) => {
                  const aBig = a.id === hoverId || a.id === activeId ? 1 : 0;
                  const bBig = b.id === hoverId || b.id === activeId ? 1 : 0;
                  return aBig - bBig;
                })
                .map((m) => (
                  <LandmarkPortrait
                    key={m.id}
                    landmark={m}
                    hovered={hoverId === m.id}
                    active={activeId === m.id}
                    onEnter={handleEnter}
                    onLeave={handleLeave}
                    onClick={handleClick}
                  />
                ))}

              <Popover landmark={popoverLandmark} />
            </svg>

            <span className="absolute bottom-3 right-4 text-[10px] text-charcoal/35">
              审图号 GS(2019)1822
            </span>
          </div>

          {/* Mobile-only chip list — desktop hides via lg:hidden */}
          <div className="lg:hidden">
            <p className="mb-2 text-xs uppercase tracking-widest text-paper-gold">
              点击景区查看详情
            </p>
            <div className="flex flex-wrap gap-2">
              {landmarks.map((m) => {
                const isActive = activeId === m.id;
                return (
                  <Badge
                    key={`chip-${m.id}`}
                    asChild
                    variant={isActive ? "default" : "outline"}
                    className={cn(
                      "h-auto cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                      isActive
                        ? "bg-cinnabar text-warm-white hover:bg-cinnabar/90"
                        : "border-ink-teal/30 bg-white/40 text-ink-teal hover:border-cinnabar",
                    )}
                  >
                    <button type="button" onClick={() => handleClick(m.id)}>
                      {m.zh}
                    </button>
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Detail panel — desktop card under hero, mobile sheet from bottom */}
      <DetailPanel
        landmark={activeLandmark}
        detail={activeDetail}
        onClose={() => setActiveId(null)}
      />

      <FadeContent>
        <section
          id="itin"
          data-feedback-id="ITIN-01"
          className="py-16 lg:py-24"
        >
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-paper-gold">
            ITINERARIES · 经典行程
          </span>
          <h2
            className="mt-3 text-[clamp(28px,4vw,44px)] leading-tight text-ink-teal"
            style={{ fontFamily: SERIF_FONT }}
          >
            三套常选行程，挑一套即可起航
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-charcoal/70 lg:text-base">
            每条线路都由资深规划师反复打磨，价格已包含主体玩法与品质住宿。仍可在询价时自由调整。
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-3">
          {ITINERARIES.map((it) => (
            <Card
              key={it.id}
              className="flex h-full flex-col gap-0 overflow-hidden rounded-3xl border-soft-mist bg-warm-white p-0 shadow-[0_8px_24px_rgba(26,26,26,0.06)] transition-shadow hover:shadow-[0_16px_40px_rgba(26,26,26,0.10)]"
            >
              <div className="relative aspect-[4/3] w-full bg-soft-mist">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="size-12 text-ink-teal/20" />
                </div>
                <Badge className="absolute right-4 top-4 rounded-full border-transparent bg-paper-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-warm-white">
                  {it.badge}
                </Badge>
              </div>

              <CardHeader className="gap-2 px-6 pt-6">
                <CardTitle
                  className="text-2xl text-ink-teal"
                  style={{ fontFamily: SERIF_FONT }}
                >
                  {it.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed text-charcoal/75">
                  {it.desc}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col gap-5 px-6 pb-6 pt-4">
                <div className="flex flex-wrap gap-2">
                  {it.cities.map((c) => (
                    <Badge
                      key={c}
                      variant="outline"
                      className="rounded-full border-ink-teal/30 bg-transparent px-3 py-1 text-xs font-normal text-ink-teal"
                    >
                      {c}
                    </Badge>
                  ))}
                </div>

                <div
                  className="text-2xl font-bold text-cinnabar"
                  style={{ fontFamily: SERIF_FONT }}
                >
                  {it.price}
                </div>

                <ul className="flex flex-1 flex-col gap-2 text-sm text-charcoal/80">
                  {it.includes.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check
                        aria-hidden
                        className="mt-0.5 size-4 flex-shrink-0 text-paper-gold"
                      />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  className="mt-auto h-auto rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-px hover:bg-cinnabar/90"
                >
                  选这套
                  <ArrowRight aria-hidden />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        </section>
      </FadeContent>

      <FadeContent>
        <section
          id="price"
          data-feedback-id="PRICE-01"
          className="border-t border-soft-mist py-16 lg:py-24"
        >
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-paper-gold">
            WHAT&rsquo;S INCLUDED · 价格透明
          </span>
          <h2
            className="mt-3 text-[clamp(28px,4vw,44px)] leading-tight text-ink-teal"
            style={{ fontFamily: SERIF_FONT }}
          >
            一价全包，没有隐藏消费
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-charcoal/70 lg:text-base">
            所有报价已含住宿、专车专导、门票、机场接送与中英客服。下方清单帮您快速核对。
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-3">
          <Card className="flex flex-col gap-0 rounded-3xl border-soft-mist bg-warm-white p-0">
            <CardHeader className="gap-3 px-6 pt-6">
              <span className="flex size-10 items-center justify-center rounded-full bg-paper-gold/15">
                <Check aria-hidden className="size-5 text-paper-gold" />
              </span>
              <CardTitle
                className="text-xl text-ink-teal"
                style={{ fontFamily: SERIF_FONT }}
              >
                行程包含
              </CardTitle>
              <CardDescription className="text-xs uppercase tracking-widest text-charcoal/55">
                Included
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-2">
              <ul className="flex flex-col gap-3 text-sm text-charcoal/85">
                {INCLUDES.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check
                      aria-hidden
                      className="mt-0.5 size-4 flex-shrink-0 text-paper-gold"
                    />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="flex flex-col gap-0 rounded-3xl border-soft-mist bg-warm-white p-0">
            <CardHeader className="gap-3 px-6 pt-6">
              <span className="flex size-10 items-center justify-center rounded-full bg-charcoal/8">
                <X aria-hidden className="size-5 text-charcoal/45" />
              </span>
              <CardTitle
                className="text-xl text-ink-teal"
                style={{ fontFamily: SERIF_FONT }}
              >
                不含项目
              </CardTitle>
              <CardDescription className="text-xs uppercase tracking-widest text-charcoal/55">
                Not included
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-2">
              <ul className="flex flex-col gap-3 text-sm text-charcoal/85">
                {EXCLUDES.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <X
                      aria-hidden
                      className="mt-0.5 size-4 flex-shrink-0 text-charcoal/45"
                    />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="flex flex-col gap-0 rounded-3xl border-soft-mist bg-warm-white p-0">
            <CardHeader className="gap-3 px-6 pt-6">
              <span className="flex size-10 items-center justify-center rounded-full bg-paper-gold/15">
                <Plus aria-hidden className="size-5 text-paper-gold" />
              </span>
              <CardTitle
                className="text-xl text-ink-teal"
                style={{ fontFamily: SERIF_FONT }}
              >
                可选加购
              </CardTitle>
              <CardDescription className="text-xs uppercase tracking-widest text-charcoal/55">
                Add-ons
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-2">
              <ul className="flex flex-col gap-3 text-sm text-charcoal/85">
                {ADD_ONS.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Plus
                      aria-hidden
                      className="mt-0.5 size-4 flex-shrink-0 text-paper-gold"
                    />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        </section>
      </FadeContent>

      <FadeContent>
        <section
          id="form"
          data-feedback-id="FORM-01"
          className="border-t border-soft-mist py-16 lg:py-24"
        >
        <Card className="mx-auto flex max-w-2xl flex-col gap-0 rounded-3xl border-soft-mist bg-warm-white p-0 shadow-[0_24px_64px_rgba(26,26,26,0.08)]">
          <CardHeader className="gap-2 px-8 pt-8 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-paper-gold">
              GET A QUOTE · 询价
            </span>
            <CardTitle
              className="text-[clamp(24px,3.5vw,36px)] leading-tight text-ink-teal"
              style={{ fontFamily: SERIF_FONT }}
            >
              开始定制您的中国行程
            </CardTitle>
            <CardDescription className="text-sm text-charcoal/75">
              24h 内中英双语回复，一对一规划师答复您的所有问题
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8 pt-4">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2"
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="form-name" className="text-ink-teal">
                  你的名字
                </Label>
                <Input
                  id="form-name"
                  required
                  placeholder="例如：Alex Chen"
                  value={formData.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  className="h-11 rounded-xl border-soft-mist bg-white/60 px-3 text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="form-origin" className="text-ink-teal">
                  国家 / 城市
                </Label>
                <Input
                  id="form-origin"
                  required
                  placeholder="例如：San Francisco, USA"
                  value={formData.origin}
                  onChange={(e) => handleFormChange("origin", e.target.value)}
                  className="h-11 rounded-xl border-soft-mist bg-white/60 px-3 text-sm"
                />
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label className="text-ink-teal">心仪景区（多选）</Label>
                <div className="flex flex-wrap gap-2">
                  {AREA_OPTIONS.map((area) => {
                    const active = selectedAreas.includes(area);
                    return (
                      <Badge
                        key={area}
                        asChild
                        variant={active ? "default" : "outline"}
                        className={cn(
                          "h-auto cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                          active
                            ? "bg-cinnabar text-warm-white hover:bg-cinnabar/90"
                            : "border-ink-teal/30 bg-white/40 text-ink-teal hover:border-cinnabar",
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => toggleArea(area)}
                          aria-pressed={active}
                        >
                          {area}
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="form-month" className="text-ink-teal">
                  出行月份
                </Label>
                <Select
                  value={formData.month}
                  onValueChange={(v) => handleFormChange("month", v)}
                >
                  <SelectTrigger
                    id="form-month"
                    className="h-11 w-full rounded-xl border-soft-mist bg-white/60 px-3 text-sm"
                  >
                    <SelectValue placeholder="选择月份" />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-ink-teal">预算（人/全程）</Label>
                <RadioGroup
                  value={formData.budget}
                  onValueChange={(v) => handleFormChange("budget", v)}
                  className="grid grid-cols-2 gap-2"
                >
                  {BUDGETS.map((b) => (
                    <Label
                      key={b.value}
                      htmlFor={`budget-${b.value}`}
                      className={cn(
                        "flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border bg-white/60 px-3 text-xs font-medium transition-colors",
                        formData.budget === b.value
                          ? "border-cinnabar bg-cinnabar/10 text-cinnabar"
                          : "border-soft-mist text-charcoal/80 hover:border-cinnabar/40",
                      )}
                    >
                      <RadioGroupItem
                        id={`budget-${b.value}`}
                        value={b.value}
                        className="sr-only"
                      />
                      <span>{b.label}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="form-email" className="text-ink-teal">
                  Email
                </Label>
                <Input
                  id="form-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                  className="h-11 rounded-xl border-soft-mist bg-white/60 px-3 text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="form-wechat" className="text-ink-teal">
                  WeChat ID（可选）
                </Label>
                <Input
                  id="form-wechat"
                  placeholder="选填，方便快速联系"
                  value={formData.wechat}
                  onChange={(e) => handleFormChange("wechat", e.target.value)}
                  className="h-11 rounded-xl border-soft-mist bg-white/60 px-3 text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="h-auto w-full rounded-xl px-7 py-4 text-sm font-semibold shadow-sm transition-all hover:-translate-y-px hover:bg-cinnabar/90"
                >
                  {submitting ? "提交中…" : "提交询价 · 24h 内中英双语回复"}
                  <ArrowRight aria-hidden />
                </Button>
                <p className="mt-3 text-center text-xs text-charcoal/55">
                  我们绝不分享您的信息，提交即同意我们的隐私条款
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
        </section>
      </FadeContent>

      <FadeContent>
        <section
          id="faq"
          data-feedback-id="FAQ-01"
          data-workflow-node-id="faq"
          className="border-t border-soft-mist bg-warm-white py-16 lg:py-24"
        >
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-paper-gold">
                BEFORE YOU GO · 出行前须知
              </span>
              <h2
                className="mt-3 text-[clamp(28px,4vw,44px)] leading-tight text-ink-teal"
                style={{ fontFamily: SERIF_FONT }}
              >
                Things to Know Before Your Trip
              </h2>
            </div>

            <Accordion
              type="single"
              collapsible
              className="mt-12 divide-y divide-soft-mist border-y border-soft-mist"
            >
              <AccordionItem value="faq-1" className="border-0">
                <AccordionTrigger className="py-5 text-left text-lg font-medium text-ink-teal">
                  Do I need a visa to visit China?
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-charcoal/85">
                  For most travelers, the answer is simpler than it used to be. Citizens of more than fifty countries now enter China visa-free for short tourism stays, and most other passports qualify for the visa-free transit policy at major airports — entering through Beijing, Shanghai, Guangzhou, Chengdu, Xi&apos;an and other gateway cities for up to ten days while traveling onward. If neither route fits your itinerary, the standard tourist visa (L) takes about a week through your local Chinese consulate. We confirm the right entry path for your passport before any deposit, and we send you a single-page entry checklist tailored to your route.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-2" className="border-0">
                <AccordionTrigger className="py-5 text-left text-lg font-medium text-ink-teal">
                  Is China safe for solo and female travelers?
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-charcoal/85">
                  Yes — China is consistently rated among the safest large countries in Asia for visitors, including women traveling alone. Streets, metros and high-speed rail are well-lit, well-policed and unusually quiet at night, and tourist-facing staff in major cities increasingly speak working English. The everyday friction is logistical rather than physical: payment apps, ride-hailing, language at smaller restaurants. Every guest gets a 24/7 China-based contact line, an offline phrase card, and a pre-loaded local SIM with our number saved — so help is one tap away whether you are lost in a hutong or stuck at a ticket gate.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-3" className="border-0">
                <AccordionTrigger className="py-5 text-left text-lg font-medium text-ink-teal">
                  Is the price I see the price I pay?
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-charcoal/85">
                  Yes. Our quote is a single all-inclusive figure covering private guide, driver, vehicle, entrance tickets, intercity transport, hand-picked hotels, and the daily meals listed on your itinerary. We do not run optional shopping stops, commissioned jade or tea visits, or &ldquo;upgrade fees&rdquo; mid-trip — practices that quietly inflate cheaper packages. Tipping is not customary in mainland China and is never expected from our team; if you would like to thank a guide who went above and beyond, a small gesture at trip&apos;s end is welcome but never solicited.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-4" className="border-0">
                <AccordionTrigger className="py-5 text-left text-lg font-medium text-ink-teal">
                  Can you handle dietary restrictions, allergies or picky eaters?
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-charcoal/85">
                  Comfortably. Vegetarian, halal, gluten-free, nut-allergic and low-spice diets are all everyday requests for our planning team. Halal kitchens are common across China — Xi&apos;an&apos;s Muslim Quarter and Beijing&apos;s halal restaurants are itinerary highlights in their own right — and Buddhist vegetarian cuisine is a centuries-old tradition. We collect dietary notes during planning, brief every guide and restaurant in advance, and carry bilingual allergy cards for your wallet. Younger travelers and cautious palates eat well too: dumplings, noodles, Cantonese roast meats and northern flatbreads are crowd-pleasers we can lean into when needed.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-5" className="border-0">
                <AccordionTrigger className="py-5 text-left text-lg font-medium text-ink-teal">
                  How customizable is my itinerary?
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-charcoal/85">
                  Fully. Most of our guests travel as a private party of two to eight, which means pace, city order, hotel tier, and daily start time are yours to set. Want a slower three-day Beijing instead of two? An extra night in Suzhou for the gardens? A morning off after the Great Wall? All standard. We also build hybrid trips: classic icons (Forbidden City, Terracotta Army, Li River) paired with quieter China — tea villages in Yunnan, Hakka roundhouses in Fujian, the Silk Road outside Dunhuang. If you would prefer a small-group joining option, we run those too, capped at sixteen guests with no shopping detours.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-6" className="border-0">
                <AccordionTrigger className="py-5 text-left text-lg font-medium text-ink-teal">
                  What happens if I need to change or cancel my trip?
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-charcoal/85">
                  We work to make changes painless rather than punitive. Free date reshuffling is available up to thirty days before departure, and the deposit moves with you to the new dates at no additional fee. Inside thirty days, partial refunds follow a published schedule that we share with your booking confirmation — no fine-print surprises. For genuine force-majeure events (natural disasters, flight grounding, government travel suspensions), we refund all recoverable costs and waive our planning fee. Travel insurance is recommended for everything else; we are happy to point you toward providers our past guests have used without trouble.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </FadeContent>

      <footer
        data-feedback-id="FOOT-01"
        data-workflow-node-id="foot"
        className="bg-ink-teal py-16 text-warm-white"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-4">
          <div>
            <h3
              className="mb-3 text-xl text-warm-white"
              style={{ fontFamily: SERIF_FONT }}
            >
              Inbound China Tourism
            </h3>
            <p className="text-sm leading-relaxed opacity-80">
              Warm, premium, China-cultural-modern travel experiences for international guests.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-paper-gold">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#hero" className="opacity-90 transition-opacity hover:opacity-100 hover:text-paper-gold">
                  Map &amp; Destinations
                </a>
              </li>
              <li>
                <a href="#itineraries" className="opacity-90 transition-opacity hover:opacity-100 hover:text-paper-gold">
                  Itineraries
                </a>
              </li>
              <li>
                <a href="#pricing" className="opacity-90 transition-opacity hover:opacity-100 hover:text-paper-gold">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="opacity-90 transition-opacity hover:opacity-100 hover:text-paper-gold">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-paper-gold">
              Contact
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:hello@inbound-china.tourism"
                  className="opacity-90 transition-opacity hover:opacity-100 hover:text-paper-gold"
                >
                  hello@inbound-china.tourism
                </a>
              </li>
              <li className="opacity-60">WeChat: TBD</li>
              <li className="opacity-60">WhatsApp: TBD</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-paper-gold">
              Follow
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="opacity-90 transition-opacity hover:opacity-100 hover:text-paper-gold"
              >
                <Camera size={20} />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="opacity-90 transition-opacity hover:opacity-100 hover:text-paper-gold"
              >
                <Music size={20} />
              </a>
              <a
                href="#"
                aria-label="Xiaohongshu"
                className="opacity-90 transition-opacity hover:opacity-100 hover:text-paper-gold"
              >
                <BookOpen size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl border-t border-warm-white/20 px-6 pt-6 text-center text-xs opacity-60">
          &copy; 2026 Inbound China Tourism. All rights reserved.
        </div>
      </footer>
    </article>
  );
}

function TrustItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span aria-hidden className="flex items-center">
        {icon}
      </span>
      <span className="text-sm font-medium text-charcoal">{label}</span>
    </div>
  );
}

function LandmarkPortrait({
  landmark,
  hovered,
  active,
  onEnter,
  onLeave,
  onClick,
}: {
  landmark: Landmark;
  hovered: boolean;
  active: boolean;
  onEnter: (id: string) => void;
  onLeave: () => void;
  onClick: (id: string) => void;
}) {
  const big = hovered || active;
  const size = big ? 50 : 40;
  return (
    <foreignObject
      x={landmark.x - size / 2}
      y={landmark.y - size / 2}
      width={size}
      height={size}
      style={{ overflow: "visible" }}
    >
      <button
        type="button"
        className="block h-full w-full cursor-pointer rounded-full transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-cinnabar/40"
        onMouseEnter={() => onEnter(landmark.id)}
        onMouseLeave={onLeave}
        onFocus={() => onEnter(landmark.id)}
        onBlur={onLeave}
        onClick={() => onClick(landmark.id)}
        aria-label={`${landmark.zh} ${landmark.en} — ${landmark.tagline}`}
      >
        <span
          className={cn(
            "relative block h-full w-full overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-warm-white transition-all duration-300",
            active
              ? "shadow-[0_8px_24px_rgba(193,56,41,0.28)] ring-cinnabar"
              : hovered
                ? "ring-cinnabar"
                : "ring-paper-gold/70",
          )}
        >
          <Image
            src={`/landmarks/${landmark.id}.jpg`}
            alt=""
            fill
            sizes="60px"
            className="object-cover"
          />
        </span>
      </button>
    </foreignObject>
  );
}

function Popover({ landmark }: { landmark: Landmark }) {
  const popoverW = 280;
  const popoverH = 78;
  const flipLeft = landmark.x > 650;
  const dx = flipLeft ? -(popoverW + 30) : 30;

  return (
    <foreignObject
      x={landmark.x + dx}
      y={landmark.y - popoverH / 2}
      width={popoverW}
      height={popoverH + 10}
      style={{ overflow: "visible", pointerEvents: "none" }}
    >
      <div className="rounded-xl border border-soft-mist bg-warm-white p-3 shadow-[0_12px_32px_rgba(26,26,26,0.10)]">
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
              className="text-sm font-semibold leading-tight text-ink-teal"
              style={{ fontFamily: SERIF_FONT }}
            >
              {landmark.zh} {landmark.en}
            </h3>
            <p className="mb-2 text-[11px] leading-tight text-charcoal/60">{landmark.tagline}</p>
            <span className="text-[11px] font-semibold text-cinnabar">
              点击查看详情 →
            </span>
          </div>
        </div>
      </div>
    </foreignObject>
  );
}

function DetailPanel({
  landmark,
  detail,
  onClose,
}: {
  landmark: Landmark | null;
  detail: LandmarkDetail | null;
  onClose: () => void;
}) {
  if (!landmark || !detail) return null;

  const open = Boolean(landmark);

  return (
    <>
      {/* Desktop — inline Card under hero */}
      <FadeContent
        key={landmark.id}
        data-feedback-id="HERO-01-DETAIL"
        className="relative -mt-4 mb-12 hidden lg:block"
        duration={0.3}
        y={20}
        once={false}
        amount={0}
      >
        <Card className="relative gap-0 rounded-3xl border-soft-mist bg-warm-white p-8 py-0 shadow-[0_24px_64px_rgba(26,26,26,0.08)] ring-0">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={onClose}
            aria-label="关闭详情"
            className="absolute right-5 top-5 h-9 w-9 rounded-full border-soft-mist bg-warm-white text-ink-teal hover:bg-soft-mist hover:text-ink-teal"
          >
            <X />
          </Button>

          <div className="grid gap-8 lg:grid-cols-[2fr_3fr]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={`/landmarks/${landmark.id}.jpg`}
                alt={`${landmark.zh} ${landmark.en}`}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>

            <DetailBody landmark={landmark} detail={detail} />
          </div>
        </Card>
      </FadeContent>

      {/* Mobile — Sheet from bottom */}
      <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
        <SheetContent
          side="bottom"
          className="lg:hidden max-h-[90vh] overflow-y-auto rounded-t-3xl border-soft-mist bg-warm-white p-6"
        >
          <SheetHeader className="p-0">
            <SheetTitle className="sr-only">
              {landmark.zh} {landmark.en}
            </SheetTitle>
            <SheetDescription className="sr-only">{detail.emotionLine}</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={`/landmarks/${landmark.id}.jpg`}
                alt={`${landmark.zh} ${landmark.en}`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <DetailBody landmark={landmark} detail={detail} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

function DetailBody({
  landmark,
  detail,
}: {
  landmark: Landmark;
  detail: LandmarkDetail;
}) {
  return (
    <div className="flex flex-col gap-4 lg:gap-5">
      <CardHeader className="gap-2 px-0">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-paper-gold">
          {landmark.en}
        </span>
        <CardTitle
          className="text-[clamp(28px,5vw,48px)] leading-tight text-ink-teal"
          style={{ fontFamily: SERIF_FONT }}
        >
          {landmark.zh}
        </CardTitle>
        <CardDescription className="text-base font-medium text-charcoal/80">
          {detail.emotionLine}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-5 px-0">
        <p className="text-[15px] leading-relaxed text-charcoal/75">{detail.intro}</p>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-paper-gold">
            周边美食
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {detail.food.map((f) => (
              <div
                key={f.name}
                className="rounded-lg border border-soft-mist bg-white/40 px-3 py-2 text-sm"
              >
                <div className="font-medium text-ink-teal">{f.name}</div>
                <div className="text-[11px] text-charcoal/55">{f.tag}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="min-w-[180px] flex-1">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-paper-gold">
              人文标签
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {detail.culture.map((c) => (
                <Badge
                  key={c}
                  variant="outline"
                  className="rounded-full border-ink-teal/30 bg-transparent px-3 py-1 text-xs font-normal text-ink-teal"
                >
                  {c}
                </Badge>
              ))}
            </div>
          </div>

          <div className="min-w-[180px] flex-1">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-paper-gold">
              基础设施
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              {detail.infra.map((i) => (
                <li key={i.label} className="flex items-center gap-2 text-charcoal/80">
                  <span className="text-paper-gold">{i.icon}</span>
                  <span>{i.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mt-2 bg-soft-mist" />

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            size="lg"
            className="h-auto rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-px hover:bg-cinnabar/90"
          >
            把这里加进我的行程
            <Plus />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-auto rounded-xl border-ink-teal bg-transparent px-6 py-3 text-sm font-semibold text-ink-teal transition-all hover:-translate-y-px hover:bg-ink-teal/5 hover:text-ink-teal"
          >
            和我聊聊这里
          </Button>
        </div>
      </CardContent>
    </div>
  );
}
