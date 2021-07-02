import express from "express";
import morgan from "morgan";
import rootRouter from './routers/rootRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import session from 'express-session';
import { localsMiddleware } from './middlewares';
import MongoStore from 'connect-mongo';

const app = express();
const loggerMiddleware = morgan('dev');

app.set("view engine", "pug");
app.set("views", `${process.cwd()}/src/views`);
app.use(loggerMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'asdlfkja1123o98as7fdakj1',
    resave: false,//don't save session if unmodified
    saveUninitialized: false,// don't create session until something stored
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/review' })
}))

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;


