import React from "react";

export default function Payment({ payment, onClick }) {
  const { name, amount, frequency } = payment;
  return (
    <>
      <div
        onClick={onClick}
        className="relative z-10 flex justify-evenly p-2 my-2 bg-blue-50 dark:bg-gray-900 dark:text-white rounded-xl border-blue-400 border-2 "
        style={{ cursor: "pointer" }}
      >
        <p className="flex-1 ">${amount}</p>
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
