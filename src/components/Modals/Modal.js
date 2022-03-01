import React from "react";
import "./modal.css";

export default function Modal({ children, setOpen, title }) {
  return (
    <div className="modal">
      {title ? <h1 className="modal-title">{title}</h1> : <></>}
      <div className="modal-body">{children}</div>
      <div className="modal-close" onClick={() => setOpen(false)}></div>
    </div>
  );
}
