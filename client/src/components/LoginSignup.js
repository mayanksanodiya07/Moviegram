import { useNavigate } from "react-router-dom";

function LoginSignup() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="relative float-right">
        <button
          className="bg-color-primary-light mr-4 rounded-full w-20 h-10 font-semibold shadow-2xl hover:shadow-lg transition-all duration-100"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="bg-color-primary-light rounded-full w-20 h-10 font-semibold shadow-2xl hover:shadow-lg transition-all "
          onClick={() => navigate("/signup")}
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default LoginSignup;
