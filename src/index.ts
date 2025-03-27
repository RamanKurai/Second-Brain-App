import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { UserModel } from "./db";
import { userRouter } from "./routes/user";
import { contentRouter } from "./routes/content";

const app = express();
app.use(express.json());

app.use("/api/v1/", userRouter);
app.use("/api/v1/" , contentRouter);

app.listen(3000, () => console.log("Server running on port 3000"));
