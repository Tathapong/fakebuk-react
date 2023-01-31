import { Link } from "react-router-dom";
import Avatar from "../../components/ui/Avatar";
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../stores/features/auth/userSlice";

function CommentForm({ isCommentOpen, createComment, post }) {
  const inputEl = useRef();

  const { id: postId } = post;

  const user = useSelector(selectUser);
  const { profileImage, id } = user;

  const handleKeyUpEnter = async (ev) => {
    try {
      if (ev.keyCode === 13) {
        const input = inputEl.current.value;
        if (input.trim()) {
          const title = input.trim();
          await createComment(postId, { title });
          inputEl.current.value = "";
        }
      }
      if (ev.keyCode === 27) inputEl.current.value = "";
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  useEffect(() => {
    if (isCommentOpen) inputEl.current.focus();
  }, []);

  return (
    <div className="d-flex pt-1 gap-2">
      <Link to={`/profile/${id}`}>
        <Avatar src={profileImage} size="32" />
      </Link>

      <input
        className="form-control rounded-pill shadow-none border-0 h-9 text-3.5 bg-gray-200 focus-bg-gray-200 bg-light"
        placeholder="Write a comment..."
        ref={inputEl}
        onKeyUp={handleKeyUpEnter}
      />
    </div>
  );
}

export default CommentForm;
