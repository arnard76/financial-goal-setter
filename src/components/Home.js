import React from "react";
import Sidebar from "./Sidebar";
import Payments from "./Payments";
import { PaymentProvider } from "../contexts/PaymentContext";
import { query, where, onSnapshot, collection } from "@firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

export default function Home() {
  const [payments, setPayments] = useState([]);
  const [userDetails, setUserDetails] = useState();
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

  const getFrequencyMultiplier = (period = "month") => {
    period = period.toLowerCase();
    let multiplier;
    if (period === "day") {
      multiplier = 365;
    } else if (period === "week") {
      multiplier = 52;
    } else if (period === "month") {
      multiplier = 12;
    } else if (period === "year") {
      multiplier = 1;
    }
    return multiplier;
  };

  const calculateTotal = (payments) => {
    let total = 0.0;
    for (let index = 0; index < payments.length; index++) {
      console.log(payments[index]);
      total +=
        payments[index].value *
        payments[index]["frequency count"] *
        getFrequencyMultiplier(payments[index]["frequency period"]);
    }
    setAnnualTotal(total);
  };

  return (
    <div className="flex">
      <PaymentProvider>
        <Sidebar settings={{ currency: "NZD" }} />
        <Payments />
      </PaymentProvider>
    </div>
  );
}
