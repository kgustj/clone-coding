import mongoose from "mongoose";

// Create a Movie Model here.

const movieSchema = new mongoose.Schema({
  title: String,
  summary: String,
  year: Date,
  rating: Number,
  genres: [{ type: String }]
});

const Movie = mongoose.model("Video", movieSchema);

export default Movie;
