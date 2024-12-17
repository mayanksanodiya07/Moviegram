import { useEffect, useState } from "react";
import { useFetchMovie } from "../useFetchMovie";
import SearchBar from "../components/SearchBar";
import LoginSignup from "../components/LoginSignup";
import MovieDetails from "../components/MovieDetails";
import Box from "../components/Box";
import Loading from "../components/Loading";
import logo from "../logo/logo.png";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import checkUserLoggedIn from "../services/checkUserLoggedIn";
import RandomColors from "../components/RandomColor";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function Homepage() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useFetchMovie(query);

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  // const [watched, setWatched] = useLocalStorageState([], "watched");
  const [watched, setWatched] = useState([]);

  useEffect(() => {
    const fetchWatchedMovies = async () => {
      if (!id) return;
      try {
        const isLoggedIn = await checkUserLoggedIn(id);
        if (!isLoggedIn) {
          navigate("/login");
        }
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/movies`,
          {
            params: { id },
          }
        );
        setWatched(response.data.movies);
      } catch (error) {
        if (error.response) {
          console.log("error: ", error.response.data.message);
        } else {
          // setMessage('An error occurred during verification.');
          console.log("An error occurred during verification.");
        }
        // setStatus('error');
      }
    };

    fetchWatchedMovies();
  }, [id]);

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId("");
  }

  async function handleAddWatched(movie) {

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/movies`,
        {
          id,
          movie,
        },
        {
          withCredentials: true,
        }
      );
      setWatched(res.data.movies);
    } catch (err) {
      console.error("error", err?.response?.data);
    }
  }

  async function handleAddComment(comment, selectedId) {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/comment`,
        {
          userId: id,
          comment,
          movieId: selectedId,
        }
      );

      return res.data;
    } catch (err) {
      console.error("error", err?.response?.data);
      return { commentData: null, message: "Failed to add comment" };
    }
  }

  const handleDeleteWatched = async (movieId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (!confirmed) {
      return;
    }
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/movies/${movieId}`,
        {
          data: { userId: id },
        }
      );
      setWatched(res.data.movies);
    } catch (err) {
      console.error(
        "Error deleting movie:",
        err?.response?.data?.message || err.message
      );
    }
  };

  return (
    <div className="h-screen p-6 text-color-text bg-color-background-900">
      {/* <RandomColors/> */}
      <NavBar>
        <SearchBar query={query} onSetQuery={setQuery} />
        <NumResult movies={movies} />
        {!id ? <LoginSignup /> : ""}
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loading />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddMovie={handleAddWatched}
              onAddComment={handleAddComment}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteMovie={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="text-center p-3">
      <span>⛔</span>
      {message}
    </p>
  );
}

function NavBar({ children }) {
  return (
    <nav className="bg-color-primary px-6 flex items-center justify-between h-16 rounded-xl">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="w-48">
      {/* <span role="img">🍿</span>
        <h1>Moviegram</h1> */}
      <img src={logo} alt="Logo" className=""></img>
    </div>
  );
}

function NumResult({ movies }) {
  return (
    <p className="mb-0">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return (
    <main className="h-[calc(100vh-8.5rem)] mt-6 flex gap-6 justify-center">
      {children}
    </main>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="py-3">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li
      onClick={() => onSelectMovie(movie.imdbID)}
      className="grid grid-cols-[40px_1fr] grid-rows-[auto_auto] gap-x-6 py-2 px-2 border-0 border-b-2 border-b-color-background-100 cursor-pointer hover:bg-color-background-100"
    >
      <img
        src={movie.Poster}
        alt={`${movie.Title} poster`}
        className="row-span-full "
      />
      <h3 className="text-lg">{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="px-8 py-5 rounded-xl bg-color-background-100 shadow-4xl">
      <h2 className="uppercase text-lg mb-2">Movies you watched</h2>
      <div className="flex items-center gap-4">
        <p className="flex gap-2 items-center font-semibold">
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p className="flex gap-2 items-center font-semibold">
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p className="flex gap-2 items-center font-semibold">
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p className="flex gap-2 items-center font-semibold">
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched, onDeleteMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteMovie={() => onDeleteMovie(movie.imdbID)}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteMovie }) {
  return (
    <li className="grid grid-cols-[40px_1fr] grid-rows-[auto_auto] gap-x-6 py-4 px-8 border-0 border-b-2 border-b-color-background-100 cursor-pointer ">
      <img
        src={movie.poster}
        alt={`${movie.title} poster`}
        className="row-span-full "
      />
      <h3 className="text-lg">{movie.title}</h3>
      <div className="flex gap-4 ">
        <p className="flex gap-2 items-center ">
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p className="flex gap-2 items-center">
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p className="flex gap-2 items-center">
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete absolute right-7 border-0 rounded-full text-color-red hover:text-color-red-dark cursor-pointer text-base font-bold flex items-center justify-center"
          onClick={onDeleteMovie}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </li>
  );
}
