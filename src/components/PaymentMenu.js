import { usePayments } from "../contexts/PaymentsContext";
export default function PaymentMenu(props) {
  const { deletePayment } = usePayments();
  const { id, name, notes, start, end, frequency } = props.payment;
  let startDate = new Date(start[2], start[1], start[0]);
  let endDate;
  if (end !== null) {
    endDate = new Date(end[2], end[1], end[0]);
  }
  return (
    <div className="overflow-hidden p-4 bg-gray-100 dark:text-white dark:bg-gray-800 w-72">
      <p className="text-2xl">{name}</p>
      <p>Notes: {notes}</p>
      {frequency !== null ? (
        <p>
          Frequency: {frequency[0]}
          {` time${frequency[0] === 1 ? "" : "s"} every `} {frequency[1]}{" "}
          {frequency[2]}
          {frequency[1] === 1 ? "" : "s"}
        </p>
      ) : (
        <p>Frequency: One-off</p>
      )}
      <p>Start: {startDate.toDateString()}</p>
      {end !== null ? <p>End: {endDate.toDateString()}</p> : <></>}

      <div
        className="button mt-4"
        onClick={() => {
          props.editPayment(props.payment);
        }}
      >
        Edit
      </div>
      <div
        className="button bg-red-700 hover:bg-red-800"
        onClick={() => {
          props.togglePayment(props.payment);
          deletePayment(id);
        }}
      >
        Delete
      </div>
    </div>
  );
}
