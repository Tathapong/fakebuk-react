import Avatar from "../../components/ui/Avatar";

import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectMe } from "../../stores/features/auth/myUserSlice";
import { thunk_createComment } from "../../stores/features/posts/postSlice";

function CommentForm({ isCommentOpen, post }) {
  const dispatch = useDispatch();
  const inputEl = useRef();

  const { id: postId } = post;

  const user = useSelector(selectMe);
  const { profileImage, id } = user;

  const handleKeyUpEnter = async (ev) => {
    try {
      if (ev.keyCode === 13) {
        const input = inputEl.current.value;
        if (input.trim()) {
          const title = input.trim();
          await dispatch(thunk_createComment(postId, { title }));
          inputEl.current.value = "";
        }
      }
      if (ev.keyCode === 27) inputEl.current.value = "";
    } catch (err) {
      console.log(err.message);
    } finally {
    }
  };

  useEffect(() => {
    if (isCommentOpen) inputEl.current.focus();
  }, [isCommentOpen]);

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
