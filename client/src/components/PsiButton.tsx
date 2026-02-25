import * as React from "react";
import { cn } from "@/lib/utils";

type PsiButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "mint";
  size?: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export function PsiButton({ className, variant = "primary", size = "md", leftIcon, rightIcon, ...props }: PsiButtonProps) {
  const sizes = size === "sm" ? "h-10 px-4 text-sm rounded-xl" : size === "lg" ? "h-12 px-6 text-base rounded-2xl" : "h-11 px-5 text-sm md:text-[15px] rounded-2xl";
  const base = "group inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 ease-out focus-premium disabled:opacity-55 disabled:cursor-not-allowed disabled:transform-none";
  const variants: Record<NonNullable<PsiButtonProps["variant"]>, string> = {
    primary: "btn-sheen text-primary-foreground bg-[linear-gradient(135deg,hsl(var(--psi-navy)),hsl(var(--psi-navy)/0.86))] shadow-glow-navy hover:shadow-lift hover:-translate-y-0.5 active:translate-y-0 active:shadow-soft border border-primary/20",
    secondary: "bg-white/10 text-white border border-white/20 shadow-sm hover:-translate-y-0.5 hover:bg-white/15 active:translate-y-0",
    ghost: "bg-transparent text-foreground hover:bg-muted/70 active:bg-muted border border-transparent hover:border-border",
    mint: "btn-sheen text-[hsl(var(--psi-navy))] bg-[hsl(var(--psi-mint))] shadow-glow-mint hover:shadow-lift hover:-translate-y-0.5 active:translate-y-0 border border-[hsl(var(--psi-mint)/0.6)]",
  };
  return (
    <button className={cn(base, sizes, variants[variant], className)} {...props}>
      {leftIcon ? <span className="text-current/90">{leftIcon}</span> : null}
      <span>{props.children}</span>
      {rightIcon ? <span className="text-current/90 transition-transform duration-200 group-hover:translate-x-0.5">{rightIcon}</span> : null}
    </button>
  );
}
