import React from "react";
import { motion } from "motion/react";
import { TimelineEvent } from "@/lib/history-timeline/data/events";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/history-timeline/ui/card";
import { Badge } from "@/components/history-timeline/ui/badge";

interface TimelineEventProps {
  event: TimelineEvent;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export function TimelineEventCard({ event, index, isExpanded, onToggle }: TimelineEventProps) {
  const isEven = index % 2 === 0;

  const displayYear = event.year < 0 ? `${Math.abs(event.year)} BC` : `${event.year} AD`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative flex items-center justify-between md:justify-normal w-full mb-16 ${
        isEven ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      {/* Spacer for desktop */}
      <div className="hidden md:block w-1/2 px-8"></div>

      {/* Node */}
      <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transform -translate-x-1/2 z-10 hover:scale-150 transition-transform cursor-pointer" onClick={onToggle} />

      {/* Line to card */}
      <div className={`hidden md:block absolute top-1/2 w-8 h-[2px] bg-primary/20 ${isEven ? "left-1/2" : "right-1/2"}`} />

      {/* Content */}
      <div className="w-full pl-8 md:pl-0 md:w-1/2 md:px-8">
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-primary/10 hover:border-primary/30 ${isExpanded ? "ring-2 ring-primary/20" : ""}`}
          onClick={onToggle}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center mb-2">
              <span className="font-display font-bold text-xl text-primary">{displayYear}</span>
              <div className="flex gap-2">
                <Badge variant="secondary" className="font-serif text-xs">{event.category}</Badge>
                <Badge variant="outline" className="font-serif text-xs opacity-70">{event.region}</Badge>
              </div>
            </div>
            <CardTitle className="font-display text-2xl font-bold text-foreground">{event.title}</CardTitle>
          </CardHeader>
          
          <motion.div 
            initial={false}
            animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
            className="overflow-hidden"
          >
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {event.description}
              </p>
            </CardContent>
          </motion.div>
        </Card>
      </div>
    </motion.div>
  );
}
