import React, { forwardRef } from "react";

const FormGroup = forwardRef((props, ref) => {
  // props = {type: "text", placeholder: "enter payment name", label:"Name", prefix: undefined, postfix: undefined}

  function handleInputType(type) {
    // textarea
    if (type === "textarea") {
      return (
        <textarea
          type={props.type}
          placeholder={props.placeholder}
          className={
            props.classes === undefined
              ? ` w-full p-2 rounded-md outline-none border-2 border-transparent focus:border-blue-500`
              : props.classes +
                ` w-full p-2 rounded-md outline-none border-2 border-transparent focus:border-blue-500`
          }
          ref={ref}
          defaultValue={props.initial}
          required={props.required}
        ></textarea>
      );
    }

    // select w/ options
    if (type === "select") {
      return (
        <select
          type={props.type}
          placeholder={props.placeholder}
          className={
            props.classes === undefined
              ? ` w-full p-2 rounded-md outline-none border-2 border-transparent focus:border-blue-500`
              : props.classes +
                ` w-full p-2 rounded-md outline-none border-2 border-transparent focus:border-blue-500`
          }
          ref={ref}
          required={props.required}
          defaultValue={props.initial}
          onChange={props.onChange}
        >
          {props.options.map((option) => {
            return <option key={option}>{option}</option>;
          })}
        </select>
      );
    }

    //else: input
    return (
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={
          props.classes === undefined
            ? ` w-full p-2 rounded-md outline-none border-2 border-transparent focus:border-blue-500 text-black`
            : props.classes +
              ` w-full p-2 rounded-md outline-none border-2 border-transparent focus:border-blue-500 text-black`
        }
        ref={ref}
        defaultValue={props.initial}
        required={props.required}
      />
    );
  }

  return (
    <div className="mb-5">
      {props.label && (
        <label className="dark:text-white text-black">{props.label}</label>
      )}

      <div className="flex items-center">
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
