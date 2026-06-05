import type { Request, Response, NextFunction } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"
import { JWT_PASSWORD } from "../lib/config";
declare global {
    namespace Express {
        export interface Request {
            userId: string
        }
    }
}
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: "Unauthorized" })
        return;
    }
    const token = authHeader.split(" ")[1] as string
    try {
        const decodedToken = jwt.verify(token, JWT_PASSWORD) as JwtPayload
        if (decodedToken && decodedToken.userId) {
            req.userId = decodedToken.userId
            next()
        } else {
            res.status(401).json({ message: "Unauthorized" })
            return;
        }
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Unauthorized" })
    }
}