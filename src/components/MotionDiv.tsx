"use client";
import React from "react";
import { motion } from "motion/react";
export default function MotionDiv({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{  translateY:100, opacity:0, transitionDuration:"5ms" }}
      animate={{ translateY: 0, opacity:1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
