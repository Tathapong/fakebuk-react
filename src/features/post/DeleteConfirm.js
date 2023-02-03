import { toast } from "react-toastify";

function DeleteConfirm({ onClose, onSubmit, title }) {
  const handleSubmit = async (ev) => {
    try {
      ev.preventDefault();
      await onSubmit();
      toast.success("delete completed");
    } catch (err) {
      console.log(err.message);
      toast.err(err.message);
    } finally {
      onClose();
    }
  };

  return (
    <div>
      <p>{title}</p>
      <hr />
      <form className="d-flex justify-content-end" onSubmit={handleSubmit}>
        <button type="submit" className="btn btn-danger me-3">
          Delete
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default DeleteConfirm;
