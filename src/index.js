import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App-v2';
// import StarRating from "./StarRating";

// function Test(){
//   const [movieRating, setMovieRating] = useState(0);

//   return <div>
//     <StarRating onMovieRating = {setMovieRating}/>
//     <p>This movie was rated {movieRating} stars</p>
//   </div>
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      className="test"
      message={["Terrible", "Bod", "Ok", "Good", "Amazing"]}
    />

    <Test/> */}
  </React.StrictMode>
);

console.log(__dirname);
