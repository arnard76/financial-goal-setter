import React from "react";

export default function Tooltip(props) {
  return (
    <p className=" z-50 absolute left-[90%] px-4 py-1 rounded-md dark:bg-gray-700 dark:text-white scale-0 transition-all duration-100 group-hover:scale-100">
      {props.text}
    </p>
  );
}
