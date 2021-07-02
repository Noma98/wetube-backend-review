import mongoose from "mongoose";
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
const db = mongoose.connection;

const handleError = (err) => console.log("DB Error", err);
const handleOpen = () => console.log("✅ Connected to DB");

db.on('error', handleError);
db.once('open', handleOpen);

