import React from "react";

export default function Message(props) {
  if (props.type === "error") {
    return (
      <div className="bg-red-300 flex items-center p-2 rounded-md">
        <i className="fa fa-exclamation-circle " />
        <p className="ml-2">{props.message}</p>
      </div>
    );
  }
  return (
    <div className="bg-green-200 flex items-center p-2 rounded-md">
      <i className="fa fa-check " />
      <p className="ml-2">{props.message}</p>
    </div>
  );
}
