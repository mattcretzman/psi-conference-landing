import { motion } from "framer-motion";
import { TopNav } from "@/components/TopNav";
import { Section } from "@/components/Section";
import { StatCard } from "@/components/StatCard";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { PsiButton } from "@/components/PsiButton";
import { useConference } from "@/config";
import {
  ArrowRight, Calendar, MapPin, Users,
  Shield, TrendingUp, Heart, Briefcase,
  Clock, CheckCircle2, DollarSign,
  Building2, Award, Star, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Shield, TrendingUp, Heart, MapPin, Briefcase, Calendar, Users, Clock, CheckCircle2, DollarSign, Building2, Award, Star, Zap,
};
function IconFor({ name, className }: { name: string; className?: string }) {
  const Comp = ICON_MAP[name] ?? Star;
  return <Comp className={className} />;
}

const STAT_ICONS = [
  <Clock className="h-6 w-6" />,
  <Users className="h-6 w-6" />,
  <MapPin className="h-6 w-6" />,
  <Briefcase className="h-6 w-6" />,
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function FeatureCard(props: { title: string; description: string; icon: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-lift transition-all duration-300"
    >
      <div className="rounded-xl bg-accent/10 p-3 w-fit"><IconFor name={props.icon} className="h-6 w-6 text-accent" /></div>
      <div className="mt-4 text-lg font-extrabold">{props.title}</div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{props.description}</p>
    </motion.div>
  );
}

function PositionCard(props: { region: string; program: string; locations: string[]; salaryRange: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-lift transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="text-lg font-extrabold">{props.region}</div>
        <span className={cn("rounded-full px-3 py-1 text-xs font-bold", props.program === "SMIP" ? "bg-[hsl(192_85%_42%)]/15 text-[hsl(192_85%_42%)]" : "bg-primary/12 text-primary")}>{props.program}</span>
      </div>
      <div className="mt-3 space-y-1.5">
        {props.locations.map((loc) => (
          <div key={loc} className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5 text-accent flex-shrink-0" />{loc}</div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm font-bold text-green-600"><DollarSign className="h-4 w-4" />{props.salaryRange}</div>
    </motion.div>
  );
}

function RequirementsList(props: { items: string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {props.items.map((req, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}
          className="flex items-start gap-3 rounded-xl border border-border bg-card/60 px-4 py-3">
          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
          <span className="text-sm font-medium">{req}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function Landing() {
  const conf = useConference();
  return (
    <div className="min-h-screen bg-background text-foreground grain">
      <Seo />
      <TopNav />
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/8 px-4 py-1.5 text-xs font-bold text-accent shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />{conf.hero.chip}
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">{conf.hero.headline}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">{conf.hero.subheadline}</motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 flex flex-wrap gap-3">
              <PsiButton variant="danger" size="lg" onClick={() => scrollToId(conf.hero.primaryCta.scrollTo)} rightIcon={<ArrowRight className="h-5 w-5" />}>{conf.hero.primaryCta.label}</PsiButton>
              <PsiButton variant="secondary" size="lg" onClick={() => scrollToId(conf.hero.secondaryCta.scrollTo)} rightIcon={<ArrowRight className="h-5 w-5" />}>{conf.hero.secondaryCta.label}</PsiButton>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-12 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm font-semibold shadow-sm"><Calendar className="h-4 w-4 text-accent" />{conf.event.dates}</div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm font-semibold shadow-sm"><MapPin className="h-4 w-4 text-accent" />{conf.event.location}</div>
            {conf.event.boothNumber && <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm font-semibold shadow-sm"><Building2 className="h-4 w-4 text-accent" />{conf.event.boothNumber}</div>}
          </motion.div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {conf.stats.map((stat, i) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} accent={stat.accent} icon={STAT_ICONS[i] ?? <Star className="h-6 w-6" />} testId={`stat-${i}`} />
          ))}
        </div>
      </section>
      <Section id="why" eyebrow="Why PSI" title="Built for Athletic Trainers Who Want More" subtitle="PSI offers the stability, benefits, and mission-driven work that sets military AT careers apart.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{conf.features.map((f) => <FeatureCard key={f.title} title={f.title} description={f.description} icon={f.icon} />)}</div>
      </Section>
      <Section id="positions" eyebrow="Open Positions" title="200+ Athletic Trainer Roles Nationwide" subtitle="Army H2F and Marine Corps SMIP positions at installations across the country. Competitive salaries with full federal benefits."
        rightSlot={<PsiButton variant="danger" size="sm" onClick={() => scrollToId("contact")} rightIcon={<ArrowRight className="h-4 w-4" />}>{conf.hero.secondaryCta.label}</PsiButton>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{conf.positions.map((p) => <PositionCard key={p.region} region={p.region} program={p.program} locations={p.locations} salaryRange={p.salaryRange} />)}</div>
      </Section>
      <Section id="requirements" eyebrow="Qualifications" title="What You'll Need" subtitle="Core requirements for PSI athletic trainer positions.">
        <RequirementsList items={conf.requirements} />
      </Section>
      <Section id="contact" eyebrow="Connect" title={conf.form.heading} subtitle={conf.form.subtitle}>
        <ContactForm />
      </Section>
      <Footer />
    </div>
  );
}
