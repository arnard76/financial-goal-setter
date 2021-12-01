import React from "react";
import Tooltip from "./Tooltip";

export default function FormGroup({ label, hint, prefix, postfix, children }) {
  return (
    <div className="mb-5 ">
      <div className="flex items-center ">
        <label className="dark:text-white text-black mb-1">{label}</label>
        {hint && (
          <div className="group relative flex items-center">
            <i
              className="fa fa-question-circle-o text-white p-2 mr-2"
              aria-hidden="true"
            ></i>
            <Tooltip text={hint} />
          </div>
        )}
      </div>

      <div className="flex items-center justify-start">
        {prefix && <p className="mr-1 dark:text-white text-black">{prefix}</p>}

        {children}

        {postfix && (
          <p className="ml-1 dark:text-white text-black">{postfix}</p>
        )}
      </div>
    </div>
  );
}
