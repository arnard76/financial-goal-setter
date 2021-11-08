import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Payments from "./Payments";

import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const [payments, setPayments] = useState([]);
  const [userDetails, setUserDetails] = useState();
  const { currentUser } = useAuth();

  const fetchUserDetails = async () => {
    const q = query(
      collection(db, "user-details"),
      where("User", "==", currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      // setPayments((payments) => {
      //   return [...payments, doc.data()];
      // });
    });
  };

  const fetchPayments = async () => {
    console.log("check");
    const q = query(
      collection(db, "payments"),
      where("User", "==", currentUser.uid)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setPayments((payments) => {
        return [...payments, doc.data()];
      });
    });
  };

  return (
    <div className="flex">
      <Sidebar
        results={{ annualTotal: 5 }}
        settings={(userDetails, { currency: "NZD" })}
        fetchPayments={fetchPayments}
      />
      <Payments payments={payments} />
    </div>
  );
}
