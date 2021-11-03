import React, { useEffect, useState } from "react";
import Payment from "./Payment";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Payments() {
  const { currentUser } = useAuth();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // console.log(currentUser, currentUser.uid);

    async function fetchPayments() {
      const q = query(
        collection(db, "payments"),
        where("User", "==", currentUser.uid)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        setPayments((payments) => {
          return [...payments, doc.data()];
        });
      });
    }

    fetchPayments();

    return () => {};
  }, [currentUser]);

  return (
    <div className="flex-1 p-4 h-screen overflow-y-auto bg-white dark:bg-gray-900">
      <strong className=" text-xl text-center my-2 text-gray-900 dark:text-white">
        <h1>What does your financial goal look like?</h1>
      </strong>

      {payments.map((payment) => {
        return (
          <Payment
            name={payment.Name}
            value={payment.Value}
            frequency={[
              payment["Frequency Count"],
              payment["Frequency Period"],
            ]}
          />
        );
      })}

      {/* <Payment name="Haircut" value={25} frequency={[1, "Month"]} />
      <Payment name="Groceries" value={200} frequency={[4, "Month"]} />
       */}
    </div>
  );
}
