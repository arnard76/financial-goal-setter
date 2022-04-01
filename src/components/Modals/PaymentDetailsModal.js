import { usePayments } from "../../contexts/PaymentsContext";
import { useModals } from "../../contexts/ModalsContext";
import Modal from "./Modal";
import { Temporal } from "@js-temporal/polyfill";

export default function PaymentDetailsModal({ isOpen, setOpen, payment }) {
  const { setEditingPayment, setViewingPayment } = useModals();

  const { deletePayment, occurancesInPeriod, userDetails } = usePayments();
  const { id, name, notes, start, end, frequency, amount } = payment;
  let startDate = new Temporal.PlainDate(start[2], start[1], start[0]);
  let endDate;
  if (end !== null) {
    endDate = new Temporal.PlainDate(end[2], end[1], end[0]);
  }
  return (
    <Modal isOpen={isOpen} setOpen={setOpen} title={`Viewing: ${payment.name}`}>
      <div className="dark:text-white">
        <p className="text-2xl">{name}</p>
        <p>Notes: {notes}</p>
        <p>Amount: {amount}</p>
        {frequency !== null ? (
          <>
            <p>
              Frequency: {frequency[0]}
              {` time${frequency[0] === 1 ? "" : "s"} every `} {frequency[1]}{" "}
              {frequency[2]}
              {frequency[1] === 1 ? "" : "s"} (occurs{" "}
              {occurancesInPeriod(
                start,
                end ? end : userDetails["period end date"],
                frequency
              )}{" "}
              times)
            </p>
          </>
        ) : (
          <p>Frequency: One-off</p>
        )}
        <p>Start: {startDate.toLocaleString("en-NZ")}</p>
        {end !== null ? <p>End: {endDate.toLocaleString("en-NZ")}</p> : <></>}
      </div>
      <div
        className="button mt-4"
        onClick={() => {
          setEditingPayment(payment);
        }}
      >
        Edit
      </div>
      <div
        className="button bg-red-700 hover:bg-red-800"
        onClick={() => {
          setViewingPayment({ id: null });
          deletePayment(id);
        }}
      >
        Delete
      </div>
    </Modal>
  );
}
