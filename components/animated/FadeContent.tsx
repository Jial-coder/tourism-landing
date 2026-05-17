"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

type FadeContentProps = HTMLMotionProps<"div"> & {
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  amount?: number;
};

const EASE = [0.4, 0, 0.2, 1] as const;

export function FadeContent({
  children,
  className,
  delay = 0,
  duration = 0.6,
  y = 20,
  once = true,
  amount = 0.2,
  ...rest
}: FadeContentProps) {
  const reduce = useReducedMotion();

  const initial = reduce ? { opacity: 0 } : { opacity: 0, y };
  const animate = reduce ? { opacity: 1 } : { opacity: 1, y: 0 };
  const finalDuration = reduce ? 0.3 : duration;

  return (
    <motion.div
      className={cn(className)}
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount }}
      transition={{ duration: finalDuration, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
