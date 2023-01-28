export const dropdownClose = (dropdownEl, setDropdownOpen) => {
  const handleClickOutside = (ev) => {
    if (!dropdownEl.current?.contains(ev.target)) setDropdownOpen(false);
  };
  document.addEventListener("mousedown", handleClickOutside);

  return () => document.removeEventListener("mousedown", handleClickOutside);
};
