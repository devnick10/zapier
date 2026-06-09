import { client } from "@repo/db";
import type { Request, Response } from "express";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.Middleware";

const router = Router();
router.use(authMiddleware)

router.get("/available", async (req: Request, res: Response) => {
    try {
        const actions = await client.availableAction.findMany({})
        res.status(200).json({ message: "Zap fetched", actions: actions || [] })
        return;
    } catch (error) {
        res.status(200).json({ message: "Internal server error", actions: [] })
        return;
    }
})

export { router as actionRouter };
