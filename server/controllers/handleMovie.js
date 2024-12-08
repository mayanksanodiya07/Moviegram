const bcrypt = require("bcrypt");
const User = require("../models/user");

async function handleAddMovie(req, res) {
  const { id, movie } = req.body;
  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }

    user.watchedMovies.push(movie);

    await user.save();
    res.status(200).json({
      message: "added in successfully",
      movies: user.watchedMovies,
    });
  } catch (error) {
    console.error("Error during adding:", error);
    res.status(500).json({ message: "An error occurred during adding." });
  }
}

async function handleFetchWatchedMovies(req, res) {
  const { id } = req.query;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }
    // res.status(200).json(data);

    res.status(200).json({
      message: "added in successfully",
      movies: user.watchedMovies,
    });
  } catch (error) {
    console.error("Error during adding:", error);
    res.status(500).json({ message: "An error occurred during adding." });
  }
}

async function handleDeleteMovie(req, res) {
  const { movieId } = req.params;
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    console.log(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const movieIndex = user.watchedMovies.findIndex(
      (movie) => movie.imdbID === movieId
    );

    if (movieIndex === -1) {
      return res
        .status(404)
        .json({ message: "Movie not found in watched list" });
    }

    // Remove the movie from the list
    user.watchedMovies.splice(movieIndex, 1);

    // Save the updated user document
    await user.save();

    res
      .status(200)
      .json({
        message: "Movie removed from watched list",
        movies: user.watchedMovies,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error removing movie from watched list",
      error: error.message,
    });
  }
}

module.exports = {
  handleAddMovie,
  handleFetchWatchedMovies,
  handleDeleteMovie,
};
