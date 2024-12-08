import { Spinner } from "react-bootstrap";

function LoadingSpinner() {
  return (
    <div className="absolute z-10 flex items-center justify-center">
      <Spinner
        animation="border"
        style={{
          height: "3.5rem",
          width: "3.5rem",
          color: "#7950f2",
          borderWidth: "0.5rem",
        }}
      />
    </div>
  );
}

export default LoadingSpinner;
