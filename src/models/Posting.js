import mongoose from "mongoose";
const postingSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: String,
    createdAt: { type: Date, default: new Date(), required: true },
    hashtags: [String],
    views: { type: Number, default: 0, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    fileUrl: { type: String, required: true },
    mimetype: { type: String, required: true }
})
postingSchema.static("formatHashtags", function (hashs) {
    return hashs
        .replace(/ /g, "")
        .split(",")
        .map(x => x.startsWith("#") ? x : `#${x}`);
});
const Posting = mongoose.model("Posting", postingSchema);
export default Posting;