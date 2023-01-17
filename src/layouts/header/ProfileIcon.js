import { useState, useEffect, useRef } from "react";
import DropdownToggle from "./DropdownToggle";
import DropdownMenu from "./DropdownMenu";

function ProfileIcon() {
  // State for toggle Dropdown
  const [isOpen, setIsOpen] = useState(false);
  const dropdownEl = useRef();

  // Use effect เพิ่ม addEventListener ใน root document
  useEffect(() => {
    const handleClickOutside = (ev) => {
      // Check ว่า ev.target ที่ Click อยู่ เป็น descendant ของ Component dropdownEl ไหม (จะพิจารณาอันที่ไม่อยู่)
      if (!dropdownEl.current.contains(ev.target)) setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    // เป็นคำสั่งในการ Remove eventListener เมื่อ ProfileIcon ไม่ได้ถูก render (เมื่อ Logout Header ก็จะไม่มี แต่ถ้าเราไม่สั่ง remove event มันจะยังคงอยู่ ซึ่งมันไม่ Clean)
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="d-flex justify-content-end flex-1">
      <div className="dropdown" ref={dropdownEl}>
        <DropdownToggle onClick={() => setIsOpen((isOpen) => !isOpen)} />
        <DropdownMenu open={isOpen} />
      </div>
    </div>
  );
}

export default ProfileIcon;
