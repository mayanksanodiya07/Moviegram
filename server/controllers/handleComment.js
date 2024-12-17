const Comment = require("../models/comment");
const User = require("../models/user");

async function handlePostComment(req, res) {
  const { movieId, comment, userId } = req.body;

  try {
    const [comments, user] = await Promise.all([
      Comment.findOne({ movieId }),
      User.findById(userId),
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!comments) {
      const newComment = await Comment.create({
        movieId,
        comments: [{ userId, comment, email: user.email }],
      });

      return res.status(200).json({
        message: "Comment added successfully",
        commentData: newComment,
      });
    }

    comments.comments.push({ userId, comment, email: user.email });
    await comments.save();

    return res.status(200).json({
      message: "Comment added successfully",
      commentData: comments,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "An error occurred during adding." });
  }
}


async function handleGetComment(req, res) {
  const { movieId } = req.query;
  try {
    const comments = await Comment.findOne({ movieId });
    if (comments) {
      return res.status(200).json({
        commentData: comments,
      });
    }
    return res.status(200).json({
      commentData: {},
    });
  } catch (error) {
    console.error("Error during adding:", error);
    res.status(500).json({ message: "An error occurred during adding." });
  }
}

async function handleDeleteComment(req, res) {
  const { movieId, userId, commentId } = req.body;
  try {
    const comments = await Comment.findOne({ movieId });

    if (!comments) {
      return res.status(404).json({
        message: "Comments not found for the given movie ID",
      });
    }

    const commentIndex = comments.comments.findIndex(
      (comment) =>
        comment.userId === userId && comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).json({
        message: "Comment not found for the given user ID",
      });
    }

    comments.comments.splice(commentIndex, 1);
    await comments.save();

    return res.status(200).json({
      message: "Comment deleted successfully",
      commentData: comments,
    });
  } catch (error) {
    console.error("Error during deleting comment:", error);
    res
      .status(500)
      .json({ message: "An error occurred during deleting the comment." });
  }
}

module.exports = {
  handlePostComment,
  handleGetComment,
  handleDeleteComment,
};
