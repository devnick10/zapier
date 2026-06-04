import express, { Router } from "express";
import { router } from "./routes/hook";

const app = express();
app.use(express.json());

app.use(router)

app.listen(3000, () => {
    console.log("Hooks server is up")
})