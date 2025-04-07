"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.TagModel = exports.ContentModel = exports.UserModel = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importStar(require("mongoose"));
const MONGODB_URL = process.env.MONGODB_URL || "defaultUrl";
mongoose_1.default
    .connect(MONGODB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB Connection Error:", err));
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const contentSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    link: { type: String, required: false },
    tags: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Tag" }],
    type: { type: String },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
});
const tagSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
});
const linkSchema = new mongoose_1.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
});
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
exports.ContentModel = (0, mongoose_1.model)("Content", contentSchema);
exports.TagModel = (0, mongoose_1.model)("Tag", tagSchema);
exports.LinkModel = (0, mongoose_1.model)("Link", linkSchema);
