import React, { createRef, useState } from "react";
import FormGroup from "../FormGroup2";
import Message from "../Message";

export default function SettingsForm(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const incomeTypeRef = createRef();

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    // verify input data

    setError("it wasn't added but who cares am i right?");
  }

  return (
    <>
      <form className="flex flex-col">
        <FormGroup prefix="Wage" postfix="Salary" label="Income Type">
          <input className="form-input" type="checkbox" ref={incomeTypeRef} />
        </FormGroup>
        <FormGroup
          prefix="$"
          postfix={props.currentCurrency}
          label="Hourly Wage"
        >
          <input className="form-input" type="number" />
        </FormGroup>
        <FormGroup
          prefix="$"
          postfix={props.currentCurrency}
          label="Yearly Salary"
        >
          <input className="form-input" type="number" />
        </FormGroup>

        <button disabled={loading} onClick={handleSubmit} className="button">
          Update Settings
        </button>
      </form>
      {error && <Message type="error" message={error} />}
      {message && <Message message={message} />}
    </>
  );
}
