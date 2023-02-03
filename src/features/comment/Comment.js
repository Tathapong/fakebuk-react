import Avatar from "../../components/ui/Avatar";
import Modal from "../../components/ui/Modal";
import DeleteConfirm from "../post/DeleteConfirm";

import { Link } from "react-router-dom";
import { timeSince } from "../../utilities/dateFormat";
import { useState, useCallback } from "react";
import { useClickOutSide } from "../../hooks/useClickOutside";
import { useSelector, useDispatch } from "react-redux";
import { selectMe } from "../../stores/features/auth/usersSlice";
import { thunk_deleteComment, thunk_updateComment } from "../../stores/features/posts/postSlice";

function Comment({ comment, postId }) {
  const {
    id: commentId,
    title,
    createdAt,
    User: { id: userId, firstName, lastName, profileImage }
  } = comment;

  const dispatch = useDispatch();
  const user = useSelector(selectMe);
  const { id: currentId } = user;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [commentInput, setCommentInput] = useState(title);

  const toggleDropdown = () => {
    setDropdownOpen((dropdownOpen) => !dropdownOpen);
  };

  const handleClickEditButton = () => {
    setIsEdit(true);
    setDropdownOpen(false);
  };

  const handleClickDeleteButton = () => {
    setModalDeleteIsOpen(true);
    setDropdownOpen(false);
  };

  const handleKeyUpEdit = async (ev) => {
    try {
      if (ev.keyCode === 27) {
        setCommentInput(title);
        setIsEdit(false);
      }
      if (ev.keyCode === 13) {
        if (commentInput.trim()) {
          await dispatch(thunk_updateComment(postId, commentId, commentInput));
          setCommentInput(title);
          setIsEdit(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickDelete = async (ev) => {
    try {
      setModalDeleteIsOpen(false);
      await dispatch(thunk_deleteComment(postId, commentId));
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const handleClickCancelEdit = (ev) => {
    setCommentInput(title);
    setIsEdit(false);
  };
  const closeDropdown = useCallback(() => setDropdownOpen(false), []);
  const dropdownEl = useClickOutSide(closeDropdown);

  return (
    <div className="pt-2 d-flex flex-column gap-1">
      <div className="d-flex gap-2">
        <Link to={`/profile/${userId}`}>
          <Avatar src={profileImage} size="32" />
        </Link>

        <div className="d-flex flex-column">
          <div className="d-flex align-items-center gap-1">
            {isEdit ? (
              <div>
                <input
                  className="form-control rounded-pill shadow-none border-0 h-9 text-3.5 bg-gray-200 focus-bg-gray-200 bg-light"
                  placeholder="Write a comment..."
                  onKeyUp={handleKeyUpEdit}
                  value={commentInput}
                  onChange={(ev) => setCommentInput(ev.target.value)}
                />
                <small style={{ fontSize: "11px" }} className="ms-3">
                  Press ESC or click
                  <span onClick={handleClickCancelEdit} role="button" className="text-primary">
                    {" "}
                    cancel
                  </span>
                </small>
              </div>
            ) : (
              <div className="d-flex flex-column align-items-start tw-py-2 tw-px-3 bg-gray-200 rounded-2xl">
                <a href="/#" className="text-dark fw-bold no-underline hover-underline text-3">
                  {`${firstName} ${lastName}`}
                </a>
                <small>{title}</small>
              </div>
            )}

            <div className="dropdown" ref={dropdownEl}>
              {!isEdit && currentId === userId && (
                <button
                  className="btn rounded-circle position-relative  h-8 w-8 hover-bg-gray-200"
                  onClick={toggleDropdown}
                >
                  <i className="fa-solid fa-ellipsis text-muted position-absolute top-50 left-50 translate-middle" />
                </button>
              )}

              <div className={`dropdown-menu start-100 top-0 mt-1 ${dropdownOpen && "d-block"}`}>
                <button className="dropdown-item" onClick={handleClickEditButton}>
                  Edit
                </button>
                <button className="dropdown-item" onClick={handleClickDeleteButton}>
                  Delete
                </button>
              </div>
            </div>
          </div>
          <Modal title="Delete confirm?" open={modalDeleteIsOpen} onClose={() => setModalDeleteIsOpen(false)}>
            <DeleteConfirm
              onClose={() => setModalDeleteIsOpen(false)}
              title="Do you confirm to delete the Comment?"
              onSubmit={handleClickDelete}
            />
          </Modal>

          <span className="text-muted ms-2 text-3">{timeSince(createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

export default Comment;
