import React, { useState, useEffect } from "react";

// custom components
import Message from "../Message";
import FormGroup from "../FormGroup2";

import { usePayments } from "../../contexts/PaymentsContext";

export default function AddPaymentForm() {
  // to control form inputs/actions
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // to store form inputs/default inputs
  const date = new Date();
  const initialInputValues = {
    name: "",
    amount: 0,
    type: "Continuous",
    tempType: "",
    // 1 occurances every 30 days
    frequency: [1, 30, "day"],
    notes: "",
    start:
      date.getFullYear() +
      "-" +
      +(date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "-" +
      (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()),
    end: "",
    occurances: 0,
  };
  const [inputValues, setInputValues] = useState(initialInputValues);

  // put inputs into correct format
  function cleanPaymentFields(payment) {
    let { notes, name, amount, frequency, start, end } = payment;
    start = start.split("-");
    start.reverse();
    if (end === "") {
      end = null;
    } else {
      try {
        end = end.split("-");
        end.reverse();
        for (let count = 0; count < 3; count++) {
          end[count] = parseInt(end[count]);
        }
        end[1] = end[1] - 1;
      } catch (e) {
        console.log(e);
      }
    }
    for (let count = 0; count < 3; count++) {
      start[count] = parseInt(start[count]);
    }
    start[1] = start[1] - 1;

    if (frequency === "") {
      frequency = null;
    }
    return { notes, name, amount, frequency, start, end };
  }

  // handle form submit
  const { addPayment } = usePayments();
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    let [success, message] = await addPayment(cleanPaymentFields(inputValues));
    if (success) {
      setInputValues(initialInputValues);
      setMessage(message);
    } else {
      setError(message);
    }
    setLoading(false);
  }

  // re-calc # of occurances when freq or end/start change
  const { calcOccurances } = usePayments();
  useEffect(() => {
    if (
      inputValues.type === "Repeated" &&
      inputValues.start !== "" &&
      inputValues.end !== ""
    ) {
      console.log("happenign");
      const { frequency, start, end } = cleanPaymentFields(inputValues);
      setInputValues({
        ...inputValues,
        occurances: calcOccurances(frequency, start, end),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValues.start, inputValues.end, inputValues.frequency]);

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
        <FormGroup label="Amount" prefix="$">
          <input
            type="number"
            value={inputValues.amount}
            onChange={(e) => {
              setInputValues({
                ...inputValues,
                amount: parseFloat(e.target.value),
              });
            }}
            className=" form-input-small"
          />
        </FormGroup>

        {/* IS ONE-OFF? */}
        <FormGroup prefix="Make this a one-off payment">
          {/* <label className="text-white">Yes</label> */}
          <input
            type="checkbox"
            className="ml-2"
            checked={inputValues.type === "One-off" ? true : false}
            onChange={(e) => {
              let typeInputs;
              if (inputValues.type === "One-off") {
                typeInputs = {
                  type: inputValues.tempType,
                  tempType: "",
                  frequency: initialInputValues.frequency,
                  end:
                    inputValues.tempType === "Continuous"
                      ? ""
                      : inputValues.start,
                };
              } else {
                typeInputs = {
                  type: "One-off",
                  tempType: inputValues.type,
                  end: "",
                  frequency: "",
                };
              }

              setInputValues({
                ...inputValues,
                ...typeInputs,
              });
            }}
          />
        </FormGroup>

        {/* FREQUENCY INPUT IF Continuous/Repeated Payment type */}
        {inputValues.type === "Continuous" ||
        inputValues.type === "Repeated" ? (
          <>
            <FormGroup label="How often will this payment occur?">
              <input
                type="number"
                step={1}
                min={1}
                style={{
                  width: "3rem",
                }}
                value={inputValues.frequency[0]}
                onChange={(event) => {
                  if (parseInt(event.target.value) <= 0) {
                    event.target.value = 1;
                  }
                  setInputValues({
                    ...inputValues,
                    frequency: [
                      parseInt(event.target.value),
                      inputValues.frequency[1],
                      inputValues.frequency[2],
                    ],
                  });
                }}
                className=" form-input-small"
              />
              <p className=" text-black dark:text-white w-full text-center">
                {" "}
                time{inputValues.frequency[0] === 1 ? "" : "s"} every{" "}
              </p>
              <input
                type="number"
                step={1}
                min={1}
                value={inputValues.frequency[1]}
                onChange={(event) => {
                  if (parseInt(event.target.value) <= 0) {
                    event.target.value = 1;
                  }
                  setInputValues({
                    ...inputValues,
                    frequency: [
                      inputValues.frequency[0],
                      parseInt(event.target.value),
                      inputValues.frequency[2],
                    ],
                  });
                }}
                className=" form-input-small"
                style={{
                  width: "3rem",
                  marginRight: "0.4rem",
                }}
              />
              <select
                type="select"
                value={inputValues.frequency[2]}
                className="form-input-small"
                onChange={(event) => {
                  setInputValues({
                    ...inputValues,
                    frequency: [
                      inputValues.frequency[0],
                      inputValues.frequency[1],
                      event.target.value,
                    ],
                  });
                }}
              >
                <option value="day">
                  {inputValues.frequency[1] === 1 ? "day" : "days"}
                </option>
                <option value="week">
                  {inputValues.frequency[1] === 1 ? "week" : "weeks"}
                </option>
                <option value="year">
                  {inputValues.frequency[1] === 1 ? "year" : "years"}
                </option>
              </select>
            </FormGroup>
          </>
        ) : (
          <></>
        )}

        {/* IS REPEATED? */}
        {inputValues.type !== "One-off" ? (
          <FormGroup prefix="Make payment stop before the financial period end">
            <input
              type="checkbox"
              className="ml-2"
              checked={inputValues.type === "Repeated" ? true : false}
              onChange={(e) => {
                let typeInputs;
                if (inputValues.type === "Repeated") {
                  typeInputs = {
                    type: "Continuous",
                    end: "",
                  };
                } else if (inputValues.type === "Continuous") {
                  typeInputs = {
                    type: "Repeated",
                    end: inputValues.start,
                  };
                }

                setInputValues({
                  ...inputValues,
                  ...typeInputs,
                });
              }}
            />
          </FormGroup>
        ) : (
          <></>
        )}

        {/* FIRST&LAST PAYMENT TIME INPUT IF Repeated Payment Type*/}
        {inputValues.type === "Repeated" ? (
          <>
            <FormGroup label="First day of payment">
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
            <FormGroup label="Last day of payment">
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
            <p className="dark:text-white text-black mb-5">
              This payment occurs {inputValues.occurances} times
            </p>
          </>
        ) : (
          <FormGroup
            label={
              inputValues.type === "One-off"
                ? "The day of Payment?"
                : "First day of Payment?"
            }
          >
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
