import Modal from "../../components/ui/Modal";
import { useState } from "react";

import ImageForm from "./ImageForm";
import { useSelector } from "react-redux";
import { selectMe } from "../../stores/features/auth/myUserSlice";

function ProfileEdit() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const user = useSelector(selectMe);
  const { profileImage, coverImage } = user;

  const openEditModal = () => setModalIsOpen(true);
  const closeEditModal = () => setModalIsOpen(false);

  return (
    <>
      <button className="btn btn-secondary" onClick={openEditModal}>
        <i className="fa-solid fa-pen" /> Edit Profile
      </button>
      <Modal title="Edit profile" open={modalIsOpen} onClose={closeEditModal}>
        <ImageForm title="Profile Picture" open={modalIsOpen} onSuccess={closeEditModal} profileImage={profileImage} />
        <ImageForm title="Cover Photo" open={modalIsOpen} onSuccess={closeEditModal} coverImage={coverImage} />
      </Modal>
    </>
  );
}

export default ProfileEdit;
