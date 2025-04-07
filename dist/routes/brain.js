"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.brainRouter = void 0;
const user_1 = require("../middleware/user");
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const db_1 = require("../db");
const utils_1 = require("../utils/utils");
const brainRouter = (0, express_2.Router)();
exports.brainRouter = brainRouter;
brainRouter.use(express_1.default.json());
brainRouter.post("/brain/share", user_1.userMiddleware, async (req, res) => {
    const share = req.body.share;
    try {
        if (share) {
            const existingLink = await db_1.LinkModel.findOne({
                userId: req.userId,
            });
            if (existingLink) {
                res.json({
                    hash: existingLink.hash,
                });
                return;
            }
            const hash = (0, utils_1.random)(10);
            await db_1.LinkModel.create({
                userId: req.userId,
                hash: hash,
            });
            res.json({
                hash,
            });
        }
        else {
            await db_1.LinkModel.deleteOne({
                userId: req.userId,
            });
            res.json({
                message: "Removed Link",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Invalid credentials",
        });
    }
});
brainRouter.get("/brain/:sharelink", async (req, res) => {
    const hash = req.params.sharelink;
    try {
        const link = await db_1.LinkModel.findOne({
            hash,
        });
        if (!link) {
            res.status(404).json({
                message: " Sorry Incorrect Input ",
            });
            return;
        }
        //userId
        const content = await db_1.ContentModel.find({
            userId: link.userId,
        });
        console.log(link);
        const user = await db_1.UserModel.findOne({
            _id: link.userId,
        });
        if (!user) {
            res.json({
                message: "User Not found , error should ideally not happen",
            });
            return;
        }
        res.json({
            username: user.username,
            content: content,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "No content user not found",
        });
    }
});
