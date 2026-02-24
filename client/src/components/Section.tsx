import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

type SectionProps = React.PropsWithChildren<{
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  innerClassName?: string;
  rightSlot?: React.ReactNode;
}>;

export function Section(props: SectionProps) {
  return (
    <section id={props.id} className={cn("relative scroll-mt-24", props.className)}>
      <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20", props.innerClassName)}>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            {props.eyebrow ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-semibold text-muted-foreground shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="uppercase tracking-[0.18em]">{props.eyebrow}</span>
              </div>
            ) : null}
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-3xl md:text-4xl font-extrabold leading-[1.05]"
            >
              {props.title}
            </motion.h2>
            {props.subtitle ? (
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 text-base md:text-lg text-muted-foreground leading-relaxed"
              >
                {props.subtitle}
              </motion.p>
            ) : null}
          </div>
          {props.rightSlot ? <div className="md:pb-1">{props.rightSlot}</div> : null}
        </div>
        <div className="mt-10">{props.children}</div>
      </div>
    </section>
  );
}
