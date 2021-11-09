import React, { createRef, useState } from "react";

// project components
import Message from "../Message";
import FormGroup2 from "../FormGroup2";

import { usePayments } from "../../contexts/PaymentContext";

export default function AddPaymentForm({ refreshPayments }) {
  // to control form inputs/actions
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // to store all form values
  const paymentNameRef = createRef();
  const paymentValueRef = createRef();
  const [paymentType, setPaymentType] = useState("Continuous");
  const paymentFrequencyCountRef = createRef();
  const paymentFrequencyPeriodRef = createRef();

  const { addPayment } = usePayments();

  var date = new Date();
  var present =
    date.getDay() + 1 + "-" + date.getMonth() + "-" + date.getFullYear();
  // console.log(date.getDay(), date.getMonth(), date.getFullYear(), present);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    // verify input data here

    await addPayment({
      name: paymentNameRef.current.value,
      type: paymentType,
      value: parseFloat(paymentValueRef.current.value),
      "frequency count": parseInt(paymentFrequencyCountRef.current.value),
      "frequency period": paymentFrequencyPeriodRef.current.value,
    });

    // await addDoc(collection(db, "payments"), {
    //   Name: paymentNameRef.current.value,
    //   Type: paymentType,
    //   User: "xPgTU8nHX2bIjEC2gVsAf3kHBLo1",
    //   Value: parseFloat(paymentValueRef.current.value),
    //   "Frequency Count": parseInt(paymentFrequencyCountRef.current.value),
    //   "Frequency Period": paymentFrequencyPeriodRef.current.value,
    // });

    //   .catch((error) => {
    //     console.log(error);
    //     setError(error);
    //   })
    //   .then(console.log("Document written with ID: ", docRef.id));

    setLoading(false);
  }

  return (
    <>
      <form className="flex flex-col">
        <FormGroup2 label="Name">
          <input
            placeholder="Coffee,Haircut,Mortgage ..."
            type="text"
            className="form-input"
            ref={paymentNameRef}
            required
          />
        </FormGroup2>
        <FormGroup2 label="Value" prefix="$" postfix="USD">
          <input
            type="number"
            placeholder="How much money?"
            defaultValue="5"
            required
            ref={paymentValueRef}
            className=" form-input-small"
          />
        </FormGroup2>
        <FormGroup2 label="Type">
          <select
            type="select"
            defaultValue="Continuous"
            required
            className="form-input"
            onChange={(event) => {
              console.log("changed to ", event.target.value);
              setPaymentType(event.target.value);
            }}
          >
            <option>Continuous</option>
            <option>Repeated</option>
            <option>One-off</option>
          </select>
        </FormGroup2>
        <FormGroup2 label="Frequency">
          <input
            type="number"
            placeholder="How much money?"
            defaultValue={4}
            required
            ref={paymentFrequencyCountRef}
            className=" form-input-small"
          />
          <p className=" text-black dark:text-white w-full text-center">
            {" "}
            times a{" "}
          </p>
          <select
            type="select"
            defaultValue="month"
            required
            className="form-input"
            ref={paymentFrequencyPeriodRef}
          >
            <option>day</option>
            <option>week</option>
            <option>month</option>
            <option>year</option>
          </select>
        </FormGroup2>

        {paymentType !== "Continuous" ? (
          <>
            <FormGroup2 label="Start">
              <input
                type="date"
                required
                className="form-input"
                defaultValue={present}
              />
            </FormGroup2>
            <FormGroup2 label="End">
              <input
                type="date"
                required
                className="form-input"
                defaultValue={date}
              />
            </FormGroup2>
          </>
        ) : (
          <></>
        )}

        <div disabled={loading} onClick={handleSubmit} className="button">
          Add Payment
        </div>
      </form>
      {error && <Message type="error" message={error} />}
      {message && <Message message={message} />}
    </>
  );
}
