import Comment from "./Comment";
import { useState, useEffect } from "react";

function CommentList({ post: { Comments: comments, id: postId }, updateComment, deleteComment }) {
  const max = 3;
  const [maxComment, setMaxComment] = useState(max);
  const [isOpen, setIsOpen] = useState(true);

  const toggleComment = () => {
    setMaxComment(comments.length);
    setIsOpen(false);
  };

  return (
    <>
      <div className="pt-1">
        <small className="text-muted hover-underline" role="button" onClick={toggleComment}>
          {isOpen ? comments.length > max && `View ${comments.length - max} previous comments` : ""}
        </small>
      </div>
      {comments
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) return 1;
          if (a.createdAt === b.createdAt) return 0;
          if (a.createdAt < b.createdAt) return -1;
        })
        .slice(-maxComment)
        .map((item) => {
          return (
            <Comment
              key={item.id}
              comment={item}
              updateComment={updateComment}
              deleteComment={deleteComment}
              postId={postId}
            />
          );
        })}
    </>
  );
}

export default CommentList;
