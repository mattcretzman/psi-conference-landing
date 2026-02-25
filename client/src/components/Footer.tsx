import { ExternalLink, ShieldCheck, Briefcase, Building2, HeartHandshake } from "lucide-react";
import { useConference } from "@/config";

const PSI_LOGO_URL = "https://cdn.prod.website-files.com/67f72b8d5671c8c060f0b827/68256ac657e731a25c6eff49_White_PSI_Logo.webp";

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
    <footer className="bg-[hsl(var(--psi-navy))] text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <img src={PSI_LOGO_URL} alt="PSI Logo" className="h-10 w-auto mb-4" />
            <div className="text-lg font-extrabold text-white">Cognito Systems</div>
            <p className="mt-2 text-sm text-white/60 leading-relaxed">
              A Planned Systems International (PSI) Joint Venture
              <br />
              35+ years supporting federal agencies and military programs.
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="text-sm font-extrabold text-white/80">Links</div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {conf.footerLinks.map((l) => (
                <a
                  key={l.href + l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200 focus-premium"
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="text-[hsl(var(--psi-mint))]"><IconFor name={l.icon} className="h-4 w-4" /></span>
                    <span>{l.label}</span>
                  </span>
                  <ExternalLink className="h-4 w-4 text-white/40 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-white/10 pt-8">
          <div className="text-xs text-white/50">\u00a9 {new Date().getFullYear()} Cognito Systems, a PSI Joint Venture. All rights reserved.</div>
          <a href="mailto:careers@plan-sys.com" className="text-xs font-semibold text-white/70 hover:text-white transition-colors">careers@plan-sys.com</a>
        </div>
        <div className="mt-4 text-xs text-white/40 leading-relaxed max-w-3xl">
          Cognito Systems is a Mentor-Prot\u00e9g\u00e9 Joint Venture between Planned Systems International (PSI) and its partners. We are an Equal Opportunity Employer. All personnel decisions are made without regard to race, color, religion, age, sex, sexual orientation, gender identity, national origin, veteran status, disability, or any other characteristic protected by law.
        </div>
      </div>
    </footer>
  );
}
