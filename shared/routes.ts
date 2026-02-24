import { z } from "zod";
import { insertLandingMessageSchema } from "./schema";

export const errorSchemas = {
  validation: z.object({ message: z.string(), field: z.string().optional() }),
  notFound: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
};

export const api = {
  landing: {
    message: {
      create: {
        method: "POST" as const,
        path: "/api/landing/messages",
        input: insertLandingMessageSchema.extend({
          email: z.string().email(),
          intent: z.enum(["general_interest", "open_positions", "schedule_meeting"]),
          name: z.string().min(1),
          message: z.string().min(1),
        }),
        responses: {
          201: z.object({ id: z.number() }),
          400: errorSchemas.validation,
        },
      },
    },
  },
};

export type CreateLandingMessageInput = z.infer<typeof api.landing.message.create.input>;
export type CreateLandingMessageResponse = z.infer<typeof api.landing.message.create.responses[201]>;
export type ValidationError = z.infer<typeof errorSchemas.validation>;
