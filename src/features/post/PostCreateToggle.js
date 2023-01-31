import Avatar from "../../components/ui/Avatar";
import Modal from "../../components/ui/Modal";
import PostForm from "./PostForm";

import { Link } from "react-router-dom";
import { useState } from "react";
import { selectUser } from "../../stores/features/auth/userSlice";
import { useSelector } from "react-redux";

function PostCreateToggle({ createPost }) {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(selectUser);
  const { id, profileImage, firstName } = user;

  const savePost = async (input) => {
    await createPost(input);
  };

  return (
    <div className="border bg-white shadow-sm px-3 rounded-lg tw-py-3">
      <div className="d-flex gap-2">
        <Link to={`/profile/${id}`}>
          <Avatar src={profileImage} size="40" />
        </Link>
        <button className="btn rounded-pill text-muted text-start flex-1 btn-gray-200" onClick={() => setIsOpen(true)}>
          {` What's on your mind, ${firstName}?`}
        </button>
      </div>
      <Modal title="Create Post" open={isOpen} onClose={() => setIsOpen(false)}>
        <PostForm firstName={firstName} onSubmit={savePost} onClose={() => setIsOpen(false)} isOpen={isOpen} />
      </Modal>
    </div>
  );
}

export default PostCreateToggle;
