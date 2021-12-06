import React from "react";

export default function Payment(props) {
  return (
    <>
      <div
        onClick={props.onClick}
        className="relative z-10 flex justify-evenly p-2 my-2 bg-blue-50 dark:bg-gray-900 dark:text-white rounded-xl border-blue-400 border-2 "
        style={{ cursor: "pointer" }}
      >
        <p className="flex-1 ">
          ${props.amount} {props.currency}
        </p>
        <p className="flex-1">{props.name}</p>
        <p className="flex-1">
          {`${
            props.frequency[0] === 1 ? "once" : props.frequency[0] + " times"
          } every ${
            props.frequency[1] === 1
              ? props.frequency[2]
              : props.frequency[1] + " " + props.frequency[2] + "s"
          }`}
        </p>
        {/* <i className="fa fa-ellipsis-h" /> */}
      </div>
    </>
  );
}
