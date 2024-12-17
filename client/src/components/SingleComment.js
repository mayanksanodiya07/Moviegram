import React, { useEffect, useRef, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPencil,
  faTrashCan,
  faUser,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faFlag } from "@fortawesome/free-regular-svg-icons";

const SingleComment = ({ comment, handleDeleteComment, userId }) => {
  const { email, comment: text, date, _id: commentId } = comment;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHoveredOnHeart, setIsHoveredOnHeart] = useState(false);

  const loggedInUser = comment.userId === userId;

  const colors = [
    "#b790cc",
    "#45ad9a",
    "#6f6aba",
    "#7c96c2",
    "#3fc6a8",
    "#85a244",
    "#645694",
    "#7b9b61",
    "#b17e74",
    "#3a73cc",
    "#7c656e",
    "#75b24d",
    "#5b82c0",
    "#898792",
    "#67a252",
    "#b3a74f",
  ];

  const charSum = email
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  // Determine the color index
  const colorIndex = charSum % colors.length;

  console.log(colors[colorIndex]);
  const menuRef = useRef(null);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="m-0 mb-4 flex ">
      <div
        className={`w-9 h-9 bg-[${colors[colorIndex]}] flex items-center justify-center rounded-full text-xl mr-3 mt-2.5`}
      >
        <FontAwesomeIcon icon={faUser} />
      </div>
      <div className="grow">
        <div className="text-sm text-color-text">
          {email}
          <span className="text-xs ml-2 text-color-text-dark">
            {date && formatDistanceToNow(new Date(date), { addSuffix: true })}
          </span>
        </div>
        <p className="m-0 text-base text-color-text">{text}</p>
        <span
          onMouseEnter={() => setIsHoveredOnHeart(true)}
          onMouseLeave={() => setIsHoveredOnHeart(false)}
          className="cursor-pointer"
        >
          {isHoveredOnHeart ? (
            <FontAwesomeIcon
              icon={faHeartSolid}
              className="text-xs text-red-500"
            />
          ) : (
            <FontAwesomeIcon icon={faHeart} className="text-xs" />
          )}
        </span>
      </div>
      <div className="relative mt-2.5">
        <div
          className={`w-9 h-9 cursor-pointer flex items-center justify-center rounded-full hover:bg-color-background-100`}
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </div>
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="z-20 absolute right-0 bg-color-background-900 shadow-md rounded-lg w-32"
          >
            <ul className="text-sm p-0 py-2">
              {loggedInUser ? (
                <>
                  <li
                    className="py-2 !pl-5 hover:bg-color-background-500 cursor-pointer"
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faPencil} className="mr-2" />
                    Edit
                  </li>
                  <li
                    className="py-2 !pl-5 hover:bg-color-background-500 cursor-pointer"
                    onClick={() => {
                      handleDeleteComment(commentId);
                      setIsMenuOpen(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashCan} className="mr-2" />
                    Delete
                  </li>
                </>
              ) : (
                <li
                  className="py-2 !pl-5 hover:bg-color-background-500 cursor-pointer"
                  onClick={() => {
                    handleDeleteComment(commentId);
                    setIsMenuOpen(false);
                  }}
                >
                  <FontAwesomeIcon icon={faFlag} className="mr-2" />

                  Report
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleComment;
