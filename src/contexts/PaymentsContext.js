import React, { useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

import { Temporal } from "@js-temporal/polyfill";

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

const PaymentsContext = React.createContext();

// if imported, this function gives access to all of PaymentsContext/which may
// or may not be accessible to their scope. This is the context consumer.
// (CLUE: gives access to paymentsDetails variable below)
export function usePayments() {
  return useContext(PaymentsContext);
}

export function PaymentsProvider({ children }) {
  // this is how to add a variable to state in functional components
  // this could change and will rerender this component (just like class components)
  // the 1st arg is the variable and the 2nd is the function to call to update variable
  // optional could put initial state of variable as arg of useState func
  const { currentUser, createUserDetails } = useAuth();

  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
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
    try {
      // delete doc from firestore db
      await deleteDoc(doc(db, "payments", paymentId));
      return [1, "deleted successfully"];
    } catch (err) {
      console.log(err);
      return [0, err.message];
    }
  }

  // calculates the total of all filteredPayments
  // between period start and end
  // period can be any period, default is user financial period
  function calcPeriodTotal(
    periodStart = userDetails["period start date"],
    periodEnd = userDetails["period end date"]
  ) {
    let filteredPayments = dateFilterPayments(periodStart, periodEnd);
    let total = 0.0;
    periodStart = new Temporal.PlainDate(
      periodStart[2],
      periodStart[1] + 1,
      periodStart[0]
    );
    periodEnd = new Temporal.PlainDate(
      periodEnd[2],
      periodEnd[1] + 1,
      periodEnd[0]
    );

    for (let index = 0; index < filteredPayments.length; index++) {
      let payment = filteredPayments[index];
      if (payment.frequency === null) {
        // One-off
        total += payment.amount;
      } else if (payment.end === null) {
        // Continuous
        let paymentStart = new Temporal.PlainDate(
          payment.start[2],
          payment.start[1] + 1,
          payment.start[0]
        );

        while (Temporal.PlainDate.compare(paymentStart, periodStart) === -1) {
          paymentStart = paymentStart.add({
            [payment.frequency[2] + "s"]: payment.frequency[1],
          });
          if (Temporal.PlainDate.compare(paymentStart, periodEnd) === -1) {
            break;
          }
        }

        if (Temporal.PlainDate.compare(paymentStart, periodEnd) === 1) {
          continue;
        }
        total +=
          payment.amount *
          calcOccurances(
            payment.frequency,
            [paymentStart.day, paymentStart.month - 1, paymentStart.year],
            [periodEnd.day, periodEnd.month - 1, periodEnd.year]
          );
      } else {
        // Repeated

        let paymentStart = new Temporal.PlainDate(
          payment.start[2],
          payment.start[1] + 1,
          payment.start[0]
        );

        let paymentEnd = new Temporal.PlainDate(
          payment.end[2],
          payment.end[1] + 1,
          payment.end[0]
        );

        while (Temporal.PlainDate.compare(paymentStart, periodStart) === -1) {
          paymentStart = paymentStart.add({
            [payment.frequency[2] + "s"]: payment.frequency[1],
          });
        }
        while (Temporal.PlainDate.compare(paymentEnd, periodEnd) === 1) {
          paymentEnd = paymentEnd.subtract({
            [payment.frequency[2] + "s"]: payment.frequency[1],
          });
        }

        total +=
          payment.amount *
          calcOccurances(
            payment.frequency,
            [paymentStart.day, paymentStart.month - 1, paymentStart.year],
            [paymentEnd.day, paymentEnd.month - 1, paymentEnd.year]
          );
      }
    }
    return total;
  }

  function calcPaymentDuration(start, end) {
    start = new Date(start[2], start[1], start[0]);
    end = new Date(end[2], end[1], end[0]);

    if (start > end) {
      throw RangeError("end date is earlier than start date!");
    }

    // console.log("start", start, "\nend", end);
    let paymentDuration = 1;
    paymentDuration += (end - start) / 86400000;
    return paymentDuration;
  }

  function calcOccurances(frequency, start, end) {
    // calc # of occurances of payment
    try {
      let diff = calcPaymentDuration(start, end);
      let occurances =
        frequency[0] *
        Math.floor(diff / (numDaysInPeriod(frequency[2]) * frequency[1]));

      // console.log(
      //   "start:",
      //   start,
      //   "\nend:",
      //   end,
      //   "\nfreq:",
      //   frequency,
      //   "\ndiff:",
      //   diff,
      //   "\noccurances:",
      //   occurances
      //   // "\nmultiplier:",
      //   // numDaysInPeriod(frequency[2])
      // );

      return occurances;
    } catch (err) {
      console.error(err);
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

  // e.g. 21 or 5 => "21" or "05"
  function formatTo2Digits(number) {
    return Math.floor(number / 10) === 0 ? "0" + number : number;
  }

  // returns list of payments that are within startDateLimit
  // if the end date is before period start or...
  // start date is after period, then
  function dateFilterPayments(
    startDateLimit = userDetails["period start date"],
    endDateLimit = userDetails["period end date"]
  ) {
    startDateLimit =
      startDateLimit[2].toString() +
      formatTo2Digits(startDateLimit[1]) +
      formatTo2Digits(startDateLimit[0]);

    endDateLimit =
      endDateLimit[2].toString() +
      formatTo2Digits(endDateLimit[1]) +
      formatTo2Digits(endDateLimit[0]);

    return payments.filter((payment) => {
      let paymentStartDate =
        payment.start[2].toString() +
        formatTo2Digits(payment.start[1]) +
        formatTo2Digits(payment.start[0]);

      let paymentEndDate;
      if (!payment.frequency) {
        paymentEndDate = paymentStartDate;
      } else if (!payment.end) {
        paymentEndDate = endDateLimit;
      } else {
        paymentEndDate =
          payment.end[2].toString() +
          formatTo2Digits(payment.end[1]) +
          formatTo2Digits(payment.end[0]);
      }
      let paymentPeriodOutsideFilterPeriod =
        paymentStartDate > endDateLimit || paymentEndDate < startDateLimit;

      return !paymentPeriodOutsideFilterPeriod;
    });
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

  // keeps total updated
  useEffect(() => {
    if (!loading) {
      setPeriodTotal(
        calcPeriodTotal(
          userDetails["period start date"],
          userDetails["period end date"]
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payments, loading]);

  // all useful values/functions related to payments
  const paymentDetails = {
    userDetails,
    payments,

    addPayment,
    deletePayment,
    editPayment,

    periodTotal,
    calcOccurances,
    calcPeriodTotal,
    dateFilterPayments,
  };

  return (
    // provides payments details to all of the children components
    <>
      {!loading && (
        <PaymentsContext.Provider value={paymentDetails}>
          {children}
        </PaymentsContext.Provider>
      )}
    </>
  );
}
