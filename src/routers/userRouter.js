import express from "express";
import { edit, profile, github, getGithubLogin } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/github/start", github);
userRouter.get("/github/finish", getGithubLogin);
userRouter.get("/:id", profile);
userRouter.get("/:id/edit", edit);

export default userRouter;