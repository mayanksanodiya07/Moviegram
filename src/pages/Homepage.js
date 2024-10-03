import { useState } from "react";
import { useFetchMovie } from "../useFetchMovie";
import { useLocalStorageState } from "../useLocalStorageState";
import SearchBar from "../components/SearchBar";
import LoginSignup from "../components/LoginSignup";
import MovieDetails from "../components/MovieDetails";
import Box from "../components/Box";
import Loading from "../components/Loading";
import logo from "../logo/logo.png";

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);  

export default function Homepage() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useFetchMovie(query);

  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId("");
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  return (
    <>
      <NavBar>
        <SearchBar query={query} onSetQuery={setQuery} />
        <NumResult movies={movies} />
        <LoginSignup />
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
    </>
  );
}

function ErrorMessage({ message }) {
    return (
      <p className="error">
        <span>⛔</span>
        {message}
      </p>
    );
  }
  
  function NavBar({ children }) {
    return (
      <nav className="nav-bar">
        <Logo />
        {children}
      </nav>
    );
  }
  
  function Logo() {
    return (
      <div className="logo">
        {/* <span role="img">🍿</span>
        <h1>Moviegram</h1> */}
        <img src={logo} alt="Logo"></img>
      </div>
    );
  }
  
  function NumResult({ movies }) {
    return (
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    );
  }
  
  function Main({ children }) {
    return <main className="main">{children}</main>;
  }
  
  function MovieList({ movies, onSelectMovie }) {
    return (
      <ul className="list list-movies">
        {movies?.map((movie) => (
          <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
        ))}
      </ul>
    );
  }
  
  function Movie({ movie, onSelectMovie }) {
    return (
      <li onClick={() => onSelectMovie(movie.imdbID)}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
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
      <div className="summary">
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{watched.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{avgImdbRating.toFixed(2)}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgUserRating.toFixed(2)}</span>
          </p>
          <p>
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
      <li>
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <h3>{movie.title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>
          <button className="btn-delete" onClick={onDeleteMovie}>
            X
          </button>
        </div>
      </li>
    );
  }
  
