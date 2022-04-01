import React from "react";
import Payment from "./Payment";
import { usePayments } from "../contexts/PaymentsContext";
import { useModals } from "../contexts/ModalsContext";
import { Temporal } from "@js-temporal/polyfill";

export default function Payments() {
  const { setViewingPayment } = useModals();
  let {
    userDetails,
    payments,
    dateFilterPayments,
    periodTotal,
    calcPeriodTotal,
    occurancesInPeriod,
  } = usePayments();

  let {
    "period start date": periodStartDate,
    "period end date": periodEndDate,
  } = userDetails;

  periodStartDate = new Temporal.PlainDate(
    periodStartDate[2],
    periodStartDate[1],
    periodStartDate[0]
  );

  periodEndDate = new Temporal.PlainDate(
    periodEndDate[2],
    periodEndDate[1],
    periodEndDate[0]
  );

  let numOfWholeWeeks = Math.floor(
    periodEndDate.since(periodStartDate).days / 7
  );

  let lastDayOfLastWholeWeek = periodStartDate.add({
    weeks: numOfWholeWeeks - 1,
    days: 6,
  });

  let weeklyAverage =
    calcPeriodTotal(userDetails["period start date"], [
      lastDayOfLastWholeWeek.day,
      lastDayOfLastWholeWeek.month,
      lastDayOfLastWholeWeek.year,
    ]) / numOfWholeWeeks;

  return (
    <div className="flex flex-col flex-1 p-4  bg-white dark:bg-gray-900 h-screen">
      {/* TITLE/MAIN HEADING */}
      <h1 className="w-full flex flex-col justify-center text-xl text-center text-gray-900 dark:text-white font-bold">
        What does your financial goal look like?
      </h1>

      {/* PAYMENTS (active above & inactive below) */}
      <div className="flex-1 overflow-y-auto">
        {dateFilterPayments()
          .sort((a, b) => {
            let aFreq = a.frequency
              ? occurancesInPeriod(a.start, a.end, a.frequency)
              : 1;
            let bFreq = b.frequency
              ? occurancesInPeriod(b.start, b.end, b.frequency)
              : 1;
            return bFreq - aFreq;
          })
          .map((payment) => {
            return (
              <Payment
                onClick={() => setViewingPayment(payment)}
                key={payment.id}
                payment={payment}
                active
              />
            );
          })}

        {payments
          .filter((payment) => !dateFilterPayments().includes(payment))
          .map((payment) => {
            return (
              <Payment
                onClick={() => setViewingPayment(payment)}
                key={payment.id}
                payment={payment}
                active={false}
              />
            );
          })}
      </div>

      {/* QUICK PAYMENTS ANALYSIS */}
      <div className="flex justify-around px-16 py-2  border-blue-400 border-solid border-t-4 dark:text-white">
        <div className="flex items-center">
          <p>
            {periodStartDate.toLocaleString("en-NZ")}
            {" to "}
            {periodEndDate.toLocaleString("en-NZ")}
          </p>
        </div>
        <p>
          Total:{" "}
          {periodTotal < 0
            ? "-$" + (periodTotal * -1).toFixed(2)
            : "$" + periodTotal.toFixed(2)}
        </p>
        <p>
          Weekly average:{" "}
          {weeklyAverage < 0
            ? "-$" + (weeklyAverage * -1).toFixed(2)
            : "$" + weeklyAverage.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
