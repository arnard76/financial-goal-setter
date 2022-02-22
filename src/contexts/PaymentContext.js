import React, { useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

//firestore imports
import {
  collection,
  addDoc,
  updateDoc,
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
  const { currentUser, createUserDetails } = useAuth();

  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [userDetails, setUserDetails] = useState();
  const [periodTotal, setPeriodTotal] = useState(0);

  function getUserDetails() {
    let q = query(
      collection(db, "user-details"),
      where("user", "==", currentUser.uid)
    );
    return onSnapshot(
      q,
      async (querySnapshot) => {
        if (querySnapshot.size === 1) {
          setUserDetails(querySnapshot.docs[0].data());
          setLoading(false);
        } else if (querySnapshot.size === 0) {
          await createUserDetails();
          getUserDetails();
          setLoading(false);
        } else {
          console.log(
            "More than one user-details doc with user: " + currentUser.uid
          );
        }
      },
      (error) => {
        console.log("onSnapshot failed: ", error);
      }
    );
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

  function validatePayment(payment) {
    // payment has a name
    if (payment.name.length === 0) {
      return [0, "payment name value is blank"];
    }

    // payment name too long
    if (payment.name.length > 100) {
      return [0, "payment name value cannot be more than 100 characters long"];
    }

    // payment notes are too long
    if (payment.notes.length > 1000) {
      return [0, "payment notes cannot be more than 1000 characters long"];
    }

    // frequency count is integer
    if (payment.frequency !== null) {
      // frequency period is one of the day,week,month or year
      if (
        payment.frequency[2] !== "day" &&
        payment.frequency[2] !== "week" &&
        payment.frequency[2] !== "month" &&
        payment.frequency[2] !== "year"
      ) {
        return [
          0,
          "payment frequency period must be day, week, month or year " +
            payment["frequency period"],
        ];
      }
      if (payment.frequency[0] % 1 !== 0) {
        return [0, "Payment must occur a whole number of times"];
      }

      // frequency count is at least one
      if (payment.frequency[0] < 1) {
        return [0, "Payment must occur at least once"];
      }
    }
    return [1, "Payment is valid"];
  }

  async function addPayment(payment) {
    // validate payment data
    let [valid, message] = validatePayment(payment);
    if (!valid) {
      return [0, message];
    }

    try {
      await addDoc(collection(db, "payments"), {
        ...payment,
        user: currentUser.uid,
      });
      return [1, payment.name + " has been added to your payments"];
    } catch (err) {
      console.log(err);
      return [0, err.message];
    }
  }

  async function editPayment(paymentId, payment) {
    // validate payment data
    let [valid, message] = validatePayment(payment);
    if (!valid) {
      return [0, message];
    }

    try {
      // add data to firestore db
      await updateDoc(doc(db, "payments", paymentId), {
        ...payment,
      });
      return [1, payment.name + " has been updated"];
    } catch (err) {
      console.log(err);
      return [0, err.message];
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
      return [0, err.message];
    }
  }

  function numDaysInPeriod(period) {
    let numDays;
    if (period === "day") {
      numDays = 1;
    } else if (period === "week") {
      numDays = 7;
    } else if (period === "year") {
      numDays = 365;
    } else {
      numDays = NaN;
    }
    return numDays;
  }

  function calcPeriodTotal() {
          calcOccurances(
            payment.frequency,
            payment.start,
            userDetails["period end date"]
          );
      } else {
        // Repeated
        total +=
          payment.amount *
          calcOccurances(payment.frequency, payment.start, payment.end);
      }
    }
    setAnnualTotal(total);
  }

  // assume end is later than start date
  function calcPaymentDuration(start, end) {
    // const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // const daysInMonthLeapyear = [
    //   31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
    // ];
    let paymentDuration = 1;
    start = new Date(start[2], start[1], start[0]);
    end = new Date(end[2], end[1], end[0]);
    // console.log("start", start, "\nend", end);
    paymentDuration += (end - start) / 86400000;
    return paymentDuration;
  }

  function calcOccurances(frequency, start, end) {
    // re-calc # of occurances when freq or end/start change
    console.log("freq:", frequency, "   end:", end, "      start", start);

    let diff = calcPaymentDuration(start, end);
    let occurances =
      frequency[0] *
      Math.floor(diff / (numDaysInPeriod(frequency[2]) * frequency[1]));
    console.log(
      // "start:",
      // start,
      // "\nend:",
      // end,
      "\nfreq:",
      frequency,
      "\ndiff:",
      diff,
      "\noccurances:",
      occurances
      // "\nmultiplier:",
      // numDaysInPeriod(frequency[2])
    );
    return occurances;
  }

  // keeps user details & payments up to date
  useEffect(() => {
    let unsubscribe = getPayments();
    let unsubscribe2 = getUserDetails();
    return () => {
      unsubscribe();
      unsubscribe2();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keeps filteredPayments updated
  useEffect(() => {
    if (!loading) {
      calcTotal(payments, userDetails);
      filterPayments(
        payments,
        userDetails["period start date"],
        userDetails["period end date"]
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payments, loading]);

  // all useful values/functions related to authentication
  const paymentDetails = {
    userDetails,
    payments,
    filteredPayments,

    addPayment,
    deletePayment,
    editPayment,

    periodTotal,
    calcOccurances,
  };

  return (
    // provides auth details to all of the children components
    <>
      {!loading && (
        <PaymentContext.Provider value={paymentDetails}>
          {children}
        </PaymentContext.Provider>
      )}
    </>
  );
}
