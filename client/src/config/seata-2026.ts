import type { ConferenceConfig } from "./types";

export const seata2026: ConferenceConfig = {
  slug: "seata-2026",
  event: {
    name: "SEATA Clinical Symposium & Members Meeting",
    shortName: "SEATA 2026",
    dates: "Feb 5\u20137, 2026",
    location: "Atlanta, GA",
    venue: "Atlanta Convention Center",
    boothNumber: "Booth #12",
    conferenceUrl: "https://www.seata.org/annualmeeting",
  },
  team: [
    { name: "Greg LaDue", title: "Director of Talent Acquisition", email: "gladue@plan-sys.com" },
    { name: "Carola Ammer", title: "HR Business Partner", email: "cammer@plan-sys.com" },
  ],
  hero: {
    chip: "SEATA 2026",
    headline: "Your Athletic Training Career Starts with Cognito Systems",
    subheadline: "Join Cognito Systems, a PSI joint venture, at SEATA and discover 200+ athletic trainer positions supporting military readiness at 20+ installations nationwide.",
    primaryCta: { label: "View Open Positions", scrollTo: "positions" },
    secondaryCta: { label: "Connect With Us", scrollTo: "contact" },
  },
  stats: [
    { label: "Years Supporting Federal Programs", value: "35+", accent: "navy" },
    { label: "Athletic Trainer Positions", value: "200+", accent: "mint" },
    { label: "Military Installations", value: "20+", accent: "teal" },
    { label: "Active Programs", value: "2", accent: "gold" },
  ],
  features: [
    { title: "Competitive Federal Benefits", description: "Comprehensive health insurance, retirement plans, paid time off, and federal holiday schedules that respect your work-life balance.", icon: "Shield" },
    { title: "Career Growth & Stability", description: "Long-term contract stability with clear advancement paths. Cognito Systems has supported military health programs backed by PSI's 35+ year track record.", icon: "TrendingUp" },
    { title: "Mission-Driven Work", description: "Directly support soldier readiness through the Army H2F and Marine Corps SMIP programs \u2014 meaningful work with real impact.", icon: "Heart" },
    { title: "Nationwide Opportunities", description: "Choose from 20+ military installations across the country. Relocate to where you want to live and grow your career.", icon: "MapPin" },
  ],
  positions: [
    { region: "Southeast", program: "H2F", locations: ["Fort Moore, GA", "Fort Liberty, NC", "Fort Campbell, KY"], salaryRange: "$65K\u2013$85K" },
    { region: "Southwest", program: "H2F", locations: ["Fort Cavazos, TX", "Fort Bliss, TX", "Fort Huachuca, AZ"], salaryRange: "$65K\u2013$85K" },
    { region: "West", program: "H2F", locations: ["JBLM, WA", "Fort Irwin, CA", "Fort Carson, CO"], salaryRange: "$70K\u2013$90K" },
    { region: "East", program: "H2F", locations: ["Fort Drum, NY", "Fort Stewart, GA", "Fort Johnson, LA"], salaryRange: "$65K\u2013$85K" },
    { region: "Pacific", program: "H2F", locations: ["Schofield Barracks, HI"], salaryRange: "$75K\u2013$95K" },
    { region: "Marine Corps", program: "SMIP", locations: ["Camp Pendleton, CA", "Camp Lejeune, NC", "MCB Quantico, VA"], salaryRange: "$65K\u2013$85K" },
  ],
  requirements: [
    "BOC-certified Athletic Trainer (ATC)",
    "State licensure (or eligibility) in the position's state",
    "Bachelor's degree in Athletic Training or related field",
    "CPR/AED certification (current)",
    "Ability to pass a federal background check",
    "U.S. citizenship or permanent residency",
  ],
  form: {
    heading: "Send a quick note",
    subtitle: "Choose your intent and we'll route your message to the right Cognito Systems team member attending SEATA.",
    privacyNote: "By submitting, you agree Cognito Systems may contact you about career opportunities and event coordination.",
    intents: [
      { value: "general_interest", title: "General Interest", subtitle: "Learn more about our careers", icon: "Sparkles" },
      { value: "open_positions", title: "Open Positions", subtitle: "Get matched quickly", icon: "Briefcase" },
    ],
    messagePlaceholders: {
      general_interest: "Tell us what you're interested in learning about our military AT programs.",
      open_positions: "Tell us your preferred locations (state/base) and availability.",
    },
  },
  footerLinks: [
    { label: "H2F Program", href: "https://www.athletictrainerjob.com/", icon: "ShieldCheck" },
    { label: "SMIP Program", href: "https://www.athletictrainerjob.com/", icon: "HeartHandshake" },
    { label: "Careers", href: "https://www.athletictrainerjob.com/job-description", icon: "Briefcase" },
    { label: "About Cognito Systems", href: "https://www.athletictrainerjob.com/", icon: "Building2" },
    { label: "SEATA Annual Meeting", href: "https://www.seata.org/annualmeeting", icon: "ExternalLink" },
  ],
  seo: {
    title: "Cognito Systems at SEATA 2026 \u2014 Athletic Trainer Careers in Military Health",
    description: "Visit Cognito Systems, a PSI joint venture, at SEATA 2026 in Atlanta. Explore 200+ athletic trainer positions supporting Army H2F and Marine Corps SMIP programs.",
  },
  webhookUrl: "https://services.leadconnectorhq.com/hooks/Sram42lXCWRs4rqxkSaz/webhook-trigger/aBiWxiHtD9OTSCVb8j2a",
};
