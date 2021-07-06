import express from "express";
import { addView } from '../controllers/postController';

const apiRouter = express.Router();

apiRouter.post("/posts/:id([0-9a-f]{24})/addView", addView);



export default apiRouter;