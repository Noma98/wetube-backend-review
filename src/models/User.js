import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    avatarUrl: { type: String, default: "" },
    pwd: { type: String, required: true }
})
userSchema.pre("save", async function () {
    this.pwd = await bcrypt.hash(this.pwd, 5);
})

const User = mongoose.model("User", userSchema);
export default User;