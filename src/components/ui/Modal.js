import { useRef, useEffect, useState } from "react";
import { Modal as BsModal } from "bootstrap";

function Modal(props) {
  const { title, children, open, onClose } = props;

  const modalEl = useRef();
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const modalObj = new BsModal(modalEl.current);
    setModal(modalObj);
  }, []);

  useEffect(() => {
    if (open) modal.show();
    else modal?.hide();
  }, [open, modal]);

  const mouseDownCloseModal = (ev) => {
    if (ev.target === modalEl.current) onClose();
  };

  const onKeyDownCloseModal = (ev) => {
    if (ev.keyCode === 27) onClose();
  };

  const propagationModal = (ev) => ev.stopPropagation();

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      ref={modalEl}
      onMouseDown={mouseDownCloseModal}
      onKeyDown={onKeyDownCloseModal}
    >
      <div className="modal-dialog modal-dialog-centered" onClick={propagationModal}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title flex-fill">{title}</h5>
            <button type="button" className="btn-close ms-0" onClick={onClose}></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
