import express from "express";
import { getJoin, getLogin, postLogin, postJoin, logout, getSocialJoin, postSocialJoin } from "../controllers/userController";
import { home } from "../controllers/postController";
import { loggedInOnlyMiddleware, publicOnlyMiddleware } from '../middlewares';

const rootRouter = express.Router();
rootRouter.get("/", home);
rootRouter.route("/join").get(publicOnlyMiddleware, getJoin).post(postJoin);
rootRouter.route("/login").get(publicOnlyMiddleware, getLogin).post(postLogin);
rootRouter.route("/join/social").get(publicOnlyMiddleware, getSocialJoin).post(postSocialJoin);
rootRouter.get("/logout", loggedInOnlyMiddleware, logout);

export default rootRouter;

