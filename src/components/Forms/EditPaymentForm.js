import React, { useState, useEffect } from "react";

// custom components
import Message from "../Message";
import FormGroup from "../FormGroup2";

import { usePayments } from "../../contexts/PaymentContext";

export default function EditPaymentForm({ payment, goBack }) {
  // to control form inputs/actions
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // to store form inputs/default inputs
  let date = new Date();
  const initialInputValues = {
    name: payment.name,
    amount: payment.amount,
    type: payment.type,
    tempType: "",
    // 1 occurances every 30 days && corresponding input type of dates
    frequency:
      payment.type === "One-off" ? [1, 1, "once", "number"] : payment.frequency,
    notes: payment.notes,
    start: payment.start,
    end: payment.end,
    date: payment.date,
    occurances: 0,
  };
  const [inputValues, setInputValues] = useState(initialInputValues);

  // handle form submit
  const { editPayment } = usePayments();
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    let [success, message] = await editPayment(payment.id, inputValues);
    if (success) {
      setInputValues(initialInputValues);
      setMessage(message);
    } else {
      setError(message);
    }
    setLoading(false);
  }

  // handle type changing
  useEffect(() => {
    let typeInputs,
      type = inputValues.type;
    if (type === "Continuous") {
      typeInputs = {
        start: "",
        end: "",
        date: "",
      };
    } else if (type === "Repeated") {
      typeInputs = {
        start:
          date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
        end: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
        date: "",
      };
    } else if (type === "One-off") {
      typeInputs = {
        start: "",
        end: "",
        date: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
        frequency: [1, 0, "once"],
        // "frequency count": 1,
        // "frequency period": "once",
        // "frequency period count": 0,
      };
    }
    setInputValues({ ...inputValues, ...typeInputs });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValues.type]);

  // when the freq period is changed (e.g. day to month),
  useEffect(() => {
    if (inputValues.type === "Repeated") {
      let start, end, inputType;
      if (inputValues.frequency[2] === "day") {
        start =
          date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
        end = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
        inputType = "date";
      } else if (inputValues.frequency[2] === "week") {
        start = date.getWeekYear() + "-W" + date.getWeek();
        end = date.getWeekYear() + "-W" + date.getWeek();
        inputType = "week";
      } else if (inputValues.frequency[2] === "month") {
        start = date.getFullYear() + "-" + date.getMonth();
        end = date.getFullYear() + "-" + date.getMonth();
        inputType = "month";
      } else if (inputValues.frequency[2] === "year") {
        start = date.getFullYear();
        end = date.getFullYear();
        inputType = "number";
      } else {
        console.error(
          "doesn't match any of the periods specified: ",
          inputValues.frequency[2]
        );
      }
      setInputValues({
        ...inputValues,
        start: start,
        end: end,
        frequency: [
          inputValues.frequency[0],
          inputValues.frequency[1],
          inputValues.frequency[2],
          inputType,
        ],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValues.frequency[2]]);

  // re-calc # of occurances when freq or end/start change
  const { calcOccurances } = usePayments();
  useEffect(() => {
    if (inputValues.type === "Repeated") {
      calcOccurances(inputValues.frequency, inputValues.start, inputValues.end);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValues.start, inputValues.end, inputValues.frequency]);

  // Returns the ISO week of the date.
  Date.prototype.getWeek = function () {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return (
      1 +
      Math.round(
        ((date.getTime() - week1.getTime()) / 86400000 -
          3 +
          ((week1.getDay() + 6) % 7)) /
          7
      )
    );
  };

  // Returns the four-digit year corresponding to the ISO week of the date.
  Date.prototype.getWeekYear = function () {
    var date = new Date(this.getTime());
    date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
    return date.getFullYear();
  };

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

        {/* <FormGroup label="Type">
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
        </FormGroup> */}

        {/* IS ONE-OFF? */}
        <FormGroup prefix="Is this a one-time payment?">
          {/* <label className="text-white">Yes</label> */}
          <input
            type="checkbox"
            className="ml-2"
            checked={inputValues.type === "One-off" ? true : false}
            onChange={(e) => {
              // console.log("clicked", e.target.value);
              let type, tempType;
              if (inputValues.type === "One-off") {
                type = inputValues.tempType;
                tempType = "";
              } else {
                type = "One-off";
                tempType = inputValues.type;
              }

              setInputValues({
                ...inputValues,
                tempType: tempType,
                type: type,
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
                times every{" "}
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
                <option value="day">days</option>
                <option value="week">weeks</option>
                <option value="month">months</option>
                <option value="year">years</option>
              </select>
            </FormGroup>
          </>
        ) : (
          <></>
        )}

        {/* IS REPEATED? */}
        {inputValues.type !== "One-off" ? (
          <FormGroup prefix="Will this payment stop after some time?">
            <input
              type="checkbox"
              className="ml-2"
              checked={inputValues.type === "Repeated" ? true : false}
              onChange={(e) => {
                let type;
                if (inputValues.type === "Repeated") {
                  type = "Continuous";
                } else {
                  type = "Repeated";
                }
                setInputValues({
                  ...inputValues,
                  type: type,
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
            <FormGroup label={`First ${inputValues.frequency[2]} of payment`}>
              <input
                type={inputValues.frequency[3]}
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
            <FormGroup label={`Last ${inputValues.frequency[2]} of payment`}>
              <input
                type={inputValues.frequency[3]}
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
            {/* <FormGroup
              label={`For how many ${inputValues.frequency[2]}s?`}
              postfix={`${inputValues.frequency[2]}s`}
            >
              <input
                type="number"
                className="form-input-small"
                value={inputValues.occurances}
                onChange={(event) => {
                  setInputValues({
                    ...inputValues,
                    occurances: event.target.value,
                  });
                }}
              />
            </FormGroup> */}
            <p className="dark:text-white text-black mb-5">
              This payment occurs {inputValues.occurances} times
            </p>
          </>
        ) : (
          <>
            {inputValues.type === "One-off" ? (
              <FormGroup label="When do you make the payment?">
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
          Edit Payment
        </button>
        <button
          disabled={loading}
          onClick={goBack}
          className="button bg-red-800 hover:bg-red-900"
        >
          Cancel
        </button>
      </form>
      {error && <Message type="error" message={error} />}
      {message && <Message message={message} />}
    </>
  );
}
