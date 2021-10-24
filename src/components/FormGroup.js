import React, { useRef } from "react";

export default function FormGroup(props) {
  // props = {type: "text", placeholder: "enter payment name", label:"Name", prefix: undefined, postfix: undefined}
  const inputRef = useRef();
  function handleInputClasses(classList) {
    if (classList === undefined) {
      return "";
    }
  }
  function handleInputType(type) {
    if (type === "textarea") {
      return (
        <textarea
          type={props.type}
          placeholder={props.placeholder}
          className={props.classes}
          ref={inputRef}
          defaultValue={props.initial}
          required={props.required}
        ></textarea>
      );
    }

    if (type === "select") {
      return (
        <select
          type={props.type}
          placeholder={props.placeholder}
          className={props.classes}
          ref={inputRef}
          required={props.required}
        >
          {props.options.map((option) => {
            if (props.initial === option) {
              return <option selected>{option}</option>;
            }
            return <option>{option}</option>;
          })}
        </select>
      );
    }

    return (
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={props.classes}
        ref={inputRef}
        defaultValue={props.initial}
        required={props.required}
      />
    );
  }
  handleInputClasses(props.classes);

  return (
    <div className="px-2 mb-5 ">
      {props.label && (
        <label className="text-white dark:text-black">{props.label}</label>
      )}

      <div className="flex">
        {props.prefix && <p className="mr-1 text-white">{props.prefix}</p>}

        {handleInputType(props.type)}

        {props.postfix && <p className="ml-1 text-white">{props.postfix}</p>}
      </div>
    </div>
  );
}
