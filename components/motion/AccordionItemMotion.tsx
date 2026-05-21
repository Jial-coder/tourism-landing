'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Children, type ReactNode } from 'react';

interface AccordionItemMotionProps {
  children: ReactNode;
  className?: string;
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

export function AccordionItemMotion({ children, className }: AccordionItemMotionProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {Children.map(children, (child, idx) => (
        <motion.div key={idx} variants={childVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default AccordionItemMotion;

