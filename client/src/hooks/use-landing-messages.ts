import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type CreateLandingMessageInput } from "@shared/routes";
import { z } from "zod";

function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function useCreateLandingMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateLandingMessageInput) => {
      const validated = parseWithLogging(api.landing.message.create.input, data, "landing.message.create.input");
      const res = await fetch(api.landing.message.create.path, {
        method: api.landing.message.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      if (!res.ok) {
        if (res.status === 400) {
          const err = parseWithLogging(api.landing.message.create.responses[400], await res.json(), "400");
          throw new Error(err.field ? `${err.field}: ${err.message}` : err.message);
        }
        const text = await res.text().catch(() => "");
        throw new Error(text || "Failed to submit message");
      }
      return parseWithLogging(api.landing.message.create.responses[201], await res.json(), "201");
    },
    onSuccess: async () => { await queryClient.invalidateQueries(); },
  });
}
