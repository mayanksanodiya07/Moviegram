import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const CommentBox = ({ onAddComment }) => {
  const [text, setText] = useState("");

  const handleInputChange = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    setText(textarea.value);
  };
  const isSendEnabled = text.trim() !== "";
  const handleAddComment = async () => {
    if(isSendEnabled){

      await onAddComment(text.trim());
      setText("")
    }
  };

  return (
    <div className="flex mb-4 relative">
      <textarea
        value={text}
        onChange={handleInputChange}
        placeholder="Add a comment..."
        className="resize-none text-base w-full border-b-[1px] pb-2 pr-12 border-color-text-dark bg-color-background-500 focus:border-color-text grow focus:outline-none "
        rows="1"
        style={{ overflow: "hidden" }}
      />
      <span
        className={`absolute right-0 -top-2 w-9 h-9 cursor-pointer flex items-center justify-center rounded-full hover:bg-color-primary-light hover:text-color-text ${
          isSendEnabled
            ? "bg-color-primary-light text-color-text"
            : "text-color-text-dark"
        }`}
        onClick={handleAddComment}
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </span>
    </div>
  );
};

export default CommentBox;
