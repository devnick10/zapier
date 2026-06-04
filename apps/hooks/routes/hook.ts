import { Router } from "express";
import { client } from "@repo/db";
import { HookBodySchema, HookSchema } from "../lib/zodSchema";

const router = Router()

router.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const params = HookSchema.safeParse(req.params)
    const body = HookBodySchema.safeParse(req.body)

    if (!params.success) {
        res.status(411).json({
            message: params.error
        })
        return
    }
    if (req.body.metadata && !body.success) {
        res.status(411).json({
            message: body.error
        })
        return
    }

    const { zapId } = params.data
    // @ts-ignore
    const { metadata } = body.data

    // store in db a new triger 
    await client.$transaction(async (txn) => {
        const zapRun = await txn.zapRun.create({
            data: {
                zapId,
                //@ts-ignore
                metadata
            }
        })
        await txn.zapRunOutbox.create({
            data: {
                zapRunId: zapRun.id
            }
        })
    })
    // push to queue kafka/redis
    res.status(200).json({ message: "webhook recieved" })
})

export { router }
