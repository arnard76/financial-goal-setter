import React from "react";
import Payment, { Payment2 } from "./Payment";

export default function Payments() {
  return (
    <div className="flex-1 p-4 h-screen overflow-y-auto">
      <strong className=" text-xl text-center my-2">
        <h1>What does your financial goal look like?</h1>
      </strong>
      <Payment name="Haircut" value={25} frequency={[1, "Month"]} />
      <Payment name="Groceries" value={200} frequency={[4, "Month"]} />
      <Payment
        name="New Very Long Payment"
        value={200000}
        frequency={[2, "Day"]}
      />
      <Payment name="Haircut" value={25} frequency={[1, "Month"]} />
      <Payment name="Groceries" value={200} frequency={[4, "Month"]} />
      <Payment
        name="New Very Long Payment"
        value={200000}
        frequency={[2, "Day"]}
      />

      <Payment2 name="Haircut" value={25} frequency={[1, "Month"]} />
      <Payment2 name="Groceries" value={200} frequency={[4, "Month"]} />
      <Payment2
        name="New Very Long Payment"
        value={200000}
        frequency={[2, "Day"]}
      />
    </div>
  );
}
