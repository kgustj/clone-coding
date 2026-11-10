import express from "express";
import {
    see,
    logout,
    getEdit,
    postEdit,
    getPassword,
    postPassword,
    githubLogin,
    githubCallback,
} from "../controllers/userController";
import { uploadAvatar, protectorMiddleware, publicMiddleware, checkObjectId } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(uploadAvatar.single("avatar"), postEdit);
userRouter.route("/change-password").all(protectorMiddleware).get(getPassword).post(postPassword);
userRouter.get("/github", publicMiddleware, githubLogin);
userRouter.get("/github/callback", publicMiddleware, githubCallback);
userRouter.param("id", checkObjectId);
userRouter.get("/:id", see);

export default userRouter;
