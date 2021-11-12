import React, { useEffect } from "react";

// home components
import Sidebar from "./Sidebar";
import Payments from "./Payments";

import { usePayments } from "../contexts/PaymentContext";

// writing to firestore db
import { query, where, onSnapshot, collection } from "@firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

export default function Home() {
  const examplePayments = [
    {
      id: "TNrc4oq57VAvNK72vtUD",
      notes: "In newmarket, with student discount :)",
      name: "Haircut",
      value: 15,
      "frequency count": 1,
      "frequency period": "month",
      start: Date.UTC(1000, 1, 1),
      end: Date.UTC(9999, 12, 31),
    },
    {
      id: "TNrc4oq57VAvNK72vtUE",
      notes: "Delivered from countdown",
      name: "Groceries",
      value: 200,
      "frequency count": 4,
      "frequency period": "month",
      start: Date.UTC(1000, 1, 1),
      end: Date.UTC(9999, 12, 31),
    },
  ];
  const { getPayments, payments, annualTotal, calcTotal } = usePayments();

  const { currentUser } = useAuth();
  async function fetchUserDetails() {
    const q = query(
      collection(db, "user-details"),
      where("user", "==", currentUser.uid)
    );

    const querySnapshot = await onSnapshot(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }

  // when page loads, gets a continuous snapshot of payments
  useEffect(() => {
    let unsubscribe = getPayments();
    return () => {
      unsubscribe = false;
  };
  }, []);

  // calculate annual total when payments are changed/added/deleted
  useEffect(() => {
    calcTotal(payments);
    return () => {};
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
