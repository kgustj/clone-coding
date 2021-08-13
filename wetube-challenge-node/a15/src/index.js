import express from "express";
import path from "path";
import bodyParser from "body-parser";
import multer from "multer";
import rootRouter from "./router";
import pug from "pug";
import fs from "fs";

// export const uploadFile = multer({ dest: "uploads/" });

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "uploads")));
app.use("/", rootRouter);

// Codesanbox does not need PORT :)
app.listen(() => console.log(`Listening!`));
