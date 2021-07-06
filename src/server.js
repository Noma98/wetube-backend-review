import express from "express";
import morgan from "morgan";
import rootRouter from './routers/rootRouter';
import userRouter from './routers/userRouter';
import postRouter from './routers/postRouter';
import session from 'express-session';
import { localsMiddleware } from './middlewares';
import MongoStore from 'connect-mongo';
import apiRouter from './routers/apiRouter';

const app = express();
const loggerMiddleware = morgan('dev');

app.set("view engine", "pug");
app.set("views", `${process.cwd()}/src/views`);

app.use(loggerMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,//don't save session if unmodified
    saveUninitialized: false,// don't create session until something stored
    store: MongoStore.create({ mongoUrl: process.env.DB_URL })
}))
app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/api", apiRouter);

app.use("/public", express.static("public"));
app.use("/assets", express.static("assets"));
app.use("/uploads", express.static("uploads"));

export default app;



