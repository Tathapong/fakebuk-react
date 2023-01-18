import { useRef, useState } from "react";
import Avatar from "../../components/ui/Avatar";
import { useAuth } from "../../contexts/AuthContext";

function ProfileImageForm() {
  const {
    user: { profileImage }
  } = useAuth();

  const [file, setFile] = useState(null);

  const inputEl = useRef();

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Profile Picture</h5>
        <input
          type="file"
          className="d-none"
          ref={inputEl}
          onChange={(ev) => {
            console.log(ev.target.value);
            if (ev.target.files[0]) setFile(ev.target.files[0]);
          }}
        />
        <div>
          {file && (
            <>
              <button className="btn btn-link text-decoration-none hover-bg-gray-100">Save</button>
              <button
                className="btn btn-link text-decoration-none hover-bg-gray-100"
                onClick={() => {
                  setFile(null); // Set state to null
                  inputEl.current.value = null; // set value of input element to null (หากไม่ เป็น null เวลาเลือกรูปภาพอันไหนแล้วทำการ cancel และมาเลือกรูปเดิมอีกทีจะเลือกไม่ได้ เพราะ event.target.value ยัังมีค่าเดิมอยู่ มันไม่ Detect )
                }}
              >
                Cancel
              </button>
            </>
          )}
          <button
            className="btn btn-link text-decoration-none hover-bg-gray-100"
            onClick={() => {
              inputEl.current.click(); // สั่งให้ input (type file) ทำการ Click
            }}
          >
            Edit
          </button>
        </div>
      </div>
      <div className="text-center mt-3">
        <span onClick={() => inputEl.current.click()}>
          <Avatar src={file ? URL.createObjectURL(file) : profileImage} size="168" />
        </span>
      </div>
    </>
  );
}

export default ProfileImageForm;
