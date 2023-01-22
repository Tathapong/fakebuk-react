import { useRef, useState } from "react";
import Avatar from "../../components/ui/Avatar";
import CoverImage from "../../components/ui/CoverImage";
import { useAuth } from "../../contexts/AuthContext";
import { useLoading } from "../../contexts/LoadingContext";
import { toast } from "react-toastify";

function ProfileImageForm({ title, profileImage, coverImage, onSuccess }) {
  const [file, setFile] = useState(null);

  const inputEl = useRef();

  const { updateUser } = useAuth();
  const { startLoading, stopLoading } = useLoading();

  const handleClickInputUpload = () => inputEl.current.click();
  const handelClickSave = async () => {
    try {
      startLoading();
      const formData = new FormData(); // ส่งข้อมูลในรูปแบบ multipart/form data ต้องกำหนดเป็น Class

      // ใส่ข้อมูลเข้าไปใน formData
      if (profileImage !== undefined) formData.append("profileImage", file);
      else if (coverImage !== undefined) formData.append("coverImage", file);

      await updateUser(formData);
      toast.success("success upload");
      setFile(null);
      onSuccess();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data.message);
    } finally {
      stopLoading();
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{title}</h5>
        <input
          type="file"
          className="d-none"
          ref={inputEl}
          onChange={(ev) => {
            if (ev.target.files[0]) setFile(ev.target.files[0]); // กำหนดเพื่อว่าเวลากดเลือกรูป หากไม่เลือก(Cancel) ตัว ev.target.files[0] มันจะเป็น undefined ทำให้ค่าใน State เปลี่ยน ซึ่งมันไม่ควรเปลี่ยนมันควรจะเป็นค่าเดิม
          }}
        />
        <div>
          {file && (
            <>
              <button className="btn btn-link text-decoration-none hover-bg-gray-100" onClick={handelClickSave}>
                Save
              </button>
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
