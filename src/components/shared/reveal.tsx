"use client";

import { type ReactNode, type ElementType } from "react";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

interface RevealProps extends Omit<HTMLMotionProps<"div">, "as"> {
  as?: ElementType;
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  amount?: number;
  duration?: number;
  className?: string;
}

const makeRich = (y: number, duration: number, delay: number): Variants => ({
  hidden: { opacity: 0, y, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
  },
});

const makeLite = (y: number, duration: number, delay: number): Variants => ({
  hidden: { opacity: 0, y: y * 0.6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration * 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  },
});

export function Reveal({
  children,
  delay = 0,
  y = 24,
  once = true,
  amount = 0.25,
  duration = 0.9,
  className,
  ...rest
}: RevealProps) {
  // Skip blur filter on mobile / reduced motion — it's the most expensive part
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reducedMotion = usePrefersReducedMotion();
  const lite = !isDesktop || reducedMotion;

  return (
    <motion.div
      variants={lite ? makeLite(y, duration, delay) : makeRich(y, duration, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function StaggerContainer({
  children,
  className,
  amount = 0.2,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}
