import React, { useEffect } from "react";

// home components
import Sidebar from "./Sidebar";
import Payments from "./Payments";

import { usePayments } from "../contexts/PaymentContext";

export default function Home() {
  const {
    getUserDetails,
    userDetails,
    getPayments,
    payments,
    annualTotal,
    calcTotal,
  } = usePayments();

  // when page loads, gets a continuous snapshot of user details
  useEffect(() => {
    let unsubscribe = getPayments();
    let unsubscribe2 = getUserDetails();
    return () => {
      unsubscribe();
      unsubscribe2();
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
