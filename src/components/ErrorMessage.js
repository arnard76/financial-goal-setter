import React from "react";

export default function ErrorMessage(props) {
  return (
    <div className="bg-red-300 flex items-center p-1 rounded-md">
      <i className="fa fa-exclamation-circle " />
      <p className="mx-1">{props.message}</p>
    </div>
  );
}
