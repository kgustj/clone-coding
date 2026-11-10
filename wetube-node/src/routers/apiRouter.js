import express from "express";
import { registerView } from "../controllers/videoController";
import { checkObjectId } from "../middlewares";

const apiRouter = express.Router();

apiRouter.param("id", checkObjectId);

apiRouter.post("/videos/:id/views", registerView);

export default apiRouter;
