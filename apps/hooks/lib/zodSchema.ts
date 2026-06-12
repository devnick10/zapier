import z from "zod";

export const HookSchema = z.object({
    userId: z.string(),
    zapId: z.string()
})
export const HookBodySchema = z.record(z.any(), z.any()).optional()