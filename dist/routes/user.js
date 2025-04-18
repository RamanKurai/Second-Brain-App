"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.use(express_2.default.json());
userRouter.post("/signup", async (req, res) => {
    const requiredbody = zod_1.z.object({
        username: zod_1.z.string().min(3).max(100),
        password: zod_1.z.string().
            min(4).
            max(100)
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(/[\W_]/, "Password must contain at least one special character"),
    });
    const parsedDataWithSuccess = requiredbody.safeParse(req.body);
    console.log(parsedDataWithSuccess);
    if (!parsedDataWithSuccess.success) {
        return res.status(400).json({
            message: "Incorret Format",
            error: parsedDataWithSuccess.error.errors
        });
    }
    const username = req.body.username;
    const password = req.body.password;
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, 5);
        console.log(hashedPassword);
        await db_1.UserModel.create({
            username: username,
            password: hashedPassword
        });
        res.json({
            message: "You Signed Up Successfully"
        });
    }
    catch (error) {
        res.status(403).json({
            message: "Invalid Crendiatials"
        });
    }
});
userRouter.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = await db_1.UserModel.findOne({ username });
        if (!user) {
            return res.status(403).json({ message: "Invalid Credentials" });
        }
        const passwordMatched = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatched) {
            return res.status(403).json({ message: "Invalid Credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id.toString() }, process.env.JWT_USER_SECRET || "defaultSecret");
        res.json({
            message: "You are Signed In Successfully",
            token: token,
        });
    }
    catch (error) {
        console.error("Sign-in Error:", error);
        res.status(500).json({ message: "Something Went Wrong" });
    }
});
