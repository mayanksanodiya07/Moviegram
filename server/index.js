const express = require("express");
const app = express();
const { connectToMongoDB } = require("./connect");
const User = require("./models/user");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { handleSignup } = require("./controllers/handleSignup");
const { handleLogin } = require("./controllers/handleLogin");
const { handleAddMovie, handleFetchWatchedMovies, handleDeleteMovie } = require("./controllers/handleMovie");

const PORT = 5000;
// connectToMongoDB("mongodb://localhost:27017/moviegram");
connectToMongoDB("mongodb+srv://moviegram:moviegram@cluster0.ro8co.mongodb.net/moviegramdb?retryWrites=true&w=majority&appName=Cluster0");

app.use(cookieParser());
app.use(express.urlencoded({ extended: false })); 
app.use(
  cors({ 
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
    credentials: true
  })
);
app.use(express.json());

app.post("/signup", handleSignup);
app.post("/login", handleLogin);
app.post("/movies", handleAddMovie);
app.get("/movies", handleFetchWatchedMovies);
app.delete("/movies/:movieId", handleDeleteMovie);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
