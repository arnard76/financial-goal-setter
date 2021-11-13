import React, { useState } from "react";
import Payment from "./Payment";
import { usePayments } from "../contexts/PaymentContext";

export function PaymentMenu(props) {
  const { deletePayment } = usePayments();
  const { id, name, notes, start, end, type, date } = props.payment;
  return (
    <div className="overflow-hidden p-4 bg-gray-100 dark:text-white dark:bg-gray-800 w-72">
      <p className="text-2xl">{name}</p>
      <p>Notes: {notes}</p>
      {type === "Repeated" ? (
        <>
          <p>
            Frequency: {props.payment["frequency count"]} {" times a "}{" "}
            {props.payment["frequency period"]}
          </p>
          <p>Start: {start}</p>
          <p>End: {end}</p>
        </>
      ) : (
        <>
          {type === "Continuous" ? (
            <>
              <p>
                Frequency: {props.payment["frequency count"]} {" times a "}{" "}
                {props.payment["frequency period"]}
              </p>
            </>
          ) : (
            <>
              <p>Date: {date}</p>
            </>
          )}
        </>
      )}

      <div className="button mt-4">Edit</div>
      <div
        className="button bg-red-800 hover:bg-red-900"
        onClick={() => {
          props.togglePayment(props.payment);
          deletePayment(id);
        }}
      >
        Delete
      </div>
    </div>
  );
}

export default function Payments({ payments }) {
  const [activePayment, setActivePayment] = useState({ id: null });

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
            payment={activePayment}
            togglePayment={handleActivatePayment}
          />
        )}
      </div>
    </>
  );
}
