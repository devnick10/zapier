import z from "zod";

export const SignupSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
})

export const SigninSchema = z.object({
    email: z.string(),
    password: z.string()
})

export const ZapSchema = z.object({
    triggerId: z.string(),
    triggerMetadata: z.any().optional(),
    actions: z.array(z.object({
        availableActionId: z.string(),
        actionMetadata: z.any().optional()
    }))
})

export const UpdateZapSchema = z.object({
    triggerId: z.string(),
    availableTriggerId: z.string(),
    triggerMetadata: z.any().optional(),
    actions: z.array(z.object({
        availableActionId: z.string(),
        actionMetadata: z.any().optional()
    }))
})

export const ZapIdSchema = z.string()

