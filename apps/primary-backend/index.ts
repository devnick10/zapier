import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { actionRouter } from "./routes/actions.route";
import { triggerRouter } from "./routes/trigger.route";
import { userRouter } from "./routes/user.route";
import { zapRouter } from "./routes/zap.router";
// import { globalErrorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

app.use(cors({
    origin: "*"
}))
app.use(helmet())


//  Routes
app.use("/api/v1/zap", zapRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/trigger", triggerRouter)
app.use("/api/v1/action", actionRouter)


// app.use(globalErrorHandler)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})