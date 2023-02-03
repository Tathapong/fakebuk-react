import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import AddPhotoButton from "./AddPhotoButton";

function PostForm({ firstName, onSubmit, onClose, post, isOpen }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const fileEl = useRef();

  useEffect(() => {
    if (post?.title) setTitle(post.title);
    else setTitle("");
    if (post?.image) setImage(post.image);
    else {
      setImage(null);
      fileEl.current.value = "";
    }
  }, [isOpen, post?.image, post?.title]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const formData = new FormData();

      if (title) formData.append("title", title);
      if (image) formData.append("image", image);

      await onSubmit(formData);
      onClose();
      setTitle("");
      setImage(null);
      toast.success("success");
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    } finally {
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
