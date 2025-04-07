"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentRouter = void 0;
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const db_1 = require("../db");
const user_1 = require("../middleware/user");
const contentRouter = (0, express_1.Router)();
exports.contentRouter = contentRouter;
contentRouter.use(express_2.default.json());
contentRouter.post("/content", user_1.userMiddleware, async (req, res) => {
    try {
        const link = req.body.link;
        const type = req.body.type;
        await db_1.ContentModel.create({
            link,
            type,
            title: req.body.title,
            //@ts-ignore
            userId: req.userId,
            tags: [],
        });
        res.json({
            message: "Content Added",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Invalid credentials",
        });
    }
});
contentRouter.get("/content", user_1.userMiddleware, async (req, res) => {
    try {
        //@ts-ignore
        const userId = req.userId;
        const content = await db_1.ContentModel.find({
            userId: userId,
        }).populate("userId", "username");
        res.json({
            content: content,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Invalid Credential",
        });
    }
});
contentRouter.delete("/content", user_1.userMiddleware, async (req, res) => {
    try {
        const contentId = req.body.contentId;
        await db_1.ContentModel.findOneAndDelete({
            contentId,
            //@ts-ignore
            userId: req.userId,
        });
        res.json({
            message: "Deleted content",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Invalid credentials",
        });
    }
});
