import Posting from '../models/Posting';

export const home = async (req, res) => {
    const postings = await Posting.find({}).populate("owner");
    return res.render("screens/home", { pageTitle: "Home", postings })
};
export const see = (req, res) => res.send("Watch");
export const edit = (req, res) => res.send("Edit");
export const search = (req, res) => res.send("Search");
export const getUpload = (req, res) => res.render("screens/upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
    const {
        body: { title, description, hashtags },
        file: { path: fileUrl, mimetype }
    } = req;
    await Posting.create({
        title,
        description,
        hashtags: Posting.formatHashtags(hashtags),
        fileUrl: `/${fileUrl}`,
        owner: req.session.user._id,
        mimetype
    });
    return res.redirect("/");
}
export const deleteVideo = (req, res) => res.send("Delete Video");