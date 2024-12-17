import axios from "axios";

const checkUserLoggedIn = async (userId) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/verify`,
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
