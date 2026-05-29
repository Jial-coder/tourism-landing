"use client";

import { CTAPrimary } from "@/components/atoms/CTAGhost";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function NewsletterForm() {
  const { locale } = useLocale();

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[12px] font-misans-regular text-soft-ivory/65 leading-relaxed">
        {locale === "zh"
          ? "月报订阅会在邮件系统接入后开放；现在可先把通知需求发给顾问。"
          : "Monthly updates open after the email system is connected. For now, send a notification request to the advisor."}
      </p>
      <CTAPrimary href="/plan?intent=newsletter" className="h-9 px-4 text-[12px]">
        {locale === "zh" ? "请求上线通知" : "Request updates"}
      </CTAPrimary>
    </div>
  );
}
