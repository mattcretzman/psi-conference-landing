import { createContext, useContext } from "react";
import type { ConferenceConfig } from "./types";
import { seata2026 } from "./seata-2026";
import { maata2026 } from "./maata-2026";

export const conferences: Record<string, ConferenceConfig> = {
  "seata-2026": seata2026,
  "maata-2026": maata2026,
};

export function resolveConference(): ConferenceConfig {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("conf");
    if (slug && conferences[slug]) return conferences[slug];
  }
  const envSlug = import.meta.env.VITE_CONFERENCE as string | undefined;
  if (envSlug && conferences[envSlug]) return conferences[envSlug];
  const keys = Object.keys(conferences);
  return conferences[keys[keys.length - 1]];
}

export const ConferenceContext = createContext<ConferenceConfig | null>(null);

export function useConference(): ConferenceConfig {
  const ctx = useContext(ConferenceContext);
  if (!ctx) throw new Error("useConference must be used inside <ConferenceContext.Provider>");
  return ctx;
}

export type { ConferenceConfig };
