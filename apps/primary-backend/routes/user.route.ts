import { Router } from "express";
import type { Response, Request } from "express";
import { authMiddleware } from "../middlewares/auth.Middleware";
import { SigninSchema, SignupSchema } from "../lib/schema";
import { client } from "@repo/db";
import { compare, hash } from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_PASSWORD } from "../lib/config";
const router = Router();


router.post("/signup", async (req: Request, res: Response) => {
    const { success, data, error } = SignupSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({ message: error })
    }

    const { name, email, password } = data;
    const existingUser = await client.user.findFirst({
        where: {
            email
        }
    })

    if (existingUser) {
        return res.status(411).json({ message: "Email is already taken!" })
    }

    const hashedPassword = await hash(password, 10);
    const user = await client.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    /* 
    * add field called verified is User schema and cerate endpoint /email/verify  
    * send email verification 
    * await sendmail()
    */

    const token = jwt.sign({ userId: user.id }, JWT_PASSWORD)
    res.status(201).json({ message: "Signup successfully", token })

})

router.post("/signin", async (req: Request, res: Response) => {
    const { success, data, error } = SigninSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({ message: error })
    }

    const { email, password } = data;
    const user = await client.user.findFirst({
        where: {
            email
        }
    })

    if (!user) {
        return res.status(411).json({ message: "Invalid credentials" })
    }

    const isValidPassword = compare(password, user.password)

    if (!isValidPassword) {
        return res.status(411).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign({ userId: user.id }, JWT_PASSWORD)
    res.status(200).json({ message: "Signin successfully", token })
})

router.get("/", authMiddleware, async (req: Request, res: Response) => {
    const userId = req.userId;
    const user = await client.user.findUnique({
        where: { id: userId }
    })

    if (!user) {
        res.status(404).json({ message: "User not found!" })
        return;
    }
    res.json({ message: "User fetched", user: { id: user.id, email: user?.email, name: user.name } })
})




export { router as userRouter };