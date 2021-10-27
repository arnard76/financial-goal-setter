import React, { forwardRef } from "react";

const FormGroup = forwardRef((props, ref) => {
  // props = {type: "text", placeholder: "enter payment name", label:"Name", prefix: undefined, postfix: undefined}
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
          ref={ref}
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
          ref={ref}
          required={props.required}
          defaultValue={props.initial}
        >
          {props.options.map((option) => {
            return <option key={option}>{option}</option>;
          })}
        </select>
      );
    }

    return (
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={props.classes}
        ref={ref}
        defaultValue={props.initial}
        required={props.required}
      />
    );
  }
  handleInputClasses(props.classes);

  return (
    <div className="mb-5 dark">
      {props.label && (
        <label className="dark:text-white text-black">{props.label}</label>
      )}

      <div className="flex">
        {props.prefix && (
          <p className="mr-1 dark:text-white text-black">{props.prefix}</p>
        )}

        {handleInputType(props.type)}

        {props.postfix && (
          <p className="ml-1 dark:text-white text-black">{props.postfix}</p>
        )}
      </div>
    </div>
  );
});

export default FormGroup;
