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
  const startDate = new Temporal.PlainDate(year, month + 1, day);
  let chartData = {
    labels: [...Array(52 + 1).keys()].slice(1),
    datasets: [
      {
        label: "Weeks of your financial period",
        data: [...Array(52).keys()].map((weekNumber) => {
          let start = startDate.add({ weeks: weekNumber });
          let end = start.add({ days: 6 });
          start = [start.day, start.month - 1, start.year];
          end = [end.day, end.month - 1, end.year];
          // console.log(
          //   "week",
          //   weekNumber,
          //   "start",
          //   start,
          //   "end",
          //   end,
          //   "total",
          //   calcPeriodTotal(start, end),
          //   "\n"
          // );
          return calcPeriodTotal(start, end);
        }),
        backgroundColor: [
          "#ffbb11",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
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
              text: "Payments amounts",
            },
            legend: {
              display: true,
              position: "bottom",
            },
          },
        }}
      />
    </Modal>
  );
}
