import React from "react";

export default function Button(props) {
  return (
    <div
      className={
        props.classes === undefined
          ? ` bg-blue-500 text-white text-center cursor-pointer mb-2 py-2 rounded-md  hover:bg-blue-600 transition-all duration-200`
          : props.classes +
            ` bg-blue-500 text-white text-center cursor-pointer mb-2 py-2 rounded-md  hover:bg-blue-600 transition-all duration-200`
      }
      onMouseEnter={(event) =>
        props.onMouseEnter !== undefined && props.onMouseEnter(event)
      }
      onMouseLeave={(event) =>
        props.onMouseEnter !== undefined && props.onMouseLeave(event)
      }
      onClick={(event) => props.onClick !== undefined && props.onClick(event)}
    >
      {props.children}
    </div>
  );
}
