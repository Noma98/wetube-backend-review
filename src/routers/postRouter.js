import express from "express";
import { see, edit, getUpload, postUpload, deleteVideo } from "../controllers/postController";
import multer from "multer";
const upload = multer({ dest: "uploads/posts/" });
const videoRouter = express.Router();

videoRouter.route("/upload").get(getUpload).post(upload.single("fileUrl"), postUpload);
videoRouter.get("/:id", see);
videoRouter.get("/:id/edit", edit);
videoRouter.get("/:id/delete", deleteVideo);

export default videoRouter;