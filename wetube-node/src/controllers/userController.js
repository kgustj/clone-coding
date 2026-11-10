import bcrypt from "bcrypt";
import User from "../models/user";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res) => {
    const pageTitle = "Join";
    const { name, username, email, password, password2, location } = req.body;
    if (password !== password2) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "Password confirmation does not match.",
        });
    }
    if (await User.exists({ username })) {
        return res.status(400).render("join", { pageTitle, errorMessage: "This username is already taken." });
    }
    if (await User.exists({ email })) {
        return res.status(400).render("join", { pageTitle, errorMessage: "This email is already taken." });
    }
    try {
        await User.create({ name, username, email, password, location });
        return res.redirect("/login");
    } catch (error) {
        return res.status(400).render("join", { pageTitle, errorMessage: error._message });
    }
};

export const getLogin = (req, res) => res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
    const pageTitle = "Login";
    const { username, password } = req.body;
    const user = await User.findOne({ username, socialLogin: false });
    if (!user) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "An account with this username does not exist.",
        });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("login", { pageTitle, errorMessage: "Wrong password." });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};

export const logout = (req, res) => {
    req.session.destroy(() => res.redirect("/"));
};

export const getEdit = (req, res) => res.render("edit-profile", { pageTitle: "Edit Profile" });

export const postEdit = async (req, res) => {
    const { _id, avatarUrl } = req.session.user;
    const { name, email, username, location } = req.body;
    const { file } = req;
    const taken = await User.exists({ _id: { $ne: _id }, $or: [{ username }, { email }] });
    if (taken) {
        return res.status(400).render("edit-profile", {
            pageTitle: "Edit Profile",
            errorMessage: "This username or email is already taken.",
        });
    }
    const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
            // S3에 올리면 file.location, 로컬 폴더에 저장하면 file.path
            avatarUrl: file ? file.location || `/${file.path}` : avatarUrl,
            name,
            email,
            username,
            location,
        },
        { new: true },
    );
    req.session.user = updatedUser;
    return res.redirect("/users/edit");
};

export const getPassword = (req, res) => {
    if (req.session.user.socialLogin) {
        return res.redirect("/");
    }
    return res.render("user/change-password", { pageTitle: "Change Password" });
};

export const postPassword = async (req, res) => {
    const pageTitle = "Change Password";
    const { _id } = req.session.user;
    const { oldPassword, newPassword, newPasswordConfirm } = req.body;
    const user = await User.findById(_id);
    const ok = await bcrypt.compare(oldPassword, user.password);
    if (!ok) {
        return res.status(400).render("user/change-password", {
            pageTitle,
            errorMessage: "The current password is incorrect.",
        });
    }
    if (newPassword !== newPasswordConfirm) {
        return res.status(400).render("user/change-password", {
            pageTitle,
            errorMessage: "The password does not match the confirmation.",
        });
    }
    user.password = newPassword;
    await user.save();
    return res.redirect("/users/logout");
};

export const see = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).populate({
        path: "videos",
        options: { sort: { createdAt: -1 } },
    });
    if (!user) {
        return res.status(404).render("404", { pageTitle: "User not found" });
    }
    return res.render("user/profile", { pageTitle: `${user.name}'s Profile`, user });
};

export const githubLogin = (req, res) => {
    const params = new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT,
        allow_signup: "false",
        scope: "read:user user:email",
    });
    return res.redirect(`https://github.com/login/oauth/authorize?${params}`);
};

export const githubCallback = async (req, res) => {
    const params = new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT,
        client_secret: process.env.GITHUB_SECRET,
        code: req.query.code,
    });
    const token = await (
        await fetch(`https://github.com/login/oauth/access_token?${params}`, {
            method: "POST",
            headers: { Accept: "application/json" },
        })
    ).json();
    if (!token.access_token) {
        return res.redirect("/login");
    }
    const headers = { Authorization: `token ${token.access_token}` };
    const apiUrl = "https://api.github.com";
    const userData = await (await fetch(`${apiUrl}/user`, { headers })).json();
    const emailData = await (await fetch(`${apiUrl}/user/emails`, { headers })).json();
    const emailObj = emailData.find((email) => email.primary === true && email.verified === true);
    if (!emailObj) {
        return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
        user = await User.create({
            socialLogin: true,
            avatarUrl: userData.avatar_url,
            name: userData.name || userData.login,
            username: userData.login,
            email: emailObj.email,
            location: userData.location,
        });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};
