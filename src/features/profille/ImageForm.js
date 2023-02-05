import Avatar from "../../components/ui/Avatar";
import CoverImage from "../../components/ui/CoverImage";

import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { thunk_updateUser } from "../../stores/features/auth/myUserSlice";

function ProfileImageForm({ title, profileImage, coverImage, onSuccess, open }) {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const inputEl = useRef();

  useEffect(() => {
    const initial = async () => {
      setFile(null);
      inputEl.current.value = null;
    };
    setTimeout(() => initial(), 300);
  }, [open, coverImage, profileImage]);

  const handleClickInputUpload = () => inputEl.current.click();

  const handelClickSave = async () => {
    try {
      const formData = new FormData();

      if (profileImage !== undefined) formData.append("profileImage", file);
      else if (coverImage !== undefined) formData.append("coverImage", file);

      await dispatch(thunk_updateUser(formData));
      toast.success("success upload");
      setFile(null);
      onSuccess();
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };
  const handleClickCancel = () => {
    setFile(null);
    inputEl.current.value = null;
  };

  const onChangeInputFile = (ev) => {
    if (ev.target.files[0]) {
      setFile(ev.target.files[0]);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{title}</h5>
        <input type="file" className="d-none" ref={inputEl} onChange={onChangeInputFile} />
        <div>
          {file && (
            <>
              <button className="btn btn-link text-decoration-none hover-bg-gray-100" onClick={handelClickSave}>
                Save
              </button>
              <button className="btn btn-link text-decoration-none hover-bg-gray-100" onClick={handleClickCancel}>
                Cancel
              </button>
            </>
          )}
          <button className="btn btn-link text-decoration-none hover-bg-gray-100" onClick={handleClickInputUpload}>
            Edit
          </button>
        </div>
      </div>

      {profileImage !== undefined && (
        <div className="text-center mt-3">
          <span onClick={handleClickInputUpload}>
            <Avatar src={file ? URL.createObjectURL(file) : profileImage} size="168" />
          </span>
        </div>
      )}

      {coverImage !== undefined && (
        <div
          className="position-relative mt-3 rounded-lg max-w-274 max-h-101 overflow-hidden cursor-pointer"
          style={{ aspectRatio: "1096/404" }}
        >
          <span onClick={handleClickInputUpload}>
            <CoverImage src={file ? URL.createObjectURL(file) : coverImage} />
          </span>
        </div>
      )}
    </>
  );
}

export default ProfileImageForm;
