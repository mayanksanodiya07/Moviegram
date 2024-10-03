import { useEffect, useRef } from "react";

function SearchBar({ query, onSetQuery }) {
  const inputEl = useRef(null);

  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === inputEl.current) return;

        if (e.code === "Enter") {
          inputEl.current.focus();
          onSetQuery("");
          // console.log("hii");
        }
      }
      document.addEventListener("keydown", callback);
      return () => document.addEventListener("keydown", callback);
    },
    [onSetQuery]
  );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

export default SearchBar;