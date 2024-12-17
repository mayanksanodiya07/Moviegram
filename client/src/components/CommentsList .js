import React from "react";
import SingleComment from "./SingleComment";
import { deleteComment } from "../api/comments";
import CommentBox from "./CommentBox";
import { useLocation } from "react-router-dom";

const CommentsList = ({ commentData, onSetCommentData, onAddComment }) => {
  const { movieId, comments = [] } = commentData;
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("id");
  const handleDeleteComment = async (commentId) => {
    try {
      const { commentData } = await deleteComment(movieId, userId, commentId);
      onSetCommentData(commentData);
    } catch (err) {
      console.error("error", err?.response?.data);
    }
  };

  return (
    <ul className="p-10 border-t border-b-color-text-dark ">
      <p className="font-semibold mb-1">
        {comments.length <= 1
          ? `${comments.length} Comment:`
          : `${comments.length} Comments:`}
      </p>
      <CommentBox onAddComment={onAddComment} />
      {comments
        .slice()
        .reverse()
        .map((comment, index) => (
          <SingleComment
            key={index}
            comment={comment}
            handleDeleteComment={handleDeleteComment}
            userId={userId}
          />
        ))}
    </ul>
  );
};

export default CommentsList;
