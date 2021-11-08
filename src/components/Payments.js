import React, { useState } from "react";
import Payment, { PaymentMenu } from "./Payment";

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
    console.log("check", payment);
    if (activePayment.id === payment.id) {
      setActivePayment({ id: null });
    } else {
      setActivePayment(payment);
    }
  }

  return (
    <>
      <div className="flex flex-1">
        <div className="flex-1 p-4 h-screen overflow-y-auto bg-white dark:bg-gray-900">
          <strong className=" text-xl text-center text-gray-900 dark:text-white">
            <h1>What does your financial goal look like?</h1>
          </strong>
          {examplePayments.map((payment) => {
            // console.log(payment);
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
