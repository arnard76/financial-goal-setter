import React from "react";

export default function Payment(props) {
  return (
    <>
      <div
        onClick={props.onClick}
        className="flex justify-evenly p-2  bg-blue-50 dark:bg-gray-900 dark:text-white rounded-xl border-blue-400 border-2 "
        style={{ cursor: "pointer" }}
      >
        <p className="flex-1 ">
          ${props.value} {props.currency}
        </p>
        <p className="flex-1">{props.name}</p>
        <p className="flex-1">{props.frequency}</p>
        {/* <i className="fa fa-ellipsis-h" /> */}
      </div>
    </>
  );
}

export function PaymentMenu(props) {
  return (
    <div className="overflow-hidden p-4 bg-gray-100 dark:text-white dark:bg-gray-800 w-72">
      <p>Notes: {props.notes}</p>
      <p>Start: {props.start}</p>
      <p>End: {props.end}</p>
    </div>
  );
}
