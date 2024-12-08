const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  watchedMovies: [
    {
      imdbID: { type: String},
      title: { type: String },
      year: { type: String },
      poster: { type: String },
      imdbRating: { type: Number },
      runtime: { type: Number },
      userRating: { type: Number },
      countRatingDecisions: { type: Number },
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
