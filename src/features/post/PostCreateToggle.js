import Avatar from "../../components/ui/Avatar";
import Modal from "../../components/ui/Modal";
import PostForm from "./PostForm";

import { Link } from "react-router-dom";
import { useState } from "react";
import { thunk_createPost } from "../../stores/features/posts/postSlice";
import { useDispatch } from "react-redux";

function PostCreateToggle({ user }) {
  const dispatch = useDispatch();
  const { id, profileImage, firstName } = user;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const createPost = async (input) => await dispatch(thunk_createPost(input));

  return (
    <div className="border bg-white shadow-sm px-3 rounded-lg tw-py-3">
      <div className="d-flex gap-2">
        <Link to={`/profile/${id}`}>
          <Avatar src={profileImage} size="40" />
        </Link>
        <button className="btn rounded-pill text-muted text-start flex-1 btn-gray-200" onClick={openModal}>
          {` What's on your mind, ${firstName}?`}
        </button>
      </div>
      <Modal title="Create Post" open={modalIsOpen} onClose={closeModal}>
        <PostForm firstName={firstName} onSubmit={createPost} onClose={closeModal} isOpen={modalIsOpen} />
      </Modal>
    </div>
  );
}

export default PostCreateToggle;
