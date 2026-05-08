import React from "react";
import { motion } from "motion/react";
import { Era } from "@/lib/history-timeline/data/events";

interface EraDividerProps {
  era: Era;
}

export function EraDivider({ era, id }: EraDividerProps & { id?: string }) {
  return (
    <motion.div 
      id={id}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex items-center justify-center w-full my-24 relative"
    >
      <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="bg-background px-8 py-4 border-2 border-primary/30 rounded-sm relative z-10 flex flex-col items-center">
        <span className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Entering</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary tracking-wide text-center">
          {era}
        </h2>
      </div>
    </motion.div>
  );
}
