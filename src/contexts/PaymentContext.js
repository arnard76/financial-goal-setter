import React, { useState, useContext } from "react";
import { useAuth } from "./AuthContext";

//firebase imports
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

const PaymentContext = React.createContext();

// if imported, this function gives access to all of PaymentContext/which may
// or may not be accessible to their scope. This is the context consumer.
// (CLUE: gives access to paymentsDetails variable below)
export function usePayments() {
  return useContext(PaymentContext);
}

export function PaymentProvider({ children }) {
  // this is how to add a variable to state in functional components
  // this could change and will rerender this component (just like class components)
  // the 1st arg is the variable and the 2nd is the function to call to update variable
  // optional could put initial state of variable as arg of useState func
  const { currentUser } = useAuth();

  const [payments, setPayments] = useState([]);
  const [annualTotal, setAnnualTotal] = useState(0);

  function validatePayment(payment) {
    // payment has a name
    if (payment.name.length === 0) {
      return [0, "payment name value is blank"];
    }

    // frequency type is continuous, repeated or one-off
    if (
      payment.type !== "Continuous" &&
      payment.type !== "Repeated" &&
      payment.type !== "One-off"
    ) {
      return [
        0,
        "Payment type invalid, contact arnard76@gmail.com  " + payment.type,
      ];
    }

    // frequency period is one of the day,week,month or year
    if (
      payment["frequency period"] !== "day" &&
      payment["frequency period"] !== "week" &&
      payment["frequency period"] !== "month" &&
      payment["frequency period"] !== "year"
    ) {
      return [
        0,
        "payment frequency period is invalid" + payment["frequency period"],
      ];
    }

    // frequency count is integer
    if (payment["frequency count"] % 1 !== 0) {
      return [0, "Payment must occur a whole number of times"];
    }

    // frequency count is at least one
    if (payment["frequency count"] < 1) {
      return [0, "Payment must occur at least once"];
    }
    return [1, "Payment is valid"];
  }

  function getPayments() {
    let q = query(
      collection(db, "payments"),
      where("user", "==", currentUser.uid)
    );
    return onSnapshot(
      q,
      (querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
          // console.log({ ...doc.data(), id: doc.id });
          items.push({ ...doc.data(), id: doc.id });
        });
        setPayments(items);
      },
      (error) => {
        console.log("onSnapshot failed: ", error);
      }
    );
  }

  async function addPayment(payment) {
    // validate payment data
    let [valid, message] = validatePayment(payment);
    if (!valid) {
      return [0, message];
    }

    try {
      // add data to firestore db
      await addDoc(collection(db, "payments"), {
        ...payment,
        user: currentUser.uid,
      });
      return [1, payment.name + " has been added to your payments"];
    } catch (err) {
      console.log(err);
      return [0, err];
    }
  }

  async function deletePayment(paymentId) {
    // console.log("I promise I will delete payment ", paymentId);
    try {
      // delete doc from firestore db
      await deleteDoc(doc(db, "payments", paymentId));
      return [1, "deleted successfully"];
    } catch (err) {
      console.log(err);
      return [0, err];
    }
  }

  function editPayment(paymentId, newPayment) {
    console.log(
      "I promise I will update payment ",
      paymentId,
      " to ",
      newPayment
    );
    console.log(
      "is this a valid payment object: ",
      validatePayment(newPayment)
    );
  }

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

  function calcTotal(payments) {
    let total = 0.0;

    for (let index = 0; index < payments.length; index++) {
      if (payments[index].type === "Continuous") {
        total +=
          payments[index].value *
          payments[index]["frequency count"] *
          getFrequencyMultiplier(payments[index]["frequency period"]);
      }
    }
    setAnnualTotal(total);
  }

  // all useful values/functions related to authentication
  const paymentDetails = {
    getPayments,
    payments,
    addPayment,
    deletePayment,
    editPayment,
    calcTotal,
    annualTotal,
  };

  return (
    // provides auth details to all of the children components
    <PaymentContext.Provider value={paymentDetails}>
      {children}
    </PaymentContext.Provider>
  );
}
