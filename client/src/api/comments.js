import axios from "axios";

export const getComments = async (movieId) => {
  try {
    const res = await axios.get(`http://localhost:5000/comment`, {
      params: { movieId },
    });
    return res.data;
  } catch (err) {
    console.error("error", err?.response?.data);
  }
};

export const deleteComment = async (movieId, userId, commentId) => {
  try {
    const res = await axios.delete(`http://localhost:5000/comment`, {
      data: {
        movieId,
        userId,
        commentId,
      },
    });
    return res.data;
  } catch (err) {
    console.error("error", err?.response?.data);
  }
};
