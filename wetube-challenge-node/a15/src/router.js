import express from "express";
import multer from "multer";
import { getHome, postHome } from "./controller";
// import { uploadFile } from "./index";

const rootRouter = express.Router();
const uploadFile = multer({ dest: "uploads/" });

rootRouter.get("/", getHome);
rootRouter.post("/read", uploadFile.single("txt"), postHome);

export default rootRouter;
