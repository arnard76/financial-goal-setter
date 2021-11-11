import React, { useState } from "react";

// project components
import Message from "../Message";
import FormGroup from "../FormGroup2";

import { usePayments } from "../../contexts/PaymentContext";

export default function AddPaymentForm({ currency }) {
  // to control form inputs/actions
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // to store all form values
  const [inputValues, setInputValues] = useState({
    name: "",
    value: 0,
    type: "Continuous",
    "frequency count": 0,
    "frequency period": "week",
    start: "",
    end: "",
    notes: "",
  });

  var date = new Date();
  var present =
    date.getDay() + 1 + "-" + date.getMonth() + "-" + date.getFullYear();
  // console.log(date.getDay(), date.getMonth(), date.getFullYear(), present);

  // handle form submit
  const { addPayment } = usePayments();
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    // verify input data here

    let [success, message] = await addPayment({
      name: inputValues.name,
      type: inputValues.type,
      value: inputValues.value,
      "frequency count": inputValues["frequency count"],
      "frequency period": inputValues["frequency period"],
    });
    console.log(success, message);
    if (success) {
      setInputValues({
        name: "",
        value: 0,
        type: "Continuous",
        "frequency count": 0,
        "frequency period": "week",
        start: "",
        end: "",
        notes: "",
      });
      setMessage(message);
    } else {
      setError(message);
    }
    setLoading(false);
  }

  return (
    <>
      <form className="flex flex-col">
        <FormGroup label="Notes">
          <textarea
            placeholder="Add additional details here..."
            className="form-input"
            value={inputValues.notes}
            onChange={(e) => {
              setInputValues({ ...inputValues, notes: e.target.value });
            }}
          ></textarea>
        </FormGroup>
        <FormGroup label="Name">
          <input
            placeholder="Coffee,Haircut,Mortgage ..."
            type="text"
            className="form-input"
            value={inputValues.name}
            onChange={(e) => {
              setInputValues({ ...inputValues, name: e.target.value });
            }}
          />
        </FormGroup>
        <FormGroup label="Value" prefix="$" postfix={currency}>
          <input
            type="number"
            value={inputValues.value}
            onChange={(e) => {
              setInputValues({ ...inputValues, value: e.target.value });
            }}
            className=" form-input-small"
          />
        </FormGroup>
        <FormGroup label="Type">
          <select
            type="select"
            className="form-input"
            value={inputValues.type}
            onChange={(event) => {
              setInputValues({ ...inputValues, type: event.target.value });
            }}
          >
            <option>Continuous</option>
            <option>Repeated</option>
            <option>One-off</option>
          </select>
        </FormGroup>
        <FormGroup label="Frequency">
          <input
            type="number"
            step={1}
            value={inputValues["frequency count"]}
            onChange={(event) => {
              setInputValues({
                ...inputValues,
                "frequency count": event.target.value,
              });
            }}
            className=" form-input-small"
          />
          <p className=" text-black dark:text-white w-full text-center">
            {" "}
            times a{" "}
          </p>
          <select
            type="select"
            value={inputValues["frequency period"]}
            className="form-input"
            onChange={(event) => {
              setInputValues({
                ...inputValues,
                "frequency period": event.target.value,
              });
            }}
          >
            <option>day</option>
            <option>week</option>
            <option>month</option>
            <option>year</option>
          </select>
        </FormGroup>

        {inputValues.type !== "Continuous" ? (
          <>
            <FormGroup label="Start">
              <input type="date" className="form-input" />
            </FormGroup>
            <FormGroup label="End">
              <input type="date" className="form-input" />
            </FormGroup>
          </>
        ) : (
          <></>
        )}

        <button disabled={loading} onClick={handleSubmit} className="button">
          Add Payment
        </button>
      </form>
      {error && <Message type="error" message={error} />}
      {message && <Message message={message} />}
    </>
  );
}
