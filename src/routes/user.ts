import { Router } from "express";
import  express  from "express";
import { z } from "zod";
import  bcrypt from "bcrypt"
import { UserModel } from "../db";
import { userMiddleware } from "../middleware/user";
import jwt from "jsonwebtoken"

const userRouter = Router();
userRouter.use(express.json())

userRouter.post("/signup" ,  async (req : any, res : any) => {
     const requiredbody = z.object({
        username : z.string().min(3).max(100),
        password : z.string().
        min(4).
        max(100)
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[\W_]/, "Password must contain at least one special character"),
     })

     const parsedDataWithSuccess = requiredbody.safeParse(req.body)
     console.log(parsedDataWithSuccess)

     if (!parsedDataWithSuccess.success) {
        return res.status(400).json({
            message : "Incorret Format",
            error : parsedDataWithSuccess.error.errors
        })
     }

    const username = req.body.username;
    const password = req.body.password;
    
    try {
        const hashedPassword = await bcrypt.hash(password , 5)
        console.log(hashedPassword)

        await UserModel.create({
            username : username,
            password : hashedPassword
        })

        res.json({
            message : "You Signed Up Successfully"
        })
    } catch (error) {
        res.status(403).json({
            message : "Invalid Crendiatials"
        })
    }
})

userRouter.post("/signin",   async (req: any, res: any) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(403).json({ message: "Invalid Credentials" });
        }

        const passwordMatched = await bcrypt.compare(password, user.password);

        if (!passwordMatched) {
            return res.status(403).json({ message: "Invalid Credentials" });
        }  

        const token = jwt.sign(
            { id: user._id.toString() },
            process.env.JWT_USER_SECRET || "defaultSecret", 
            { expiresIn: "1h" }
        );

        res.json({
            message: "You are Signed In Successfully",
            token: token,
        });
    } catch (error) {
        console.error("Sign-in Error:", error);
        res.status(500).json({ message: "Something Went Wrong" });
    }
});

export {
    userRouter
}