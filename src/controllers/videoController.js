export const home = (req, res) => res.render("screens/home", { title: "home!!", message: "This is home!", videos: [{ title: "video1", rating: 4 }, { title: "video2", rating: 3 }] });
export const see = (req, res) => res.send("Watch");
export const edit = (req, res) => res.send("Edit");
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => res.send("Delete Video");