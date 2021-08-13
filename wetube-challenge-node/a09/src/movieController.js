import { getMovieById, getMovies, addMovie } from "./db";

export const home = (req, res) =>
  res.render("movies", { movies: getMovies(), pageTitle: "Movies!" });

export const movieDetail = (req, res) => {
  const {
    params: { id }
  } = req;
  const movie = getMovieById(id);
  if (!movie) {
    res.render("404", { pageTitle: "Movie not found" });
  }
  return res.render("detail", { movie });
};

export const getMovie = (req, res) => {
  res.render("add", { pageTitle: "Add Movie" });
};

export const postMovie = (req, res) => {
  const { title } = req.body;
  const { synopsis } = req.body;
  const genres = req.body.genres.split(",");
  const newMovie = {
    title,
    synopsis,
    genres
  };
  // console.log(`${title}, ${synopsis}, ${genres}`);
  addMovie(newMovie);
  return res.redirect("/");
};

/*
Write the controller or controllers you need to render the form
and to handle the submission
*/
