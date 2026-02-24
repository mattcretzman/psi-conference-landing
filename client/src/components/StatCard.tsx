import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function StatCard(props: {
  label: string;
  value: string;
  icon: React.ReactNode;
  accent?: "navy" | "red" | "teal" | "gold";
  className?: string;
  testId: string;
}) {
  const accent =
    props.accent === "red" ? "from-accent/20 to-accent/5"
    : props.accent === "teal" ? "from-[hsl(192_85%_42%)]/18 to-[hsl(192_85%_42%)]/5"
    : props.accent === "gold" ? "from-[hsl(42_92%_55%)]/20 to-[hsl(42_92%_55%)]/5"
    : "from-primary/18 to-primary/5";

  return (
    <motion.div
      data-testid={props.testId}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-lift transition-all duration-300", props.className)}
    >
      <div className={cn("absolute inset-0 opacity-80 bg-gradient-to-br", accent)} />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="text-3xl md:text-4xl font-extrabold leading-none">{props.value}</div>
          <div className="mt-2 text-sm text-muted-foreground font-semibold">{props.label}</div>
        </div>
        <div className="rounded-2xl border border-border bg-card/70 p-3 shadow-sm">
          <div className="text-foreground/85">{props.icon}</div>
        </div>
      </div>
    </motion.div>
  );
}
