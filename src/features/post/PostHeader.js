import { Link } from "react-router-dom";
import Avatar from "../../components/ui/Avatar";
import { timeSince } from "../../utilities/dateFormat";
import { useState, useCallback } from "react";
import Modal from "../../components/ui/Modal";
import PostForm from "./PostForm";
import { useAuth } from "../../contexts/AuthContext";
import DeleteConfirm from "./DeleteConfirm";
import { useClickOutSide } from "../../hooks/useClickOutside";

function PostHeader({ post, updatePost, deletePost }) {
  const {
    createdAt: postCreatedAt,
    id: postId,
    User: { profileImage, id, firstName, lastName }
  } = post;
  const closeDropdown = useCallback(() => setDropdownOpen(false), []);
  const dropdownEl = useClickOutSide(closeDropdown);

  const {
    user: { id: userId }
  } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((dropdownOpen) => !dropdownOpen);
  };

  const handleClickEdit = () => {
    setModalEditIsOpen(true);
    setDropdownOpen(false);
  };

  const handleClickDelete = () => {
    setModalDeleteIsOpen(true);
    setDropdownOpen(false);
  };

  const onSubmitUpdatePost = async (input) => {
    await updatePost(postId, input);
  };

  const onSubmitDeletePost = async () => {
    setModalDeleteIsOpen(false);
    setTimeout(async () => await deletePost(postId), 400);
  };

  return (
    <div className="d-flex align-items-center gap-2">
      <Link to={`/profile/${id}`}>
        <Avatar src={profileImage} size="40" />
      </Link>
      <div className="d-flex flex-column align-items-start flex-fill">
        <Link to={`/profile/${id}`} className="text-dark fw-bold no-underline hover-underline text-3.5">
          {`${firstName} ${lastName}`}
        </Link>
        <small className="text-muted text-3">{timeSince(postCreatedAt)}</small>
      </div>
      {userId === post.User.id && (
        <div className="dropdown" ref={dropdownEl}>
          <button onClick={toggleDropdown} className="btn rounded-circle position-relative h-9 w-9 hover-bg-gray-200 ">
            <i className="fa-solid fa-ellipsis text-muted position-absolute top-50 left-50 translate-middle" />
          </button>
          <div className={`dropdown-menu end-0 mt-1 ${dropdownOpen && "d-block"}`}>
            <button className="dropdown-item" onClick={handleClickEdit}>
              Edit
            </button>
            <button className="dropdown-item" onClick={handleClickDelete}>
              Delete
            </button>
          </div>
          <Modal title="Edit Post" open={modalEditIsOpen} onClose={() => setModalEditIsOpen(false)}>
            <PostForm
              firstName={firstName}
              onSubmit={onSubmitUpdatePost}
              onClose={() => setModalEditIsOpen(false)}
              post={post}
              isOpen={modalEditIsOpen}
            />
          </Modal>
          <Modal title="Delete confirm?" open={modalDeleteIsOpen} onClose={() => setModalDeleteIsOpen(false)}>
            <DeleteConfirm
              onClose={() => setModalDeleteIsOpen(false)}
              onSubmit={onSubmitDeletePost}
              title="Do you confirm to delete the Post?"
            />
          </Modal>
        </div>
      )}
    </div>
  );
}

export default PostHeader;
