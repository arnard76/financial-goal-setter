import React, { useState } from "react";
import Payment from "./Payment";
import { usePayments } from "../contexts/PaymentContext";
import EditPaymentForm from "./Forms/EditPaymentForm";

export function PaymentMenu(props) {
  const { deletePayment } = usePayments();
  const { id, name, notes, start, end, type, date, frequency } = props.payment;
  return (
    <div className="overflow-hidden p-4 bg-gray-100 dark:text-white dark:bg-gray-800 w-72">
      <p className="text-2xl">{name}</p>
      <p>Notes: {notes}</p>
      {type === "Repeated" ? (
        <>
          <p>
            Frequency: {frequency[0]} {" times every "} {frequency[1]}{" "}
            {frequency[2]}
          </p>
          <p>Start: {start}</p>
          <p>End: {end}</p>
        </>
      ) : (
        <>
          {type === "Continuous" ? (
            <>
              <p>
                Frequency: {frequency[0]} {" times every "} {frequency[1]}{" "}
                {frequency[2]}
              </p>
            </>
          ) : (
            <>
              <p>Date: {date}</p>
            </>
          )}
        </>
      )}

      <div
        className="button mt-4"
        onClick={() => {
          props.editPayment(props.payment);
        }}
      >
        Edit
      </div>
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

export default function Payments({ payments, settings, annualTotal }) {
  const [activePayment, setActivePayment] = useState({ id: null });
  const [editingPayment, setEditingPayment] = useState({ id: null });

  function handleActivatePayment(payment) {
    // console.log("check", payment);
    if (activePayment.id === payment.id) {
      setActivePayment({ id: null });
    } else {
      setActivePayment(payment);
    }
  }

  function handleEditPayment(payment) {
    if (editingPayment.id === payment.id) {
      setEditingPayment({ id: null });
    } else {
      setEditingPayment(payment);
    }
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let { periodStartDate, periodEndDate } = settings;
  periodStartDate = new Date(
    periodStartDate[2],
    periodStartDate[1],
    periodStartDate[0]
  );

  periodEndDate = new Date(
    periodEndDate[2],
    periodEndDate[1],
    periodEndDate[0]
  );

  return (
    <>
      <div className="flex flex-1 ">
        <div className="relative  flex-1 p-4 h-screen overflow-y-auto bg-white dark:bg-gray-900 z-10">
          <div className="text-gray-900 dark:text-white  flex flex-col justify-center z-10 relative">
            <h1 className="relative z-10 text-xl text-center text-gray-900 dark:text-white font-bold">
              What does your financial goal look like?
            </h1>

            {/* QUICK PAYMENTS ANALYSIS */}
            <div className="flex justify-around w-1/2 m-auto">
              <div className="flex items-center">
                <p>
                  Showing {periodStartDate.getDate()}{" "}
                  {months[periodStartDate.getMonth()]}{" "}
                  {periodStartDate.getFullYear()} <br />
                  to {periodEndDate.getDate()}{" "}
                  {months[periodEndDate.getMonth()]}{" "}
                  {periodEndDate.getFullYear()}
                </p>
                <i
                  className="fa fa-pencil  ml-2 text-xl"
                  aria-hidden="true"
                ></i>
              </div>
              <p>Annual total: ${annualTotal.toFixed(2)}</p>
              <p>Weekly average: ${(annualTotal / 52).toFixed(2)} </p>
            </div>
          </div>
          {payments.map((payment) => {
            return (
              <Payment
                onClick={() => handleActivatePayment(payment)}
                key={payment.id}
                name={payment.name}
                amount={payment.amount}
                frequency={`
                  ${payment.frequency[0]} times every ${payment.frequency[1]} ${payment.frequency[2]}`}
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
        {activePayment.id && !editingPayment.id && (
          <PaymentMenu
            payment={activePayment}
            togglePayment={handleActivatePayment}
            editPayment={handleEditPayment}
          />
        )}
        {/* EDIT TAB */}

        {editingPayment.id && (
          <div
            id="edit-tab"
            className={`nav-tab ${editingPayment.id && "active"}`}
          >
            <h1 className="relative z-10 text-xl text-center text-gray-900 dark:text-white font-bold">
              Edit {editingPayment.name} payment
            </h1>

            <EditPaymentForm
              payment={editingPayment}
              goBack={() => {
                handleEditPayment(editingPayment);
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
