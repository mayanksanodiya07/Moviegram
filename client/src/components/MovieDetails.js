import { useEffect, useRef, useState } from "react";
import Loading from "./Loading";
import StarRating from "./StarRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { getComments } from "../api/comments";
import CommentsList from "./CommentsList ";
import { deleteComments } from "../api/comments";
import { useLocation, useNavigate } from "react-router-dom";

function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddMovie,
  watched,
  onAddComment,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const [comment, setComment] = useState("");
  const [commentData, setCommentData] = useState({});

  const navigate = useNavigate();

  const countRef = useRef(0);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
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

  const handleAddComment = async (comment) => {
    if (!id) {
      navigate("/login");
      return;
    }

  if(comment.trim() === "") return;

    const { commentData, message } = await onAddComment(comment, selectedId);
    if (!commentData) {
      console.error("Failed to add comment:", message);
      return;
    }

    setCommentData(commentData);
  };

  function handleAdd() {
    if (!id) {
      navigate("/login");
      return;
    }
    try {
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
      handleAddComment(comment);
      onCloseMovie();
    } catch (err) {
      console.log("error: ", err);
    }
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
        // console.log(process.env.REACT_APP_OMDB_KEY)
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&i=${selectedId}`
        );

        const data = await res.json();

        const { commentData } = await getComments(selectedId);
        setMovie(data);
        setCommentData(commentData);
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
          <header className="flex text-sm relative">
            <button
              className="btn-back fixed ml-2 mt-2 h-7 w-7 text-base bg-white text-color-background-500 rounded-full flex items-center justify-center shadow-3xl"
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
              <h2 className="mb-1 text-2xl font-semibold">{title}</h2>
              <p className="m-0">
                {released} &bull; {runtime}
              </p>
              <p className="m-0">{genre}</p>
              <p className="flex items-center gap-2 m-0">
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section className="flex flex-col p-10 gap-6">
            <div className="rating bg-color-background-100 rounded-xl px-6 py-4 mb-2 font-semibold flex flex-col gap-4 ">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating && (
                    <>
                      <textarea
                        type="textarea"
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="rounded-xl resize-none overflow-scroll px-3 py-2 bg-color-background-500 placeholder:text-color-text-dark text-color-text scrollbar-thin scrollbar-thumb-color-background-100 scrollbar-track-color-background-500 scrollbar-thumb-rounded-full scrollbar-thumb-rounded-full"
                      />
                      <button
                        className="bg-color-primary text-color-text p-2 font-bold rounded-full cursor-pointer hover:bg-color-primary-light"
                        onClick={handleAdd}
                      >
                        <FontAwesomeIcon icon={faPlus} /> Add to list
                      </button>
                    </>
                  )}
                </>
              ) : (
                <p className="text-sm m-0">
                  You rated with movie {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p className="text-sm m-0">
              <em>{plot}</em>
            </p>
            <p className="text-sm m-0">Starring {actors}</p>
            <p className="text-sm m-0">Directed by {director}</p>
          </section>
          <footer>
            <CommentsList
              commentData={commentData}
              onSetCommentData={setCommentData}
              onAddComment={handleAddComment}
            />
          </footer>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
