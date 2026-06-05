import "dotenv/config"
import express from "express";
import morgan from "morgan"
import { zapRouter } from "./routes/zap.router";
import { userRouter } from "./routes/user.route";
import helmet from "helmet";
import cors from "cors"
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


// app.use(globalErrorHandler)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})