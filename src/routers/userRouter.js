import express from "express";
import { getEdit, postEdit, profile, github, getGithubLogin } from "../controllers/userController";
import multer from "multer";
import { ownerOnlyMiddleware, publicOnlyMiddleware } from '../middlewares';

const upload = multer({ dest: "uploads/avatar/" });
const userRouter = express.Router();

userRouter.get("/github/start", publicOnlyMiddleware, github);
userRouter.get("/github/finish", publicOnlyMiddleware, getGithubLogin);
userRouter.get("/:id", profile);
userRouter.route("/:id/edit").get(ownerOnlyMiddleware, getEdit).post(upload.single("avatarUrl"), postEdit);

export default userRouter;