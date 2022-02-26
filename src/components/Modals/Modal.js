import React from "react";

export default function Modal({ children, isOpen = false, setOpen }) {
  return (
    <>
      <div className={isOpen ? "modal active" : "modal"}>{children}</div>
      <div
        className={isOpen ? "modal-close active" : "modal-close"}
        onClick={() => setOpen(false)}
      ></div>
    </>
  );
}
