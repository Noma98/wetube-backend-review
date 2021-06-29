import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const loggerMiddleware = morgan('dev');
const handleHome = (req, res) => {
    res.send("home");
}

app.use(loggerMiddleware);
app.get("/", handleHome);

const handleListening = () => console.log(`✅ Server Listening on port http://localhost:${PORT} 🚀`);
app.listen(4000, handleListening);//서버가 시작될 때 작동하는 함수

