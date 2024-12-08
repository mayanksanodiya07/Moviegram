import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import { useState } from "react";
import LoadingSpinner from "../components/Loading";

import axios from "axios";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupStatus, setSignupStatus] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setLoading(true);
      try {
        const res = await axios.post("http://localhost:5000/signup", {
          email,
          password,
        });
        navigate("/login", { state: { email } });
        console.log(res.data)
      } catch (err) {
        console.error("error", err?.response?.data);
        setSignupStatus(err?.response?.data);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="h-screen p-10 bg-color-background-900 grid grid-cols-2">
      <div className="mx-auto w-full bg-color-primary px-4 py-4 border-0 flex justify-center flex-col items-center">
        {loading && <LoadingSpinner />}
        <div className={`${loading ? "blur-sm pointer-events-none" : ""}`}>
          <h1 className="font-bold text-3xl mb-3 text-color-background-900 text-center">
            Signup
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              className="py-1 px-3 mb-3 w-full border rounded-full"
              type="email"
              id="email"
              name="email"
              placeholder="E-mail address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="py-1 px-3 mb-3 w-full border rounded-full"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="py-1 px-3 ml-1 mb-3 w-full border rounded-full"
              type="password"
              id="confirm-password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span>
              <CustomButton type={"small"}>SignUp</CustomButton>
            </span>
            <p className="text-red-500">{signupStatus}</p>
            <p className="w-fit mx-auto mt-2 text-color-background-900">
              click here for{" "}
              <Link
                to={"/login"}
                className="underline cursor-pointer text-color-background-900"
              >
                Login
              </Link>
            </p>
          </form>
          {/* <div className="relative flex items-center w-full mt-3">
            <span className="flex-grow h-px bg-gray-300"></span>
            <span className="px-2 text-gray-500 text-sm">OR</span>
            <span className="flex-grow h-px bg-gray-300"></span>
          </div>
          <div className="w-full mt-3">
            <OrAuth />
          </div> */}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-[10rem]">🍿</span>
      </div>
    </div>
  );
}

export default SignupPage;
