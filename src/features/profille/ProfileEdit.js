import Modal from "../../components/ui/Modal";
import { useState } from "react";

import ImageForm from "./ImageForm";
import { useAuth } from "../../contexts/AuthContext";

function ProfileEdit() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    user: { profileImage, coverImage }
  } = useAuth();

  return (
    <>
      <button className="btn btn-gray-200" onClick={() => setIsOpen(true)}>
        <i className="fa-solid fa-pen" /> Edit Profile
      </button>
      <Modal title="Edit profile" open={isOpen} onClose={() => setIsOpen(false)}>
        <ImageForm title="Profile Picture" onSuccess={() => setIsOpen(false)} profileImage={profileImage} />
        <ImageForm title="Cover Photo" onSuccess={() => setIsOpen(false)} coverImage={coverImage} />
      </Modal>
    </>
  );
}

export default ProfileEdit;
