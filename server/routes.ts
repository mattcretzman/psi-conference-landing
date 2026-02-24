import type { Express } from "express";
import { api } from "@shared/routes";
import { storage } from "./storage";

const GHL_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/Sram42lXCWRs4rqxkSaz/webhook-trigger/aBiWxiHtD9OTSCVb8j2a";

export function registerRoutes(app: Express) {
  app.post(api.landing.message.create.path, async (req, res) => {
    const parsed = api.landing.message.create.input.safeParse(req.body);
    if (!parsed.success) {
      const first = parsed.error.errors[0];
      return res.status(400).json({ message: first?.message ?? "Invalid input", field: first?.path?.join(".") });
    }
    try {
      const row = await storage.createLandingMessage({ ...parsed.data, source: (req.body as any).source ?? null });
      fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, source: (req.body as any).source ?? "unknown" }),
      }).catch((err) => console.error("[GHL webhook]", err));
      return res.status(201).json({ id: row.id });
    } catch (err: any) {
      console.error("[POST /api/landing/messages]", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
}
