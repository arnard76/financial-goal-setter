import React from "react";

export default function Payment(props) {
  return (
    <div className="flex justify-evenly p-2 my-4 bg-blue-50 rounded-xl border-blue-400 border-2">
      <p className="flex-1">
        ${props.value} {props.currency}
      </p>
      {/* <div style={{ width: "2px", backgroundColor: "black" }}></div> */}
      <p className="flex-1">{props.name}</p>
      <p className="flex-1">
        {props.frequency[0] + ` times a ` + props.frequency[1]}
      </p>
    </div>
  );
}

export function Payment2(props) {
  return (
    <div className="grid justify-evenly grid-cols-3 ">
      <p>
        ${props.value} {props.currency}
      </p>
      <p>{props.name}</p>
      <p>{props.frequency[0] + ` times a ` + props.frequency[1]}</p>
    </div>
  );
}
