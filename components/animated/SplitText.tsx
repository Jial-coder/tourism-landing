"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useMemo } from "react";

import { cn } from "@/lib/utils";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3";
  once?: boolean;
};

const EASE = [0.4, 0, 0.2, 1] as const;

export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  duration = 0.3,
  as = "span",
  once = true,
}: SplitTextProps) {
  const reduce = useReducedMotion();

  const characters = useMemo(() => Array.from(text), [text]);

  const Tag = motion[as];

  if (reduce) {
    return (
      <Tag
        className={cn("inline-block", className)}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once }}
        transition={{ duration: 0.3, ease: EASE, delay }}
      >
        {text}
      </Tag>
    );
  }

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: EASE },
    },
  };

  return (
    <Tag
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      aria-label={text}
    >
      {characters.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          variants={child}
          className="inline-block"
          aria-hidden
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </Tag>
  );
}
