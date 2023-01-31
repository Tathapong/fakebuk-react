import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../stores/features/auth/userSlice";
import { toast } from "react-toastify";
import { validateRegister } from "../../validations/userValidate";

function RegisterForm(props) {
  const { onSuccess } = props;

  const dispatch = useDispatch(); ///+redux
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    emailOrMobile: "",
    password: "",
    confirmPassword: ""
  });

  const handleChangeInput = (ev) => setInput({ ...input, [ev.target.name]: ev.target.value }); // เอาค่า name ของ element มาเป็น key ต้องใส่ Square bracket ด้วย

  const handleSubmitForm = async (ev) => {
    ev.preventDefault();

    const { error } = validateRegister(input);
    if (error) return toast.error(error.message);

    try {
      await dispatch(register(input));
      toast.success("success register");
      onSuccess();
    } catch (err) {
      toast.error(err.message);
    } finally {
    }
  };

  return (
    <form className="row gx-2 gy-3" onSubmit={handleSubmitForm}>
      <div className="col-6">
        <input
          className="form-control"
          type="text"
          name="firstName"
          placeholder="First name"
          value={input.firstName}
          onChange={handleChangeInput}
        />
      </div>
      <div className="col-6">
        <input
          className="form-control"
          type="text"
          name="lastName"
          placeholder="Last name"
          value={input.lastName}
          onChange={handleChangeInput}
        />
      </div>
      <div className="col-12">
        <input
          className="form-control"
          type="text"
          name="emailOrMobile"
          placeholder="Mobile number or email address"
          value={input.emailOrMobile}
          onChange={handleChangeInput}
        />
      </div>
      <div className="col-12">
        <input
          className="form-control"
          type="password"
          name="password"
          placeholder="New password"
          value={input.password}
          onChange={handleChangeInput}
        />
      </div>
      <div className="col-12">
        <input
          className="form-control"
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={input.confirmPassword}
          onChange={handleChangeInput}
        />
      </div>
      <div className="d-flex justify-content-center">
        <button
          type="submit"
          className="btn d-flex justify-content-center align-items-center btn-green text-4.5 h-9 tw-px-10"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
