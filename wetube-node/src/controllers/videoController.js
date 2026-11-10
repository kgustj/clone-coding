import Video from "../models/video";
import User from "../models/user";

const isOwner = (video, req) => String(video.owner) === String(req.session.user._id);

export const home = async (req, res) => {
    const videos = await Video.find({}).sort({ createdAt: "desc" }).populate("owner");
    return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id).populate("owner");
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found" });
    }
    return res.render("watch", { pageTitle: video.title, video });
};

export const getUpload = (req, res) => res.render("upload", { pageTitle: "Upload Video" });

export const postUpload = async (req, res) => {
    const { _id } = req.session.user;
    const { title, description, hashtags } = req.body;
    if (!req.file) {
        return res.status(400).render("upload", { pageTitle: "Upload Video", errorMessage: "Please choose a video file." });
    }
    try {
        const newVideo = await Video.create({
            title,
            description,
            fileUrl: `/${req.file.path}`,
            owner: _id,
            hashtags: Video.formatHashtags(hashtags),
        });
        await User.findByIdAndUpdate(_id, { $push: { videos: newVideo._id } });
        return res.redirect(`/videos/${newVideo._id}`);
    } catch (error) {
        return res.status(400).render("upload", {
            pageTitle: "Upload Video",
            errorMessage: error._message,
        });
    }
};

export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found" });
    }
    if (!isOwner(video, req)) {
        return res.status(403).redirect("/");
    }
    return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};

export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found" });
    }
    if (!isOwner(video, req)) {
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);
};

export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found" });
    }
    if (!isOwner(video, req)) {
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndDelete(id);
    await User.findByIdAndUpdate(video.owner, { $pull: { videos: video._id } });
    return res.redirect("/");
};

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const search = async (req, res) => {
    const { keyword } = req.query;
    let videos = [];
    if (keyword) {
        videos = await Video.find({
            title: { $regex: new RegExp(escapeRegex(keyword), "i") },
        }).populate("owner");
    }
    return res.render("search", { pageTitle: "Search", videos, keyword });
};

// 영상을 끝까지 보면 프론트(videoPlayer.js)에서 호출
export const registerView = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.sendStatus(404);
    }
    video.meta.views += 1;
    await video.save();
    return res.sendStatus(200);
};
