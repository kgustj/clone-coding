import express from "express";
import { home, movieDetail, getMovie, postMovie } from "./movieController";

const movieRouter = express.Router();

movieRouter.get("/", home);
movieRouter.get("/:id(\\d+)", movieDetail);
movieRouter.route("/add").get(getMovie).post(postMovie);

// create the '/' route
// create the /:id route
// create the /add route (GET + POST)

export default movieRouter;
