import { Router } from "express";
import { client } from "@repo/db";
import { HookBodySchema, HookSchema } from "../lib/zodSchema";

const router = Router()

router.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const parsedParams = HookSchema.safeParse(req.params)
    const parsedBody = HookBodySchema.safeParse(req.body)
    if (!parsedParams.success) {
        res.status(411).json({
            message: parsedParams.error
        })
        return
    }
    if (!parsedBody.success) {
        res.status(411).json({
            message: parsedBody.error
        })
        return
    }

    const { zapId } = parsedParams.data;
    const metadata = parsedBody.data;

    await client.$transaction(async (txn) => {
        const zapRun = await txn.zapRun.create({
            data: {
                zapId,
                metadata
            }
        })
        await txn.zapRunOutbox.create({
            data: {
                zapRunId: zapRun.id
            }
        })
    })

    res.status(200).json({ message: "webhook recieved" })
})

export { router }
