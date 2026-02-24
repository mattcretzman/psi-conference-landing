import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { PsiButton } from "@/components/PsiButton";
import { CalendarDays, Briefcase, Sparkles, ArrowRight } from "lucide-react";
import { useConference } from "@/config";

type NavItem = { label: string; href: string; testId: string; icon: React.ReactNode };

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function TopNav() {
  const conf = useConference();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items: NavItem[] = useMemo(
    () => [
      { label: "Why PSI", href: "#why", testId: "nav-why", icon: <Sparkles className="h-4 w-4" /> },
      { label: "Open Positions", href: "#positions", testId: "nav-positions", icon: <Briefcase className="h-4 w-4" /> },
      { label: "Connect", href: "#contact", testId: "nav-contact", icon: <CalendarDays className="h-4 w-4" /> },
    ],
    [],
  );

  return (
    <header
      className={cn("fixed top-0 inset-x-0 z-50 transition-all duration-300", scrolled ? "py-3" : "py-4")}
      data-testid="topnav"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("rounded-2xl border border-border/60 shadow-soft grain transition-all duration-300", scrolled ? "glass" : "bg-card/60 backdrop-blur-md")}>
          <div className="flex items-center justify-between px-4 sm:px-5 py-3">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="group inline-flex items-center gap-2"
                data-testid="brand-home"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              >
                <div className="relative h-9 w-9 rounded-xl bg-[linear-gradient(135deg,hsl(var(--psi-navy)),hsl(var(--psi-navy)/0.78))] shadow-glow-navy">
                  <div className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-lg bg-[linear-gradient(135deg,hsl(var(--psi-red)),hsl(var(--psi-red)/0.78))] shadow-glow-red ring-1 ring-white/20" />
                </div>
                <div className="leading-tight">
                  <div className="text-sm sm:text-[15px] font-extrabold tracking-tight">Planned Systems International</div>
                  <div className="text-xs text-muted-foreground">{conf.event.shortName} \u2022 {conf.event.location} \u2022 {conf.event.dates}</div>
                </div>
              </Link>
            </div>
            <nav className="hidden md:flex items-center gap-1">
              {items.map((it) => (
                <a
                  key={it.href}
                  href={it.href}
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-foreground/90 hover:text-foreground hover:bg-muted/70 transition-all duration-200"
                  data-testid={it.testId}
                  onClick={(e) => { e.preventDefault(); scrollToId(it.href.replace("#", "")); }}
                >
                  <span className="text-foreground/70">{it.icon}</span>
                  {it.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <PsiButton variant="secondary" size="sm" className="hidden sm:inline-flex" onClick={() => scrollToId("positions")} rightIcon={<ArrowRight className="h-4 w-4" />}>View Positions</PsiButton>
              <PsiButton variant="danger" size="sm" onClick={() => scrollToId("contact")} rightIcon={<ArrowRight className="h-4 w-4" />}>{conf.hero.secondaryCta.label}</PsiButton>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
