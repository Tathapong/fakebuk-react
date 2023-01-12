import { useRef, useEffect, useState } from "react";
import { Modal as BsModal } from "bootstrap";

function Modal({ title, children, modalIsOpen, modalOnClose }) {
  const modalEl = useRef();
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const modalObj = new BsModal(modalEl.current);

    setModal(modalObj);
  }, []);

  useEffect(() => {
    if (modalIsOpen) modal.show();
    else modal?.hide();
    // ที่ต้องทำเป็น optional chaining เพราะว่าตอนแรกที่ render เมื่อมีการ setModal ที่ useEffect 1 มันยังไม่ได้อัพเดทค่าทันที จึงทำให้ค่า modal ใน useEffect 2 มีค่าเป็น null อยู่
  }, [modalIsOpen, modal]);

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      ref={modalEl}
      onClick={modalOnClose}
      onKeyDown={(ev) => {
        if (ev.which === 27) modalOnClose();
      }}
    >
      <div className="modal-dialog modal-dialog-centered" onClick={(ev) => ev.stopPropagation()}>
        {/* ev.stopPropagation() เป็นการยกเลิก Propagation การไม่ให้ปิด ถ้าคลิ๊กที่กล่อง modal  ลองไปหาศึกษาเพิ่ม */}
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="btn-close invisible"></button>
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={modalOnClose}></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
