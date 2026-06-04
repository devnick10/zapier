import z from "zod";

export const HookSchema = z.object({
    userId: z.string(),
    zapId: z.string()
})
export const HookBodySchema = z.object({
    metadata: z.json()
});