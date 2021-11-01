import React from "react";
import { Link } from "react-router-dom";

import Tooltip from "./Tooltip";
import AddPaymentForm from "./Forms/AddPaymentForm2";
import SettingsForm from "./Forms/SettingsForm";

export default function Sidebar(props) {
  function handleClickNavIcon(event, tabName) {
    var clickedIcon = event.currentTarget;
    var navIcons = document.querySelectorAll(".nav-icon");
    var clickedTab = document.querySelector("#" + tabName + "-tab");
    var navTabs = document.querySelectorAll(".nav-tab");
    console.log(event.currentTarget);

    // toggle the tab (and close any others)
    if (clickedTab.classList.contains("active")) {
      clickedTab.classList.remove("active");
      clickedIcon.classList.remove("active");
    } else {
      navTabs.forEach((tab) => {
        tab.classList.remove("active");
      });
      navIcons.forEach((icon) => {
        icon.classList.remove("active");
      });
      clickedIcon.classList.add("active");
      clickedTab.classList.add("active");
    }
  }

  return (
    <div className="h-screen flex">
      {/* NAV */}
      <nav className="flex flex-col justify-around p-4 text-white bg-gray-500">
        <div
          className="button nav-icon"
          onClick={(event) => handleClickNavIcon(event, "add")}
        >
          <i
            className="fa fa-plus fa-2x pointer-events-none"
            aria-hidden="true"
          ></i>
        </div>
        <Tooltip
          text="Add"
          classes="absolute transform translate-x-16 ml-4 bg-gray-500 py-1 px-3 hidden"
        />
        <div
          className="button nav-icon"
          onClick={(event) => handleClickNavIcon(event, "results")}
        >
          <i className="fa fa-file-text fa-2x " aria-hidden="true"></i>
        </div>
        <div
          className="button nav-icon"
          onClick={(event) => handleClickNavIcon(event, "settings")}
        >
          <i className="fa fa-cog fa-2x " aria-hidden="true"></i>
        </div>

        <Link to="/profile" className="button nav-icon">
          <i className="fa fa-user fa-2x" aria-hidden="true"></i>
        </Link>
      </nav>

      {/* ADD TAB */}
      <div id="add-tab" className="nav-tab  ">
        <strong className=" text-xl text-center my-2">
          <h1>Add a payment</h1>
        </strong>
        <AddPaymentForm />
      </div>

      {/* RESULTS TAB */}
      <div id="results-tab" className="nav-tab  ">
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
