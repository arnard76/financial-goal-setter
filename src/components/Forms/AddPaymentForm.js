import React, { createRef, useState } from "react";
import FormGroup from "../FormGroup";
import Message from "../Message";
import { collection, doc, addDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function AddPaymentForm() {
  // to control form inputs/actions
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // to store all form values
  const paymentNameRef = createRef();
  const paymentValueRef = createRef();
  const [paymentType, setPaymentType] = useState("");
  const paymentFrequencyCountRef = createRef();
  const paymentFrequencyPeriodRef = createRef();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    // verify input data

    console.log(
      "payment amount: ",
      typeof paymentValueRef.current.value,
      "   ",
      paymentValueRef
    );
    const docRef = await addDoc(collection(db, "payments"), {
      Name: paymentNameRef.current.value,
      // Type: paymentTypeRef.current.value,
      User: "xPgTU8nHX2bIjEC2gVsAf3kHBLo1",
      Value: parseInt(paymentValueRef.current.value),
      "Frequency Count": parseInt(paymentFrequencyCountRef.current.value),
      "Frequency Period": paymentFrequencyPeriodRef.current.value,
      // "Start Date": payment
    });
    console.log("Document written with ID: ", docRef.id);

    setError("it was added? but who cares am i right?");
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
        <input
          placeholder="Coffee,Haircut,Mortgage ..."
          type="text"
          className="form-group"
          ref={paymentNameRef}
          required
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

        <div disabled={loading} onClick={handleSubmit} className="button">
          Add Payment
        </div>
      </form>
      {error && <Message type="error" message={error} />}
      {message && <Message message={message} />}
    </>
  );
}
