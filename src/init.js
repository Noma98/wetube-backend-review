import "dotenv/config";
import "./db"; //import되는 순간 db.js가 자동으로 실행되며, mongodb와 연결된다.
import "./models/User";
import "regenerator-runtime";
import app from "./server";

const PORT = 4000;
const handleListening = () => console.log(`✅ Server Listening on port http://localhost:${PORT} 🚀`);

app.listen(4000, handleListening);//서버가 시작될 때 작동하는 함수