import React from "react";
import moment from "moment";
import "./_comment.scss";

export const Comment = ({ comment }) => {
  const { authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay } =
    comment;
  return (
    <div className="comment d-flex p-2">
      <img src={authorProfileImageUrl} alt="" className="rounded-circle mr-3" />

      <div className="comment_body">
        <p className="comment__header mb-1">
          {authorDisplayName} • {moment(publishedAt).fromNow()}
        </p>
        <p className="mb-2">{textDisplay}</p>
      </div>
    </div>
  );
};

export default Comment;
