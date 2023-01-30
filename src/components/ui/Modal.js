import { useRef, useEffect, useState } from "react";
import { Modal as BsModal } from "bootstrap";

function Modal(props) {
  const { title, children, open, onClose } = props;

  const modalEl = useRef();
  const [modal, setModal] = useState(null);

  useEffect(() => {
    setModal(new BsModal(modalEl.current));
  }, []);

  useEffect(() => {
    if (open) modal.show();
    else modal?.hide();
  }, [open, modal]);

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      ref={modalEl}
      onMouseDown={(ev) => {
        if (ev.target === modalEl.current) onClose();
      }}
      onKeyDown={(ev) => {
        if (ev.keyCode === 27) onClose();
      }}
    >
      <div className="modal-dialog modal-dialog-centered" onClick={(ev) => ev.stopPropagation()}>
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
