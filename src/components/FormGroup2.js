import React from "react";

export default function FormGroup(props) {
  return (
    <div className="mb-5">
      {props.label && (
        <label className="dark:text-white text-black">{props.label}</label>
      )}

      <div className="flex items-center">
        {props.prefix && (
          <p className="mr-1 dark:text-white text-black">{props.prefix}</p>
        )}

        {props.children}

        {props.postfix && (
          <p className="ml-1 dark:text-white text-black">{props.postfix}</p>
        )}
      </div>
    </div>
  );
}
