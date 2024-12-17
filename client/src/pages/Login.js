import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function FacutyLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("mayank@gmail.com");
  const [password, setPassword] = useState("Pass@123");
  const [loginStatus, setLoginStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      return;
    }

    // Validate password
    if (validatePassword(email)) {
      setPasswordError(
        "Password must be at least 8 characters, with uppercase, lowercase, numbers, and special characters."
      );
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setLoginStatus("Logged in Successfully");
      navigate(`/home?id=${res.data.user._id}`);
    } catch (err) {
      setLoginStatus(err?.response?.data?.message || "An error occurred.");
      console.error("error", err?.response?.data);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="h-screen p-10 bg-color-background-900 grid grid-cols-2">
      <div className="flex items-center justify-center">
        <span className="text-[10rem]">🎞️</span>
      </div>
      <div className="mx-auto w-full bg-color-primary px-4 py-4 border-0 flex justify-center flex-col items-center">
        <div>
          <h1 className="font-bold text-3xl mb-3 text-color-background-900 text-center">
            Login
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex w-60 flex-col items-center"
          >
            {/* Email Input */}
            <input
              className="py-1 px-3 mb-3 w-full border rounded-full"
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

            {/* Password Input */}
            <div className="relative w-full">
              <input
                className="py-1 px-3 mb-3 w-full border rounded-full"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-3 py-1 cursor-pointer"
              >
                <FontAwesomeIcon
                  className="w-9"
                  icon={showPassword ? faEyeSlash : faEye}
                />
              </span>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm mb-3">{passwordError}</p>
            )}

            {/* Login CustomButton */}
            <span>
              <CustomButton type={"small"}>Login</CustomButton>
            </span>
            <p className="text-red-500 mt-2">{loginStatus}</p>

            {/* Links for Forgot Password and Sign Up */}
            <p className="w-fit mx-auto mt-2">
              <Link
                to="/faculty/forgot-password"
                className="text-color-background-900"
              >
                Forgot Password?
              </Link>
            </p>
            <p className="w-fit mx-auto mt-2 text-color-background-900">
              Click here for{" "}
              <Link
                to={"/signup"}
                className="underline text-color-background-900 cursor-pointer"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FacutyLoginPage;
