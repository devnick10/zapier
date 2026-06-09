import { client } from "@repo/db";
import type { Request, Response } from "express";
import { Router } from "express";
import { ZapIdSchema, ZapSchema } from "../lib/schema";
import { authMiddleware } from "../middlewares/auth.Middleware";

const router = Router();
router.use(authMiddleware)

router.get("/", async (req: Request, res: Response) => {
    const userId = req.userId;
    const zaps = await client.zap.findMany({
        where: { userId },
        include: {
            action: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    })
    res.status(200).json({ message: "Zap fetched", zaps: zaps || [] })
})

router.post("/", async (req: Request, res: Response) => {
    const userId = req.userId;
    const { success, data, error } = ZapSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({ message: error })
    }

    const result = await client.$transaction(async (txn) => {
        const zap = await txn.zap.create({
            data: {
                triggerId: data.triggerId,
                userId
            }
        })
        await txn.trigger.create({
            data: {
                zapId: zap.id,
                availableTriggerId: data.triggerId
            }
        })
        await txn.action.createMany({
            data: data.actions.map((a, i) => ({
                zapId: zap.id,
                availableActionId: a.availableActionId,
                sortingOrder: i
            }))
        })
        return true;
    })


    if (!result) {
        return res.status(500).json({ message: "Internal server error" })
    }

    res.status(201).json({ message: "Zap created." })
})

router.get("/:zapId", async (req: Request, res: Response) => {
    const userId = req.userId;
    const { success, data, error } = ZapIdSchema.safeParse(req.params.zapId);
    if (!success) {
        return res.status(411).json({ message: error })
    }

    const zap = await client.zap.findUnique({
        where: { id: data, userId },
        include: {
            action: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    })

    if (!zap) {
        res.status(404).json({ message: "Zap not found!" })
        return;
    }

    res.status(200).json({ message: "Zap fetched", zap })
})



export { router as zapRouter };
