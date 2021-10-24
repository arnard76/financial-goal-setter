import React from "react";
import FormGroup from "./FormGroup";

export default function Check() {
  var someDate = new Date();
  var numberOfDaysToAdd = 13;
  var date = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

  function handleSubmitForm(event) {
    event.preventDefault();
    console.log("payment will be added we assure you");
  }

  return (
    <Tab>
      <strong className="text-white text-xl text-center my-2">
        <h1>Add a payment</h1>
      </strong>
      <form className="flex flex-col" onSubmit={handleSubmitForm}>
        <FormGroup
          type="textarea"
          label="Notes"
          placeholder="Additional details that could be important"
          classes={""}
          required={false} // useless statement
        />
        <FormGroup
          type="text"
          label="Name"
          placeholder="Coffee,Haircut,Mortgage ..."
          classes={""}
          required={true}
        />
        <FormGroup
          type="number"
          label="Value"
          prefix="$"
          postfix="USD"
          placeholder="yolo"
          initial="5"
          classes={"w-16 text-center"}
          required={true}
        />
        <FormGroup
          type="select"
          label="Type"
          initial="Continuous"
          classes={""}
          required={true}
          options={["Continuous", "Repeated", "One-off"]}
        />
        <FormGroup type="date" label="Start" initial={date} required={true} />
        <FormGroup type="date" label="End" initial={date} required={true} />

        <FormGroup type="submit" classes={""} />
      </form>
    </Tab>
  );
}

export function Tab({ children }) {
  // console.log(children);
  return (
    <div className="h-screen inline-flex flex-col  bg-gray-800">{children}</div>
  );
}
