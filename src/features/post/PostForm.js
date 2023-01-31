import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions as loadingActions } from "../../stores/loadingSlice";
import { toast } from "react-toastify";

import AddPhotoButton from "./AddPhotoButton";

function PostForm({ firstName, onSubmit, onClose, post, isOpen }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const fileEl = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (post?.title) setTitle(post.title);
      else setTitle("");
      if (post?.image) setImage(post.image);
      else {
        setImage(null);
        fileEl.current.value = "";
      }
    }, 300);
  }, [isOpen]);

  const handleSubmit = async (ev) => {
    try {
      ev.preventDefault();
      dispatch(loadingActions.startLoading());
      const formData = new FormData();

      // Validate
      //* ใช้ Library ได้ เช่น joi , yup
      // if (!title && !image) return toast.error("title or image is required");

      if (title) formData.append("title", title); // หาก User ไม่ใส่ image มันจะได้ว่า {title : ''}
      if (image) formData.append("image", image); // หาก User ไม่ใส่ image มันจะได้ว่า {image : 'null'}

      //* การส่งแบบ formData จะมีค่าได้เป็นแค่ string, binary(file) ไม่สามารถเป็น number, boolean , etc ได้ ดังนั้น หาก image ไม่มีได้ใส่ไฟล์มามันจะแปลงค่าเริ่มต้น (null) เป็น string

      await onSubmit(formData);
      setTitle("");
      setImage(null);
      toast.success("post created");
      onClose();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data.message);
    } finally {
      dispatch(loadingActions.stopLoading());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="form-control border-0 shadow-none resize-none"
        placeholder={`What's on your mind, ${firstName}?`}
        rows="5"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <div className="position-relative" role="button" onClick={() => fileEl.current.click()}>
        {image ? (
          <>
            <i
              role="button"
              className="fa-solid fa-circle-xmark fs-3 text-light position-absolute end-0 me-2 mt-2"
              onClick={(ev) => {
                ev.stopPropagation();
                fileEl.current.value = "";
                setImage(null);
              }}
            />

            <img src={post?.image === image ? image : URL.createObjectURL(image)} className="img-fluid" alt="post" />
          </>
        ) : (
          <AddPhotoButton />
        )}
      </div>

      <input
        type="file"
        className="d-none"
        ref={fileEl}
        onChange={(ev) => {
          if (ev.target.files[0]) setImage(ev.target.files[0]);
        }}
      />
      <div className="pt-3">
        <button type="submit" className="btn btn-primary w-100 fw-bold text-3.5 h-9">
          Post
        </button>
      </div>
    </form>
  );
}

export default PostForm;
