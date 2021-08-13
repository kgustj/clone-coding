import express from "express";

import {
  home,
  search,
  watch,
  getUpload,
  postUpload,
  getEdit,
  postEdit,
  deleteMovie
} from "./movieController";

const movieRouter = express.Router();

// Add your magic here!

movieRouter.get("/", home);
movieRouter.get("/search", search);
movieRouter.get("/movies/:id([0-9a-f]{24})", watch);
movieRouter.route("/movies/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
movieRouter.route("/movies/:id([0-9a-f]{24})/delete").get(deleteMovie);
movieRouter.route("/upload").get(getUpload).post(postUpload);

export default movieRouter;
