import { Router } from "express";
import  express  from "express";
import { ContentModel } from "../db";
import { userMiddleware } from "../middleware/user";

const contentRouter = Router();
contentRouter.use(express.json());

contentRouter.post("/content" , userMiddleware,  async (req  , res )=> {
    const link = req.body.link;
    const type = req.body.type;
        await ContentModel.create({
            link,
            type,
            title : req.body.title,
            //@ts-ignore
            userId : req.userId,
            tags : []
        })
        res.json({
            message : "Content Added"
        })
    })
    contentRouter.get("/content" , userMiddleware , async (req , res)=>{
        //@ts-ignore
      const userId = req.userId
      const content = await ContentModel.find({
        userId : userId
      }).populate("userId" , "username")
      res.json({
        content : content
      })
    }) 
    contentRouter.delete("/content" , userMiddleware ,  async (req : any , res : any)=> {
     const contentId = req.body.contentId;
     await ContentModel.deleteMany({
        contentId,
       //@ts-ignore
        userId : req.userId
     })

     res.json({
        message : "Deleted content"
     })
    })
export {
    contentRouter
}