import express from "express";
import morgan from "morgan";
import rootRouter from './routers/rootRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';

const PORT = 4000;

const app = express();
const loggerMiddleware = morgan('dev');
const handleHome = (req, res) => {
    res.send("home");
}

app.use(loggerMiddleware);
app.get("/", handleHome);

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);


const handleListening = () => console.log(`✅ Server Listening on port http://localhost:${PORT} 🚀`);
app.listen(4000, handleListening);//서버가 시작될 때 작동하는 함수

