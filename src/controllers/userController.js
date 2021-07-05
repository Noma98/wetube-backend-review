import User from '../models/User';
import bcrypt from 'bcrypt';
import fetch from "node-fetch";

export const getJoin = (req, res) => res.render("screens/join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
    handleJoin(req, res, "screens/join");
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

export const github = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GH_CLIENT,
        scope: "read:user user:email"
    };
    const configUrl = new URLSearchParams(config).toString();
    const finalUrl = baseUrl + "?" + configUrl;
    res.redirect(finalUrl);
}
export const getGithubLogin = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    };
    const configUrl = new URLSearchParams(config).toString();
    const finalUrl = baseUrl + "?" + configUrl;

    const tokenRequest = await (await fetch(finalUrl, {
        method: "POST",
        headers: {
            Accept: "application/json"
        }
    })).json();
    if (!("access_token" in tokenRequest)) {
        return res.redirect("login", { pageTitle: "Login", error: "⛔ 엑세스 토큰이 없습니다. 다시 시도해 보세요.:)" })
    }
    const { access_token } = tokenRequest;
    const apiUrl = 'https://api.github.com';
    const userData = await (
        await fetch(`${apiUrl}/user`, {
            method: "GET",
            headers: {
                Authorization: `token ${access_token}`
            },
        })
    ).json();
    const emailData = await (
        await fetch(`${apiUrl}/user/emails`, {
            method: "GET",
            headers: {
                Authorization: `token ${access_token}`
            }
        })
    ).json();
    const { login: userId, name, avatar_url: avatarUrl } = userData;
    const email = emailData.find(x => x.primary && x.verified).email;

    const user = await User.findOne({ email });

    //이미 해당 이메일로 소셜가입 혹은 기본가입한 사람 -> 로그인 진행
    if (user) {
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    }
    //해당 이메일 존재X -> 소셜 가입 진행
    if (!user) {
        req.session.data = { email, userId, name, avatarUrl };
        return res.redirect("/join/social");
    }
}
export const getSocialJoin = (req, res) => {
    const { email, userId, name, avatarUrl } = req.session.data;
    req.session.destroy();
    return res.render("screens/socialJoin", { email, userId, name, social: "Github", avatarUrl });
}
export const postSocialJoin = (req, res) => {
    handleJoin(req, res, "screens/socialJoin");
}

const handleJoin = async (req, res, redirectUrl) => {
    let { userId, email, pwd, pwd2, name, avatarUrl } = req.body;
    userId = userId.toLowerCase();
    email = email.toLowerCase();
    const pageTitle = "Join";
    const idExists = await User.exists({ userId });
    if (idExists) {
        return res.status(400).render(redirectUrl, { error: "이미 존재하는 아이디입니다.", pageTitle, email, name, avatarUrl });
    }
    const emailExists = await User.exists({ email });
    if (emailExists) {
        return res.status(400).render(redirectUrl, { error: "이미 사용중인 이메일입니다.", pageTitle, userId, name, avatarUrl });
    }
    if (pwd !== pwd2) {
        return res.status(400).render(redirectUrl, { error: "비밀번호가 동일하지 않습니다.", pageTitle, email, avatarUrl, name, userId });
    }
    await User.create({
        userId,
        name,
        email,
        pwd,
        avatarUrl
    });
    res.status(201).redirect("/login");
}
export const profile = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ userId: id });
    if (!user) {
        return res.render("screens/404", { pageTitle: "Profile" });
    }
    return res.render("screens/profile", { pageTitle: `${user.name}'s Profile`, user });
};

export const getEdit = (req, res) => res.render("screens/edit");
export const postEdit = async (req, res) => {
    const {
        params: {
            id: userId
        },
        file: {
            path
        }
    } = req;
    const user = await User.findOne({ userId });
    user.avatarUrl = "/" + path;
    await user.save();
    req.session.user = user;
    return res.redirect(`/users/${userId}`);
}