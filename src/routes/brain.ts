import { userMiddleware } from "../middleware/user";
import express from "express";
import { Router } from "express";
import { ContentModel, LinkModel, UserModel } from "../db";
import { random } from "../utils/utils";
import { contentRouter } from "./content";

const brainRouter = Router();
brainRouter.use(express.json());

brainRouter.post("/brain/share", userMiddleware, async (req: any, res: any) => {
  const share = req.body.share;
  try {
    if (share) {
      const existingLink = await LinkModel.findOne({
        userId: req.userId,
      });
      if (existingLink) {
        res.json({
          hash: existingLink.hash,
        });
        return;
      }
      const hash = random(10);
      await LinkModel.create({
        userId: req.userId,
        hash: hash,
      });
      res.json({
        hash,
      });
    } else {
      await LinkModel.deleteOne({
        userId: req.userId,
      });

      res.json({
        message: "Removed Link",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Invalid credentials",
    });
  }
});

brainRouter.get(
  "/brain/:sharelink",
  userMiddleware,
  async (req: any, res: any) => {
    const hash = req.params.sharelink;
    try {
      const link = await LinkModel.findOne({
        hash,
      });

      if (!link) {
        res.status(411).json({
          message: " Sorry Incorrect Input ",
        });
        return;
      }
      //userId
      const content = await ContentModel.find({
        userId: link.userId,
      });
      console.log(link);

      const user = await UserModel.findOne({
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
    } catch (error) {
      res.status(500).json({
        message: "No content user not found",
      });
    }
  }
);

export { brainRouter };
