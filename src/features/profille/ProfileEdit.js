import Modal from "../../components/ui/Modal";
import { useState } from "react";

import ImageForm from "./ImageForm";
import { useSelector } from "react-redux";
import { selectMe } from "../../stores/features/auth/usersSlice";

function ProfileEdit() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(selectMe);
  const { profileImage, coverImage } = user;

  return (
    <>
      <button className="btn btn-secondary" onClick={() => setIsOpen(true)}>
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
