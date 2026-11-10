import express from "express";
import { watch, getUpload, postUpload, getEdit, postEdit, deleteVideo } from "../controllers/videoController";
import { uploadVideo, protectorMiddleware, checkObjectId } from "../middlewares";

const videoRouter = express.Router();

// /upload를 /:id보다 먼저 둬야 "upload"가 id로 잡히지 않음
videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(uploadVideo.single("video"), postUpload);

// MongoDB id(24자리 16진수)가 아니면 404
videoRouter.param("id", checkObjectId);
videoRouter.get("/:id", watch);
videoRouter.route("/:id/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.route("/:id/delete").all(protectorMiddleware).get(deleteVideo);

export default videoRouter;
