import React from "react";

export default function Button(props) {
  return (
    <div className=" bg-blue-500 text-white text-center mb-2 py-2 rounded-md  hover:bg-blue-600">
      {props.children}
    </div>
  );
}
