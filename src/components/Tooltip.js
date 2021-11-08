import React from "react";

export default function Tooltip(props) {
  return (
    <p className="absolute  left-full -translate-x-full dark:bg-gray-800 dark:text-white z-10">
      {props.text}
    </p>
  );
}
