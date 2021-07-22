import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getCommentsOfVideoById,
} from "../../redux/actions/comments.action";
import Comment from "../comment/Comment";
import "./_comments.scss";

export const Comments = ({ videoId, totalComments }) => {
  const handleSubmit = () => {};
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsOfVideoById(videoId));
  }, [videoId, dispatch]);

  const comments = useSelector((state) => state.commentList.comments);
  const user = useSelector((state) => state.auth?.user);

  const [text, setText] = useState("");

  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );

  const handleComment = (e) => {
    e.preventDefault();
    if (text.length === 0) return;

    dispatch(addComment(videoId, text));

    setText("");
  };

  return (
    <div className="comments">
      <p>{totalComments} Comments</p>
      <div className="comments__form d-flex w-100 my-2">
        <img
          src={user?.photoUrl}
          alt="avatar"
          className="mr-3 rounded-circle"
        />

        <form onSubmit={handleComment} className="d-flex flex-grow-1">
          <input
            type="text"
            value={text}
            className="flex-grow-1"
            placeholder="write a comment"
            onChange={(e) => setText(e.target.value)}
          />
          <button className="border-0 p-2 ">Comment</button>
        </form>
      </div>
      <div className="comments__list">
        {_comments?.map((comment, i) => (
          <Comment comment={comment} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
