import User from '../models/User';

export const getJoin = (req, res) => res.render("screens/join");
export const postJoin = async (req, res) => {
    const { userId, pwd } = req.body;
    const idExists = await User.exists({ userId });
    if (idExists) {
        return res.status(400).render("screens/join", { error: "이미 존재하는 아이디입니다." });
    }
    await User.create({
        userId,
        pwd,
    });
    res.status(201).redirect("/login");
}
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See User");