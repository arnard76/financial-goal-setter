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

  // to store form inputs/default inputs
  let date = new Date();
  const initialInputValues = {
    name: "",
    value: 0,
    type: "Continuous",
    "frequency count": 1,
    "frequency period": "week",
    notes: "",
    start: "",
    end: "",
    date: "",
  };
  const [inputValues, setInputValues] = useState(initialInputValues);

  // handle form submit
  const { addPayment } = usePayments();
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    // remove undefined keys from payment obj
    // so if continuous payment, date, end,start are not added to db
    Object.keys(inputValues).forEach((key) =>
      inputValues[key] === undefined ? delete inputValues[key] : {}
    );

    let [success, message] = await addPayment(inputValues);
    if (success) {
      setInputValues(initialInputValues);
      setMessage(message);
    } else {
      setError(message);
    }
    setLoading(false);
  }

  // handle type changing
  function handleChangeType(event) {
    let typeInputs;
    if (event.target.value === "Continuous") {
      typeInputs = {
        type: event.target.value,
        start: "",
        end: "",
        date: "",
      };
    } else if (event.target.value === "Repeated") {
      typeInputs = {
        type: event.target.value,
        start:
          date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
        end: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
        date: "",
      };
    } else if (event.target.value === "One-off") {
      typeInputs = {
        type: event.target.value,
        start: "",
        end: "",
        date: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
      };
    }
    setInputValues({ ...inputValues, ...typeInputs });
  }

  return (
    <>
      <form className="flex flex-col">
        {/* COMMON INPUTS */}
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
              setInputValues({
                ...inputValues,
                value: parseFloat(e.target.value),
              });
            }}
            className=" form-input-small"
          />
        </FormGroup>
        <FormGroup label="Type">
          <select
            type="select"
            className="form-input"
            value={inputValues.type}
            onChange={handleChangeType}
          >
            <option>Continuous</option>
            <option>Repeated</option>
            <option>One-off</option>
          </select>
        </FormGroup>

        {/* FREQUENCY INPUT */}
        {inputValues.type === "Continuous" ||
        inputValues.type === "Repeated" ? (
          <>
            <FormGroup label="Frequency">
              <input
                type="number"
                step={1}
                min={1}
                value={inputValues["frequency count"]}
                onChange={(event) => {
                  if (parseInt(event.target.value) === 0) {
                    event.target.value = 1;
                  }
                  setInputValues({
                    ...inputValues,
                    "frequency count": parseInt(event.target.value),
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
          </>
        ) : (
          <></>
        )}

        {/* DATE INPUT */}
        {inputValues.type === "Repeated" ? (
          <>
            <FormGroup label="Start">
              <input
                type="date"
                className="form-input"
                value={inputValues.start}
                onChange={(event) => {
                  setInputValues({
                    ...inputValues,
                    start: event.target.value,
                  });
                }}
              />
            </FormGroup>
            <FormGroup label="End">
              <input
                type="date"
                className="form-input"
                value={inputValues.end}
                onChange={(event) => {
                  setInputValues({
                    ...inputValues,
                    end: event.target.value,
                  });
                }}
              />
            </FormGroup>
          </>
        ) : (
          <>
            {inputValues.type === "One-off" ? (
              <FormGroup label="Date">
                <input
                  type="date"
                  className="form-input"
                  value={inputValues.date}
                  onChange={(event) => {
                    setInputValues({
                      ...inputValues,
                      date: event.target.value,
                    });
                  }}
                />
              </FormGroup>
            ) : (
              <></>
            )}
          </>
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
