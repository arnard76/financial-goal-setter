import React, { createRef, useRef, useState } from "react";
import FormGroup from "../FormGroup";
import Message from "../Message";
import Button from "../Button";

export default function AddPaymentForm() {
  // to control form inputs/actions
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // to store all form values
  const paymentNameRef = createRef();
  const paymentValueRef = createRef();
  const paymentTypeRef = createRef();
  const paymentFrequencyCountRef = createRef();
  const paymentFrequencyPeriodRef = createRef();

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
          type="text"
          label="Name"
          placeholder="Coffee,Haircut,Mortgage ..."
          classes={""}
          required={true}
          ref={paymentNameRef}
        />
        <FormGroup
          type="number"
          label="Value"
          prefix="$"
          postfix="USD"
          placeholder="How much money?"
          initial="5"
          classes={"w-16"}
          required={true}
          ref={paymentValueRef}
        />
        <FormGroup
          type="select"
          label="Type"
          initial="Continuous"
          classes={""}
          required={true}
          options={["Continuous", "Repeated", "One-off"]}
          ref={paymentTypeRef}
        />
        <FormGroup
          type="number"
          label="Frequency"
          initial={4}
          classes={""}
          required={true}
          ref={paymentFrequencyCountRef}
          postfix=" times a "
        />
        <FormGroup
          type="select"
          initial="Continuous"
          classes={""}
          required={true}
          ref={paymentFrequencyPeriodRef}
          options={["day", "week", "month", "year"]}
        />

        {/* {paymentTypeRef.current.value &&
        paymentTypeRef.current.value !== "Continuous" ? (
          <>
            <FormGroup type="date" label="Start" required={true} />
            <FormGroup type="date" label="End" required={true} />
          </>
        ) : (
          <></>
        )} */}

        <button disabled={loading} onClick={handleSubmit}>
          <Button>Add Payment</Button>
        </button>
      </form>
      {error && <Message type="error" message={error} />}
      {message && <Message message={message} />}
    </>
  );
}
