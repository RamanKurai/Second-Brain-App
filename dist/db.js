"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkModel = exports.tagModel = exports.contentModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
mongoose_1.default.connect("mongodb+srv://ramankurai27:Qnykw4n7N07iYMmi@cluster0.sh3z1.mongodb.net/Second-Brain-App");
const userSchema = new mongoose_2.Schema({
    email: ({ type: String, required: true, unique: true }),
    password: ({ type: String, required: true })
});
const contentSchema = new mongoose_2.Schema({
    title: String,
    link: String,
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: "tag" }],
    type: String,
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "users", required: true }
});
const tagSchema = new mongoose_2.Schema({
    title: { type: String, required: true, unique: true }
});
const linkSchema = new mongoose_2.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "users" }
});
exports.userModel = (0, mongoose_3.model)("users", userSchema);
exports.contentModel = (0, mongoose_3.model)("content", contentSchema);
exports.tagModel = (0, mongoose_3.model)("tag", tagSchema);
exports.linkModel = (0, mongoose_3.model)("link", linkSchema);
