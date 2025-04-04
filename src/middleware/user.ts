import dotenv from "dotenv";
dotenv.config();
import  jwt  from "jsonwebtoken";
import { NextFunction , Request , Response } from "express";

const JWT_USER_SECRET = process.env.JWT_USER_SECRET || "defaultSecret"

const userMiddleware  = (req : Request , res : Response , next : NextFunction) => {
    try {
    const header = req.headers["authorization"];
    const decodedToken = jwt.verify(header as string , JWT_USER_SECRET)
    if (decodedToken) {
        //@ts-ignore
        req.userId = decodedToken.id
        next()
    } else {
        res.status(403).json({
            message : "You are not logged In"
        })
    }
    } catch (error) {
        console.error("Error While passing Token" , error)
    }
}
export {
    userMiddleware
}