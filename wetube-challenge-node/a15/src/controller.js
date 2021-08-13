import fs from "fs";

export const getHome = (req, res) => {
  return res.render("home");
};

export const postHome = (req, res) => {
  const url = req.file.path;
  fs.readFile(url, "utf8", (err, data) => {
    if (err) throw err;
    return res.send(`${data}`);
  });
};
