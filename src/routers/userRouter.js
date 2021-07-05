import express from "express";
import { getEdit, postEdit, profile, github, getGithubLogin } from "../controllers/userController";
import multer from "multer";

const upload = multer({ dest: "uploads/avatar/" });
const userRouter = express.Router();

userRouter.get("/github/start", github);
userRouter.get("/github/finish", getGithubLogin);
userRouter.get("/:id", profile);
userRouter.route("/:id/edit").get(getEdit).post(upload.single("avatarUrl"), postEdit);

export default userRouter;