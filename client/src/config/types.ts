/** PSI Conference Landing – Config Type */

export interface ConferenceConfig {
  slug: string;
  event: {
    name: string;
    shortName: string;
    dates: string;
    location: string;
    venue?: string;
    boothNumber?: string;
    conferenceUrl?: string;
  };
  team: { name: string; title: string; email?: string }[];
  hero: {
    chip: string;
    headline: string;
    subheadline: string;
    primaryCta: { label: string; scrollTo: string };
    secondaryCta: { label: string; scrollTo: string };
  };
  stats: { label: string; value: string; accent: "navy" | "red" | "teal" | "gold" }[];
  features: { title: string; description: string; icon: string }[];
  positions: { region: string; program: string; locations: string[]; salaryRange: string }[];
  requirements: string[];
  form: {
    heading: string;
    subtitle: string;
    privacyNote: string;
    intents: { value: string; title: string; subtitle: string; icon: string }[];
    messagePlaceholders: Record<string, string>;
  };
  footerLinks: { label: string; href: string; icon: string }[];
  seo: { title: string; description: string; ogImage?: string };
  webhookUrl: string;
}
