import User from '../models/User';
import bcrypt from 'bcrypt';

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
export const getLogin = (req, res) => res.render("screens/login");
export const postLogin = async (req, res) => {
    const { userId, pwd } = req.body;
    const findUser = await User.findOne({ userId });
    if (!findUser) {
        return res.status(400).render("screens/login", { error: "존재하지 않는 아이디입니다." });
    }
    const pwdCheck = await bcrypt.compare(pwd, findUser.pwd);
    if (!pwdCheck) {
        return res.status(400).render("screens/login", { error: "비밀번호가 틀립니다." });
    }
    return res.redirect("/");
};

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See User");