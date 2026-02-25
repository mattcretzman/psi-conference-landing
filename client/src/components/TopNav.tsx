import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { PsiButton } from "@/components/PsiButton";
import { CalendarDays, Briefcase, Sparkles, ArrowRight } from "lucide-react";
import { useConference } from "@/config";

const PSI_LOGO_URL = "https://cdn.prod.website-files.com/67f72b8d5671c8c060f0b827/68256ac657e731a25c6eff49_White_PSI_Logo.webp";

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
      { label: "Mission", href: "#why", testId: "nav-why", icon: <Sparkles className="h-4 w-4" /> },
      { label: "Positions", href: "#positions", testId: "nav-positions", icon: <Briefcase className="h-4 w-4" /> },
      { label: "Connect", href: "#contact", testId: "nav-contact", icon: <CalendarDays className="h-4 w-4" /> },
    ],
    [],
  );

  return (
    <header
      className={cn("fixed top-0 inset-x-0 z-50 transition-all duration-300", scrolled ? "py-2" : "py-3")}
      data-testid="topnav"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "rounded-2xl transition-all duration-300",
          scrolled
            ? "bg-[hsl(var(--psi-navy)/0.92)] backdrop-blur-md border border-white/10 shadow-lg"
            : "bg-[hsl(var(--psi-navy)/0.6)] backdrop-blur-sm border border-white/5"
        )}>
          <div className="flex items-center justify-between px-4 sm:px-5 py-3">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="group inline-flex items-center gap-3"
                data-testid="brand-home"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              >
                <img
                  src={PSI_LOGO_URL}
                  alt="PSI Logo"
                  className="h-8 w-auto"
                />
                <div className="leading-tight">
                  <div className="text-sm sm:text-[15px] font-extrabold tracking-tight text-white">Cognito Systems</div>
                  <div className="text-xs text-white/60">{conf.event.shortName} \u2022 {conf.event.location} \u2022 {conf.event.dates}</div>
                </div>
              </Link>
            </div>
            <nav className="hidden md:flex items-center gap-1">
              {items.map((it) => (
                <a
                  key={it.href}
                  href={it.href}
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                  data-testid={it.testId}
                  onClick={(e) => { e.preventDefault(); scrollToId(it.href.replace("#", "")); }}
                >
                  <span className="text-white/50">{it.icon}</span>
                  {it.label}
                </a>
              ))}
              <a
                href="https://www.athletictrainerjob.com/job-description"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                Careers
              </a>
            </nav>
            <div className="flex items-center gap-2">
              <PsiButton variant="secondary" size="sm" className="hidden sm:inline-flex" onClick={() => scrollToId("positions")} rightIcon={<ArrowRight className="h-4 w-4" />}>
                View Positions
              </PsiButton>
              <PsiButton variant="mint" size="sm" onClick={() => scrollToId("contact")} rightIcon={<ArrowRight className="h-4 w-4" />}>
                {conf.hero.secondaryCta.label}
              </PsiButton>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
