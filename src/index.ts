import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { userRouter } from "./routes/user";
import { contentRouter } from "./routes/content";
import { brainRouter } from "./routes/brain";
import cors from "cors"
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/", userRouter);
app.use("/api/v1/", contentRouter);
app.use("/api/v1", brainRouter);

app.listen(3000, () => console.log("Server running on port 3000"));
