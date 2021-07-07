import express from "express";
import { see, getUpload, postUpload } from "../controllers/postController";
import multer from "multer";
import { loggedInOnlyMiddleware } from '../middlewares';
const upload = multer({ dest: "uploads/posts/" });
const postRouter = express.Router();

postRouter.route("/upload").get(loggedInOnlyMiddleware, getUpload).post(upload.single("fileUrl"), postUpload);
postRouter.get("/:id", see);

export default postRouter;