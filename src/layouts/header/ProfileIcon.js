import { useCallback, useState } from "react";
import DropdownToggle from "./DropdownToggle";
import DropdownMenu from "./DropdownMenu";
import { useClickOutSide } from "../../hooks/useClickOutside";

function ProfileIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const closeDropdown = useCallback(() => setIsOpen(false), []);
  const dropdownEl = useClickOutSide(closeDropdown);

  return (
    <div className="d-flex justify-content-end flex-1">
      <div className="dropdown" ref={dropdownEl}>
        <DropdownToggle onClick={() => setIsOpen((isOpen) => !isOpen)} />
        <DropdownMenu open={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </div>
  );
}

export default ProfileIcon;
