import React from "react";
import { Link } from "react-router-dom";

import Button from "./Button";
import Tooltip from "./Tooltip";
import AddPaymentForm from "./Forms/AddPaymentForm";
import SettingsForm from "./Forms/SettingsForm";

export default function Sidebar(props) {
  function handleShowTab(tabName) {
    // console.log("opening ", tabName, " tab!");
    var clickedTab = document.querySelector("#" + tabName + "-tab");
    var tabs = document.querySelectorAll(".nav-tab");

    if (!clickedTab.classList.contains("hidden")) {
      clickedTab.classList.add("hidden");
      clickedTab.classList.remove("inline-flex");
    } else {
      tabs.forEach((tab) => {
        if (!tab.classList.contains("hidden")) {
          tab.classList.add("hidden");
          tab.classList.remove("inline-flex");
        }
      });
      clickedTab.classList.add("inline-flex");
      clickedTab.classList.remove("hidden");
    }
  }

  function handleHoverNavIcon(event) {
    event.target.classList.toggle("rounded-xl");
    event.target.classList.toggle("rounded-3xl");
  }

  return (
    <div className="h-screen flex">
      {/* NAV */}
      <nav className="flex flex-col justify-around p-4 text-white bg-gray-500">
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

      {/* ADD TAB */}
      <div
        id="add-tab"
        className="nav-tab  flex-col  bg-gray-100 p-4 overflow-y-auto hidden"
      >
        <strong className=" text-xl text-center my-2">
          <h1>Add a payment</h1>
        </strong>
        <AddPaymentForm />
      </div>

      {/* RESULTS TAB */}
      <div
        id="results-tab"
        className="nav-tab  flex-col  bg-gray-100 p-4 overflow-y-auto hidden"
      >
        <strong className=" text-xl text-center my-2">
          <h1>Financial Goals</h1>
        </strong>
        <p>
          Annual total: ${props.results.annualTotal} {props.settings.currency}
        </p>
      </div>

      {/* SETTINGS TAB */}
      <div
        id="settings-tab"
        className="nav-tab  flex-col w-64 bg-gray-100 p-4 overflow-y-auto hidden"
      >
        <strong className=" text-xl text-center my-2">
          <h1>Personal Settings</h1>
        </strong>
        <SettingsForm currentCurrency={props.settings.currency} />
      </div>
    </div>
  );
}
