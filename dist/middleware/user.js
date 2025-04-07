"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_USER_SECRET = process.env.JWT_USER_SECRET || "defaultSecret";
const userMiddleware = (req, res, next) => {
    try {
        const header = req.headers["authorization"];
        const decodedToken = jsonwebtoken_1.default.verify(header, JWT_USER_SECRET);
        if (decodedToken) {
            //@ts-ignore
            req.userId = decodedToken.id;
            next();
        }
        else {
            res.status(403).json({
                message: "You are not logged In"
            });
        }
    }
    catch (error) {
        console.error("Error While passing Token", error);
    }
};
exports.userMiddleware = userMiddleware;
