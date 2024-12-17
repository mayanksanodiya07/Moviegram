import axios from "axios";

const checkUserLoggedIn = async (userId) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/auth/verify",
      { userId },
      { withCredentials: true }
    );
    return res.data.loggedIn;
  } catch (err) {
    console.error(
      "Error during authentication check:",
      err?.response?.data || err.message
    );
    return false;
  }
};

export default checkUserLoggedIn;
