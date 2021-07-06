import express from "express";
import { getJoin, getLogin, postLogin, postJoin, logout, getSocialJoin, postSocialJoin } from "../controllers/userController";
import { home, search } from "../controllers/postController";

const rootRouter = express.Router();
rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.route("/join/social").get(getSocialJoin).post(postSocialJoin);
rootRouter.get("/logout", logout);
rootRouter.get("/search", search);

export default rootRouter;

