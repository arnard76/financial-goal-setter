import React from "react";
// eslint-disable-next-line no-unused-vars
import { CategoryScale } from "chart.js/auto"; // needed for chart 😕
import { Bar } from "react-chartjs-2";

import { Temporal } from "@js-temporal/polyfill";

// custom components
import Modal from "./Modal";

import { usePayments } from "../../contexts/PaymentsContext";

export default function PaymentsGraphModal({ isOpen, setOpen }) {
  const { calcPeriodTotal, userDetails } = usePayments();
  let [day, month, year] = userDetails["period start date"];
  const startDate = new Temporal.PlainDate(year, month, day);
  [day, month, year] = userDetails["period end date"];
  const endDate = new Temporal.PlainDate(year, month, day);

  let chartData = {
    labels: [
      ...Array(Math.floor(endDate.since(startDate).days / 7) + 1).keys(),
    ].slice(1),
    datasets: [
      {
        label: "Amount spent this week",

        data: [
          ...Array(Math.floor(endDate.since(startDate).days / 7)).keys(),
        ].map((weekNumber) => {
          let start = startDate.add({ weeks: weekNumber });
          let end = start.add({ days: 6 });
          start = [start.day, start.month, start.year];
          end = [end.day, end.month, end.year];
          console.log(
            "week",
            weekNumber,
            "start",
            start,
            "end",
            end,
            "total",
            calcPeriodTotal(start, end),
            "\n"
          );
          return calcPeriodTotal(start, end);
        }),
        backgroundColor: ["grey", "white", "black"],
      },
    ],
  };
  return (
    <Modal isOpen={isOpen} setOpen={setOpen} title={`Payments Graph`}>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              color: "white",
              text: "Total spent in each week",
            },
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                title: (context) => "Week #" + context[0].label,
                label: (context) =>
                  context.formattedValue < 0
                    ? `Earned $${context.formattedValue * -1}`
                    : `Spent $${context.formattedValue}`,
              },
            },
          },
          scales: {
            y: {
              title: { display: true, text: "Amount spent", color: "white" },
              ticks: {
                callback: function (value) {
                  if (value < 0) {
                    return "-$" + value * -1;
                  }
                  return "$" + value;
                },
              },
            },
            x: {
              title: { display: true, text: "Week number", color: "white" },
              ticks: {
                callback: (value) =>
                  (value + 1) % 5 === 0 ? value + 1 : undefined,
              },
            },
          },
        }}
      />
    </Modal>
  );
}
