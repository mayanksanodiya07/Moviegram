const express = require("express");
const app = express();
const { connectToMongoDB } = require("./connect");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { handleSignup } = require("./controllers/handleSignup");
const { handleLogin } = require("./controllers/handleLogin");
const {
  handleAddMovie,
  handleFetchWatchedMovies,
  handleDeleteMovie,
} = require("./controllers/handleMovie");
const {
  handlePostComment,
  handleGetComment,
  handleDeleteComment,
} = require("./controllers/handleComment");
const verifyToken = require("./controllers/authController");

const PORT = 5000;
// connectToMongoDB("mongodb://localhost:27017/moviegram");
connectToMongoDB(
  "mongodb+srv://moviegram:moviegram@cluster0.ro8co.mongodb.net/moviegramdb?retryWrites=true&w=majority&appName=Cluster0"
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://moviegram-umber.vercel.app"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
// app.get("/", (req, res) => {
//   res.json("Hello");
//   console.log("default");
// });
app.post("/signup", handleSignup);
app.post("/login", handleLogin);
app.post("/auth/verify", verifyToken);
app.post("/movies", handleAddMovie);
app.get("/movies", handleFetchWatchedMovies);
app.post("/comment", handlePostComment);
app.get("/comment", handleGetComment);
app.delete("/comment", handleDeleteComment);
app.delete("/movies/:movieId", handleDeleteMovie);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
