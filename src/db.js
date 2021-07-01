import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/review');
const db = mongoose.connection;

const handleError = (err) => console.log("DB Error", err);
const handleOpen = () => console.log("✅ Connected to DB");

db.on('error', handleError);
db.once('open', handleOpen);

