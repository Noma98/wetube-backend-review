import express from "express";
import morgan from "morgan";
import rootRouter from './routers/rootRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import "./db"; //import되는 순간 db.js가 자동으로 실행되며, mongodb와 연결된다.
const PORT = 4000;

const app = express();
const loggerMiddleware = morgan('dev');

app.set("view engine", "pug");
app.set("views", `${process.cwd()}/src/views`);
app.use(loggerMiddleware);
app.use(express.urlencoded({ extended: true }));

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);


const handleListening = () => console.log(`✅ Server Listening on port http://localhost:${PORT} 🚀`);
app.listen(4000, handleListening);//서버가 시작될 때 작동하는 함수

