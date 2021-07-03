import User from '../models/User';
import bcrypt from 'bcrypt';

export const getJoin = (req, res) => res.render("screens/join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
    const { userId, email, pwd, pwd2, name } = req.body;
    const pageTitle = "Join";
    const idExists = await User.exists({ userId });
    if (idExists) {
        return res.status(400).render("screens/join", { error: "이미 존재하는 아이디입니다.", pageTitle });
    }
    const emailExists = await User.exists({ email });
    if (emailExists) {
        return res.status(400).render("screens/join", { error: "이미 사용중인 이메일입니다.", pageTitle });
    }
    if (pwd !== pwd2) {
        return res.status(400).render("screens/join", { error: "비밀번호를 동일하게 입력해주세요.", pageTitle });
    }
    await User.create({
        userId,
        name,
        email,
        pwd,
    });
    res.status(201).redirect("/login");
}
export const getLogin = (req, res) => res.render("screens/login", { pageTitle: "Login" });
export const postLogin = async (req, res) => {
    const pageTitle = "Login";
    const { idOrEmail, pwd } = req.body;
    const findUser = await User.findOne({ $or: [{ userId: idOrEmail }, { email: idOrEmail }] });
    if (!findUser) {
        return res.status(400).render("screens/login", { error: "존재하지 않는 Id혹은 Email입니다.", pageTitle });
    }
    const pwdCheck = await bcrypt.compare(pwd, findUser.pwd);
    if (!pwdCheck) {
        return res.status(400).render("screens/login", { error: "비밀번호가 틀립니다.", pageTitle });
    }
    req.session.loggedIn = true;
    req.session.user = findUser;
    return res.status(200).redirect("/");
};
export const logout = (req, res) => {
    req.session.destroy();
    return res.status(200).redirect("/");
}
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const see = (req, res) => res.send("See User");