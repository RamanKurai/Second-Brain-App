"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const user_1 = require("./routes/user");
const content_1 = require("./routes/content");
const brain_1 = require("./routes/brain");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "https://brainly-eight.vercel.app", // your frontend domain
    credentials: true
}));
app.use("/api/v1/", user_1.userRouter);
app.use("/api/v1/", content_1.contentRouter);
app.use("/api/v1", brain_1.brainRouter);
app.listen(process.env.PORT || 3000, () => {
    console.log('Server running...');
});
