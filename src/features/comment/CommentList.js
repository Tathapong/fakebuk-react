import Comment from "./Comment";
import { useState } from "react";

function CommentList({ post }) {
  const { Comments: comments, id: postId } = post;
  const max = 3;
  const [maxComment, setMaxComment] = useState(max);
  const [isOpen, setIsOpen] = useState(true);

  const orderedComments = Array.from(comments).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const toggleComment = () => {
    setMaxComment(orderedComments.length);
    setIsOpen(false);
  };

  return (
    <>
      <div className="pt-1">
        <small className="text-muted hover-underline" role="button" onClick={toggleComment}>
          {isOpen ? orderedComments?.length > max && `View ${orderedComments.length - max} previous comments` : ""}
        </small>
      </div>
      {orderedComments.slice(-maxComment).map((item) => {
        return <Comment key={item.id} comment={item} postId={postId} />;
      })}
    </>
  );
}

export default CommentList;
