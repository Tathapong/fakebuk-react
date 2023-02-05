import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunk_login } from "../../stores/features/auth/myUserSlice";
import { toast } from "react-toastify";

function LoginForm() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    emailOrMobile: "",
    password: ""
  });

  const handleChangeInput = (ev) => {
    setInput({ ...input, [ev.target.name]: ev.target.value });
  };

  const handleSubmitForm = async (ev) => {
    ev.preventDefault();
    try {
      await dispatch(thunk_login(input));
      toast.success("success login");
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    } finally {
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="mb-3">
        <input
          type="text"
          className="form-control rounded-md h-13"
          placeholder="Email address or phone number"
          name="emailOrMobile"
          value={input.emailOrMobile}
          onChange={handleChangeInput}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control rounded-md h-13"
          placeholder="Password"
          name="password"
          value={input.password}
          onChange={handleChangeInput}
        />
      </div>
      <div className="mb-2 d-grid">
        <button type="submit" className="btn btn-primary fw-bold rounded-md h-12 text-4.5">
          Log In
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
