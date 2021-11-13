import React, { useEffect } from "react";

// home components
import Sidebar from "./Sidebar";
import Payments from "./Payments";

import { usePayments } from "../contexts/PaymentContext";

export default function Home() {
  const { getPayments, payments, annualTotal, calcTotal } = usePayments();

  // when page loads, gets a continuous snapshot of payments
  useEffect(() => {
    let unsubscribe = getPayments();
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // calculate annual total when payments are changed/added/deleted
  useEffect(() => {
    calcTotal(payments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payments]);

  return (
    <div className="flex">
      <Sidebar
        settings={{ currency: "NZD" }}
        results={{ annualTotal: annualTotal, weeklyEstimate: annualTotal / 52 }}
      />
      <Payments payments={payments} />
    </div>
  );
}
