import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../stores/features/auth/userSlice";

function PostAction({ post, toggleLike, toggleComment }) {
  const { Likes: likes, id: postId } = post;
  const user = useSelector(selectUser);
  const { id } = user;

  const [isUserLiked, setIsUserLiked] = useState(Boolean(likes.find((item) => item.userId === id)));

  return (
    <div className="d-flex gap-1 py-1">
      <button
        className={`btn ${
          isUserLiked ? "text-primary" : "text-muted"
        } flex-1 d-flex align-items-center justify-content-center gap-2 hover-bg-gray-200`}
        onClick={() => {
          toggleLike(postId);
          setIsUserLiked((isUserLiked) => !isUserLiked);
        }}
      >
        <i className="fa-regular fa-thumbs-up" />
        <small className="fw-bold">Like</small>
      </button>
      <button
        className="btn text-muted flex-1 d-flex align-items-center justify-content-center gap-2 hover-bg-gray-200"
        onClick={toggleComment}
      >
        <i className="fa-regular fa-message" />
        <small className="fw-bold">Comment</small>
      </button>
    </div>
  );
}

export default PostAction;
