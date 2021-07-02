import express from "express";
import morgan from "morgan";
import rootRouter from './routers/rootRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import session from 'express-session';
import { localsMiddleware } from './middlewares';

const app = express();
const loggerMiddleware = morgan('dev');

app.set("view engine", "pug");
app.set("views", `${process.cwd()}/src/views`);
app.use(loggerMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'asdlfkja1123o98as7fdakj1',
    resave: true,
    saveUninitialized: true,
}))

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;


