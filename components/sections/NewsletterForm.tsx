"use client";

import { useState, type FormEvent } from "react";
import { CTAPrimary } from "@/components/atoms/CTAGhost";

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDone(true);
  };
  if (done) {
    return (
      <p className="text-[12px] font-misans-regular text-soft-ivory/75 leading-relaxed">
        ✓ 收到 · 下次月报上线时通知你。
      </p>
    );
  }
  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmit}>
      <input
        type="email"
        required
        placeholder="you@example.com"
        className="bg-transparent border-b border-soft-ivory/15 py-2 text-[13px] text-soft-ivory placeholder:text-soft-ivory/35 focus:outline-none focus:border-alpine-blue/60"
      />
      <CTAPrimary type="submit" className="h-9 px-4 text-[12px]">
        Subscribe
      </CTAPrimary>
    </form>
  );
}
