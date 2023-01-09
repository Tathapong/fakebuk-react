import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Modal from "../../components/ui/Modal";

function AuthForm() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div className="border border-1 shadow p-3 bg-white mx-auto rounded-lg max-w-99">
      <LoginForm />
      <hr className="hr-sm" />
      <div className="text-center tw-py-2.5">
        <button className="btn fw-bold btn-green rounded-md h-12" type="button" onClick={() => setModalIsOpen(true)}>
          Create New Account
        </button>
      </div>
      <Modal title="Sign up" modalIsOpen={modalIsOpen} modalOnClose={() => setModalIsOpen(false)}>
        <RegisterForm />
      </Modal>
    </div>
  );
}

export default AuthForm;
