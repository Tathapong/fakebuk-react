import { useState } from "react";
import Modal from "../../components/ui/Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthForm() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => setModalIsOpen(false);
  const openModal = () => setModalIsOpen(true);

  return (
    <div className="border border-1 shadow p-3 bg-white mx-auto rounded-lg max-w-99">
      <LoginForm />
      <hr className="hr-sm" />
      <div className="text-center tw-py-2.5">
        <button className="btn fw-bold btn-green rounded-md h-12" type="button" onClick={openModal}>
          Create New Account
        </button>
      </div>
      <Modal title="Sign up" open={modalIsOpen} onClose={closeModal}>
        <RegisterForm onSuccess={closeModal} />
      </Modal>
    </div>
  );
}

export default AuthForm;
