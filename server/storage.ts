import { db } from "./db";
import { landingMessages, type InsertLandingMessage, type LandingMessage } from "@shared/schema";

export interface IStorage {
  createLandingMessage(message: InsertLandingMessage): Promise<LandingMessage>;
}

export const storage: IStorage = {
  async createLandingMessage(message: InsertLandingMessage): Promise<LandingMessage> {
    const [row] = await db.insert(landingMessages).values(message).returning();
    return row;
  },
};
