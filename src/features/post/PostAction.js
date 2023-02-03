import { useSelector, useDispatch } from "react-redux";
import { selectIsUserLike, thunk_toggleLike } from "../../stores/features/posts/postSlice";

function PostAction({ post, toggleComment }) {
  const dispatch = useDispatch();
  const { id: postId } = post;

  const isUserLiked = useSelector((state) => selectIsUserLike(state, postId));

  const toggleLike = async () => {
    try {
      await dispatch(thunk_toggleLike(postId));
    } catch (err) {
      console.log(err.message);
    } finally {
    }
  };

  return (
    <div className="d-flex gap-1 py-1">
      <button
        className={`btn ${
          isUserLiked ? "text-primary" : "text-muted"
        } flex-1 d-flex align-items-center justify-content-center gap-2 hover-bg-gray-200`}
        onClick={toggleLike}
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
