import React, { useState } from "react";
import Payment from "./Payment";

export function PaymentMenu(props) {
  return (
    <div className="overflow-hidden p-4 bg-gray-100 dark:text-white dark:bg-gray-800 w-72">
      <p>Notes: {props.notes}</p>
      <p>Start: {props.start}</p>
      <p>End: {props.end}</p>
      <div className="button mt-4">Edit</div>
      <div className="button bg-red-800 hover:bg-red-900">Delete</div>
    </div>
  );
}

export default function Payments({ payments }) {
  const [activePayment, setActivePayment] = useState({ id: null });
  const examplePayments = [
    {
      id: "TNrc4oq57VAvNK72vtUD",
      notes: "In newmarket, with student discount :)",
      name: "Haircut",
      value: 15,
      "frequency count": 1,
      "frequency period": "month",
      start: Date.UTC(1000, 1, 1),
      end: Date.UTC(9999, 12, 31),
    },
    {
      id: "TNrc4oq57VAvNK72vtUE",
      notes: "Delivered from countdown",
      name: "Groceries",
      value: 200,
      "frequency count": 4,
      "frequency period": "month",
      start: Date.UTC(1000, 1, 1),
      end: Date.UTC(9999, 12, 31),
    },
  ];

  // const { id, notes, name, value, frequency, start, end } = examplePayment;

  function handleActivatePayment(payment) {
    // console.log("check", payment);
    if (activePayment.id === payment.id) {
      setActivePayment({ id: null });
    } else {
      setActivePayment(payment);
    }
  }

  return (
    <>
      <div className="flex flex-1 ">
        <div className="relative  flex-1 p-4 h-screen overflow-y-auto bg-white dark:bg-gray-900 z-10">
          <strong className="relative z-10 text-xl text-center text-gray-900 dark:text-white">
            <h1>What does your financial goal look like?</h1>
          </strong>
          {payments.map((payment) => {
            return (
              <Payment
                onClick={() => handleActivatePayment(payment)}
                key={payment.id}
                name={payment.name}
                value={payment.value}
                frequency={`
                  ${payment["frequency count"]} times a ${payment["frequency period"]}`}
              />
            );
          })}
          <div
            onClick={(e) => {
              handleActivatePayment(activePayment);
            }}
            className="  absolute top-0 bottom-0 right-0 left-0 z-0"
          ></div>
        </div>
        {activePayment.id && (
          <PaymentMenu
            notes={activePayment.notes}
            name={activePayment.name}
            value={activePayment.value}
            frequency={activePayment.frequency}
            start={activePayment.start}
            end={activePayment.end}
          />
        )}
      </div>
    </>
  );
}
