import React, { useState } from "react";
import Payment from "./Payment";
import PaymentMenu from "./PaymentMenu";
import { usePayments } from "../contexts/PaymentsContext";
import EditPaymentForm from "./Forms/EditPaymentForm";

export default function Payments() {
  const [showingPayment, setShowingPayment] = useState({ id: null });
  const [editingPayment, setEditingPayment] = useState({ id: null });
  let { userDetails, filteredPayments, payments, periodTotal, calcOccurances } =
    usePayments();

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
      <div className="flex flex-1 flex-col h-screen relative">
        <div className="  flex-1 p-4 overflow-y-auto bg-white dark:bg-gray-900 z-10">
          <div className="text-gray-900 dark:text-white  flex flex-col justify-center relative">
            <h1 className="relative z-10 text-xl text-center text-gray-900 dark:text-white font-bold">
              What does your financial goal look like?
            </h1>
          </div>
          <div>
            {filteredPayments
              .sort((a, b) => {
                let aFreq = a.frequency
                  ? calcOccurances(
                      a.frequency,
                      a.start,
                      a.end ? a.end : userDetails["period end date"]
                    )
                  : 1;
                let bFreq = b.frequency
                  ? calcOccurances(
                      b.frequency,
                      b.start,
                      b.end ? b.end : userDetails["period end date"]
                    )
                  : 1;
                return bFreq - aFreq;
              })
              .map((payment) => {
                return (
                  <Payment
                    onClick={() => handleShowPayment(payment, true)}
                    key={payment.id}
                    payment={payment}
                    active
                  />
                );
              })}

            {payments
              .filter((payment) => !filteredPayments.includes(payment))
              .map((payment) => {
                return (
                  <Payment
                    onClick={() => handleShowPayment(payment, false)}
                    key={payment.id}
                    payment={payment}
                    active={false}
                  />
                );
              })}
          </div>
          <div
            onClick={(e) => {
              handleShowPayment(showingPayment);
              handleEditPayment(editingPayment);
            }}
            className="  absolute top-0 bottom-0 right-0 left-0 z-0"
          ></div>
        </div>

        {/* QUICK PAYMENTS ANALYSIS */}
        <div className="flex justify-around w-3/4 m-auto shadow-sm relative z-10">
          <div className="flex items-center">
            <p>
              {periodStartDate.getDate()}
              {"/"}
              {periodStartDate.getMonth() + 1}
              {"/"}
              {periodStartDate.getFullYear()}
              {" to "}
              {periodEndDate.getDate()}
              {"/"}
              {periodEndDate.getMonth() + 1}
              {"/"}
              {periodEndDate.getFullYear()}
            </p>
          </div>
          <p>Sum: ${periodTotal.toFixed(2)}</p>
          <p>Weekly average: ${(periodTotal / 52).toFixed(2)} </p>
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
