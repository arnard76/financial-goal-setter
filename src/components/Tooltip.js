import React from "react";

export default function Tooltip(props) {
  return (
    <p className=" z-50 absolute left-[90%] px-4 py-1 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white scale-0 transition-all duration-100 group-hover:scale-100">
      {props.text}
    </p>
  );
}
