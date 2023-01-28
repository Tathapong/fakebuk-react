// custom Hook function ยอมให้ใช้ hook ได้
// custom hook function เป็น function ที่ขึ้นต้นด้วยคำว่า 'use'

import { useEffect, useRef } from "react";

export const useClickOutSide = (callback) => {
  const dropdownEl = useRef();

  useEffect(() => {
    const handleClickOutside = (ev) => {
      if (!dropdownEl.current?.contains(ev.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return dropdownEl;
};
