import { ExternalLink, ShieldCheck, Briefcase, Building2, HeartHandshake } from "lucide-react";
import { useConference } from "@/config";

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  ExternalLink, ShieldCheck, Briefcase, Building2, HeartHandshake,
};

function IconFor({ name, className }: { name: string; className?: string }) {
  const Comp = ICON_MAP[name] ?? ExternalLink;
  return <Comp className={className} />;
}

export function Footer() {
  const conf = useConference();
  return (
    <footer className="border-t border-border bg-card" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="text-lg font-extrabold">Planned Systems International (PSI)</div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              35+ years supporting federal agencies and military programs.
              <br />
              <span className="font-semibold text-foreground/85">Cognito Systems Joint Venture Partner</span>
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="text-sm font-extrabold">Links</div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {conf.footerLinks.map((l) => (
                <a
                  key={l.href + l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold shadow-sm hover:-translate-y-0.5 hover:shadow-soft transition-all duration-200 focus-premium"
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="text-accent"><IconFor name={l.icon} className="h-4 w-4" /></span>
                    <span>{l.label}</span>
                  </span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-border pt-8">
          <div className="text-xs text-muted-foreground">\u00a9 {new Date().getFullYear()} Planned Systems International. All rights reserved.</div>
          <a href="mailto:careers@plan-sys.com" className="text-xs font-semibold text-foreground/80 hover:text-foreground transition-colors">careers@plan-sys.com</a>
        </div>
      </div>
    </footer>
  );
}
