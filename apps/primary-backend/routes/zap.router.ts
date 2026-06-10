import { client } from "@repo/db";
import type { Request, Response } from "express";
import { Router } from "express";
import { UpdateZapSchema, ZapIdSchema, ZapSchema } from "../lib/schema";
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

    try {
        await client.$transaction(async (txn) => {
            const zap = await txn.zap.create({
                data: {
                    triggerId: "",
                    userId
                }
            })
            const trigger = await txn.trigger.create({
                data: {
                    zapId: zap.id,
                    availableTriggerId: data.triggerId
                }
            })
            await txn.zap.update({ where: { id: zap.id }, data: { triggerId: trigger.id } })
            await txn.action.createMany({
                data: data.actions.map((a, i) => ({
                    zapId: zap.id,
                    availableActionId: a.availableActionId,
                    sortingOrder: i
                }))
            })
        })

        return res.status(201).json({ message: "Zap created." })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})

router.put("/:zapId", async (req: Request, res: Response) => {
    const userId = req.userId;
    const zapId = req.params.zapId as string;
    const parsed = UpdateZapSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            message: parsed.error
        });
    }
    const data = parsed.data;

    try {
        await client.$transaction(async (txn) => {
            const zap = await txn.zap.findFirst({
                where: {
                    id: zapId,
                    userId,
                },
                include: {
                    trigger: true,
                },
            });

            if (!zap) {
                throw new Error("Zap not found");
            }
            await txn.trigger.update({
                where: {
                    id: zap.triggerId,
                },
                data: {
                    availableTriggerId: data.availableTriggerId,
                },
            });

            await txn.action.deleteMany({
                where: {
                    zapId,
                },
            });

            await txn.action.createMany({
                data: data.actions.map((action, index) => ({
                    zapId,
                    availableActionId: action.availableActionId,
                    sortingOrder: index,
                })),
            });
        });

        return res.status(200).json({
            message: "Zap updated successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

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
