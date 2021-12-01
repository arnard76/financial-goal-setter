import React, { useEffect } from "react";

// home components
import Sidebar from "./Sidebar";
import Payments from "./Payments";

import { usePayments } from "../contexts/PaymentContext";

export default function Home() {
  const { userDetails, payments, annualTotal } = usePayments();

  return (
    <div className="flex">
      <Sidebar />
      <Payments
        payments={payments}
        settings={{
          // periodStartDate: "12th December 2021",
          periodStartDate: JSON.parse(userDetails["period start date"]),
          periodEndDate: JSON.parse(userDetails["period end date"]),
        }}
        annualTotal={annualTotal}
      />
    </div>
  );
}
