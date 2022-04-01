import React from "react";

// active payment is a payment that is in the filteredPayments
export default function Payment({ payment, onClick, active }) {
  const { name, amount, frequency } = payment;
  return (
    <>
      <div
        onClick={onClick}
        className={`relative z-10 flex justify-evenly p-2 my-2   rounded-xl ${
          active
            ? `border-blue-400 bg-blue-50 dark:bg-gray-900 dark:text-white`
            : `border-blue-200 bg-gray-400 dark:bg-gray-900 dark:text-white `
        }  border-2 `}
        style={{ cursor: "pointer" }}
      >
        <p className="flex-1 ">
          {amount < 0
            ? "-$" + (amount * -1).toFixed(2)
            : "$" + amount.toFixed(2)}
        </p>
        <p className="flex-1">{name}</p>
        <p className="flex-1">
          {frequency === null
            ? "one-off"
            : `${frequency[0] === 1 ? "once" : frequency[0] + " times"} every ${
                frequency[1] === 1
                  ? frequency[2]
                  : frequency[1] + " " + frequency[2] + "s"
              }`}
        </p>
      </div>
    </>
  );
}
