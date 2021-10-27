import React, { createRef, useState } from "react";
import { Link } from "react-router-dom";
import FormGroup from "./FormGroup";
import Message from "./Message";
import Button from "./Button";
import Tooltip from "./Tooltip";

export default function Sidebar(props) {
  // console.log(window.outerWidth, window.innerWidth, breakPointsBootstrap.lg);
  // const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const incomeTypeRef = createRef();
  // useEffect(() => {
  //   window.addEventListener("resize", () => {
  //     setScreenWidth(window.innerWidth);
  //   });
  // });

  function handleShowTab(tabName) {
    // console.log("opening ", tabName, " tab!");
    var clickedTab = document.querySelector("#" + tabName + "-tab");
    var tabs = document.querySelectorAll(".nav-tab");

    tabs.forEach((tab) => {
      tab.classList.remove("inline-flex");
      tab.classList.add("hidden");
    });
    clickedTab.classList.toggle("hidden");
    clickedTab.classList.toggle("inline-flex");
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("payment will be added we assure you");
    // setError("")
    setMessage("it wasn't added but who cares am i right?");
  }

  function handleHoverNavIcon(event) {
    event.target.classList.toggle("rounded-xl");
    event.target.classList.toggle("rounded-3xl");
  }

  return (
    <div className="bg-gray-500  h-screen flex">
      <nav className="flex flex-col justify-around p-4 text-white">
        <Button
          classes="h-16 w-16 flex justify-center  items-center rounded-3xl"
          onMouseEnter={handleHoverNavIcon}
          onMouseLeave={handleHoverNavIcon}
          onClick={(event) => handleShowTab("add")}
        >
          <i className="fa fa-plus fa-2x " aria-hidden="true"></i>
        </Button>
        <Tooltip
          text="Add"
          classes="absolute transform translate-x-16 ml-4 bg-gray-500 py-1 px-3 hidden"
        />
        <Button
          classes="h-16 w-16 flex justify-center  items-center rounded-3xl"
          onMouseEnter={handleHoverNavIcon}
          onMouseLeave={handleHoverNavIcon}
          onClick={(event) => handleShowTab("results")}
        >
          <i className="fa fa-file-text fa-2x " aria-hidden="true"></i>
        </Button>
        <Button
          classes="h-16 w-16 flex justify-center  items-center rounded-3xl"
          onMouseEnter={handleHoverNavIcon}
          onMouseLeave={handleHoverNavIcon}
          onClick={(event) => handleShowTab("settings")}
        >
          <i className="fa fa-cog fa-2x " aria-hidden="true"></i>
        </Button>

        <Link to="/profile">
          <Button
            classes="h-16 w-16 flex justify-center  items-center rounded-3xl"
            onMouseEnter={handleHoverNavIcon}
            onMouseLeave={handleHoverNavIcon}
          >
            <i className="fa fa-user fa-2x" aria-hidden="true"></i>
          </Button>
        </Link>
      </nav>
      <div
        id="add-tab"
        className="nav-tab  flex-col  bg-gray-100 p-4 overflow-y-auto hidden"
      >
        <strong className=" text-xl text-center my-2">
          <h1>Add a payment</h1>
        </strong>
        <form className="flex flex-col">
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
            placeholder="How much money?"
            initial="5"
            classes={"w-16"}
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
          <FormGroup type="date" label="Start" required={true} />
          <FormGroup type="date" label="End" required={true} />

          <button disabled={loading} onClick={handleSubmit}>
            <Button>Add Payment</Button>
          </button>
        </form>
        {error && <Message type="error" message={error} />}
        {message && <Message message={message} />}
      </div>
      <div
        id="results-tab"
        className="nav-tab  flex-col  bg-gray-100 p-4 overflow-y-auto hidden"
      >
        <strong className=" text-xl text-center my-2">
          <h1>Financial Goals</h1>
        </strong>
        <p>
          Annual total: ${props.results.annualTotal} {props.results.currency}
        </p>
      </div>
      <div
        id="settings-tab"
        className="nav-tab  flex-col  bg-gray-100 p-4 overflow-y-auto hidden"
      >
        <strong className=" text-xl text-center my-2">
          <h1>Personal Settings</h1>
        </strong>
        <form className="flex flex-col">
          <FormGroup
            type="checkbox"
            prefix="Wage"
            postfix="Salary"
            label="Income Type"
            ref={incomeTypeRef}
          />
          <FormGroup
            type="number"
            prefix="$"
            postfix={props.results.currency}
            label="Hourly Wage"
          />
          <FormGroup
            type="number"
            prefix="$"
            postfix={props.results.currency}
            label="Yearly Salary"
          />
          <button disabled={loading} onClick={handleSubmit}>
            <Button>Update Settings</Button>
          </button>
        </form>
        {error && <Message type="error" message={error} />}
        {message && <Message message={message} />}
      </div>
    </div>
  );
}
