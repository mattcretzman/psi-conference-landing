import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const landingMessages = pgTable("landing_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  organization: text("organization"),
  message: text("message").notNull(),
  intent: text("intent").notNull(),
  source: text("source"),
});

export const insertLandingMessageSchema = createInsertSchema(landingMessages).omit({ id: true });

export type InsertLandingMessage = z.infer<typeof insertLandingMessageSchema>;
export type LandingMessage = typeof landingMessages.$inferSelect;
