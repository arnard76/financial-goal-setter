import React, { useState } from "react";
import Payment from "./Payment";
import PaymentMenu from "./PaymentMenu";
import { usePayments } from "../contexts/PaymentContext";
import EditPaymentForm from "./Forms/EditPaymentForm";

export default function Payments() {
  const [showingPayment, setShowingPayment] = useState({ id: null });
  const [editingPayment, setEditingPayment] = useState({ id: null });
  let { userDetails, filteredPayments: payments, annualTotal } = usePayments();

  function handleShowPayment(payment) {
    if (showingPayment.id === payment.id) {
      setShowingPayment({ id: null });
    } else {
      setShowingPayment(payment);
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
  let {
    "period start date": periodStartDate,
    "period end date": periodEndDate,
  } = userDetails;
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
                {/* <i
                  className="fa fa-pencil  ml-2 text-xl"
                  aria-hidden="true"
                ></i> */}
              </div>
              <p>Annual total: ${annualTotal.toFixed(2)}</p>
              <p>Weekly average: ${(annualTotal / 52).toFixed(2)} </p>
            </div>
          </div>
      
      {/* ACTIVE TAB */}
      {showingPayment.id && !editingPayment.id && (
        <PaymentMenu
          payment={showingPayment}
          togglePayment={handleShowPayment}
          editPayment={handleEditPayment}
        />
      )}

      {/* EDIT TAB */}
      {editingPayment.id && (
        <div
          id="edit-tab"
          className={`nav-tab ${
            editingPayment.id && "active"
          }  overflow-y-auto h-screen`}
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
    </>
  );
}
