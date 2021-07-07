import Posting from '../models/Posting';

export const home = async (req, res) => {
    const postings = await Posting.find({}).populate("owner");
    return res.render("screens/home", { pageTitle: "Home", postings })
};
export const see = async (req, res) => {
    const { id } = req.params;
    const posting = await Posting.findById(id).populate("owner");
    if (!posting) {
        return res.render("screens/404", { pageTitle: "Error" });
    }
    return res.render("screens/watch", { pageTitle: posting.title, posting });
}
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

export const addView = async (req, res) => {
    const { id } = req.params;
    const posting = await Posting.findById(id);
    if (!posting) {
        return res.sendStatus(404);
    }
    posting.views += 1;
    await posting.save();
    return res.sendStatus(200);
}