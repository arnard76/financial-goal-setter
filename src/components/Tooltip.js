import React from "react";

export default function Tooltip(props) {
  return (
    <p className={props.classes} style={{ fontSize: "0.6rem" }}>
      {props.text}
    </p>
  );
}
