import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useCreateLandingMessage } from "@/hooks/use-landing-messages";
import { useConference } from "@/config";
import { Send, CheckCircle2, Loader2, Sparkles, Briefcase, MessageSquare, Info } from "lucide-react";

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = { Sparkles, Briefcase, MessageSquare, Info };
function IconFor({ name, className }: { name: string; className?: string }) {
  const Comp = ICON_MAP[name] ?? Sparkles;
  return <Comp className={className} />;
}

export function ContactForm() {
  const conf = useConference();
  const { toast } = useToast();
  const mutation = useCreateLandingMessage();
  const defaultIntent = conf.form.intents[0]?.value ?? "general_interest";
  const [selectedIntent, setSelectedIntent] = useState(defaultIntent);
  const [submitted, setSubmitted] = useState(false);

  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Valid email required"),
    organization: z.string().optional(),
    message: z.string().min(1, "Message is required"),
    intent: z.string(),
  });
  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", organization: "", message: "", intent: defaultIntent },
  });

  async function onSubmit(data: FormValues) {
    try {
      await mutation.mutateAsync({ ...data, intent: selectedIntent } as any);
      setSubmitted(true);
      toast({ title: "Message sent!", description: "We'll be in touch soon." });
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    }
  }

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="rounded-full bg-green-500/15 p-4"><CheckCircle2 className="h-10 w-10 text-green-500" /></div>
        <div className="text-2xl font-extrabold">Thanks for reaching out!</div>
        <p className="text-muted-foreground max-w-md">
          Our recruiting team will follow up with you shortly. In the meantime, check out open positions on{" "}
          <a href="https://www.athletictrainerjob.com" target="_blank" rel="noreferrer" className="text-accent underline underline-offset-2">athletictrainerjob.com</a>.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-2 space-y-3">
        <div className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">What are you interested in?</div>
        {conf.form.intents.map((intent) => {
          const active = selectedIntent === intent.value;
          return (
            <button
              key={intent.value}
              type="button"
              onClick={() => { setSelectedIntent(intent.value); form.setValue("intent", intent.value); }}
              className={cn("w-full text-left rounded-2xl border p-4 transition-all duration-200", active ? "border-accent bg-accent/8 shadow-glow-red/10" : "border-border bg-card hover:bg-muted/60")}
            >
              <div className="flex items-start gap-3">
                <div className={cn("rounded-xl p-2 transition-colors", active ? "bg-accent/15 text-accent" : "bg-muted text-muted-foreground")}>
                  <IconFor name={intent.icon} className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-sm">{intent.title}</div>
                  <div className="text-xs text-muted-foreground">{intent.subtitle}</div>
                </div>
              </div>
            </button>
          );
        })}
        {conf.team.length > 0 && (
          <div className="rounded-2xl border border-border bg-card/70 p-4 mt-4">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Team at {conf.event.shortName}</div>
            {conf.team.map((member) => (
              <div key={member.name} className="flex items-center gap-3 py-2">
                <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary">{member.name.split(" ").map((n) => n[0]).join("")}</div>
                <div>
                  <div className="text-sm font-semibold">{member.name}</div>
                  <div className="text-xs text-muted-foreground">{member.title}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {conf.event.boothNumber && (
          <div className="rounded-2xl border border-border bg-card/70 p-4">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">Find Us</div>
            <div className="text-sm font-bold">{conf.event.boothNumber}</div>
            <div className="text-xs text-muted-foreground">{conf.event.venue}</div>
          </div>
        )}
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="lg:col-span-3 space-y-5">
        <AnimatePresence mode="wait">
          <motion.div key={selectedIntent} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5">Full Name *</label>
                <input {...form.register("name")} placeholder="Jane Smith" className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition" />
                {form.formState.errors.name && <p className="text-xs text-red-500 mt-1">{form.formState.errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Email *</label>
                <input {...form.register("email")} type="email" placeholder="jane@example.com" className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition" />
                {form.formState.errors.email && <p className="text-xs text-red-500 mt-1">{form.formState.errors.email.message}</p>}
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold mb-1.5">Organization (optional)</label>
              <input {...form.register("organization")} placeholder="University, clinic, etc." className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition" />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold mb-1.5">Message *</label>
              <textarea {...form.register("message")} rows={4} placeholder={conf.form.messagePlaceholders[selectedIntent] ?? "Tell us how we can help."} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition resize-none" />
              {form.formState.errors.message && <p className="text-xs text-red-500 mt-1">{form.formState.errors.message.message}</p>}
            </div>
            <p className="text-xs text-muted-foreground mt-3">{conf.form.privacyNote}</p>
            <button type="submit" disabled={mutation.isPending} className="mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white shadow-glow-red hover:brightness-110 transition disabled:opacity-50">
              {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Send Message
            </button>
          </motion.div>
        </AnimatePresence>
      </form>
    </div>
  );
}
