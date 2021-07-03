import express from "express";
import { edit, remove, see, github, getGithubLogin } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/github/start", github);
userRouter.get("/github/finish", getGithubLogin);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get(":id", see);

export default userRouter;