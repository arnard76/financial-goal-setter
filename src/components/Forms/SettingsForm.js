import React, { createRef, useState } from "react";
import FormGroup from "../FormGroup";
import Message from "../Message";
import Button from "../Button";

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
        <FormGroup
          type="checkbox"
          prefix="Wage"
          postfix="Salary"
          label="Income Type"
          ref={incomeTypeRef}
        />
        <FormGroup
          type="number"
          prefix="$"
          postfix={props.currentCurrency}
          label="Hourly Wage"
        />
        <FormGroup
          type="number"
          prefix="$"
          postfix={props.currentCurrency}
          label="Yearly Salary"
        />
        <button disabled={loading} onClick={handleSubmit}>
          <Button>Update Settings</Button>
        </button>
      </form>
      {error && <Message type="error" message={error} />}
      {message && <Message message={message} />}
    </>
  );
}
