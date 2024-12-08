import { useEffect, useRef, useState } from "react";
import Loading from "./Loading";
import StarRating from "./StarRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";

const KEY = "aa5eda26";

function MovieDetails({ selectedId, onCloseMovie, onAddMovie, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };
    
    onAddMovie(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          onCloseMovie();
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovie]
  );

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );

        const data = await res.json();
        setMovie((datas) => data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = `Moviegram`;
      };
    },
    [title]
  );

  return (
    <div className="details ">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header className="flex text-sm ">
            <button
              className="btn-back absolute h-7 w-7 text-base bg-white text-color-background-500 rounded-full flex items-center justify-center shadow-3xl"
              onClick={onCloseMovie}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="" />
            </button>
            <img
              src={poster}
              alt={`Poster of ${movie} movie`}
              className="w-1/3"
            />
            <div className="flex flex-col bg-color-background-100 w-full px-8 py-6 gap-3">
              <h2 className="mb-1 text-2xl">{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p className="flex items-center gap-2">
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section className="flex flex-col p-10 gap-6">
            <div className="rating bg-color-background-100 rounded-xl px-6 py-5 mb-2 font-semibold flex flex-col gap-5 ">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating && (
                    <button
                      className="bg-color-primary text-color-text p-2 font-bold rounded-full cursor-pointer hover:bg-color-primary-light"
                      onClick={handleAdd}
                    >
                      <FontAwesomeIcon icon={faPlus} /> Add to list
                    </button>
                  )}
                </>
              ) : (
                <p className="text-sm">
                  You rated with movie {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p className="text-sm">
              <em>{plot}</em>
            </p>
            <p className="text-sm">Starring {actors}</p>
            <p className="text-sm">Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
