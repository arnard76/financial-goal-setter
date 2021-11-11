import React from "react";
import { Link } from "react-router-dom";

import AddPaymentForm from "./Forms/AddPaymentForm2";
import SettingsForm from "./Forms/SettingsForm";
import Tooltip from "./Tooltip";

import { usePayments } from "../contexts/PaymentContext";

export default function Sidebar(props) {
  function handleClickNavIcon(event, tabName) {
    var clickedIcon = event.currentTarget;
    var navIcons = document.querySelectorAll(".nav-icon");
    var clickedTab = document.querySelector("#" + tabName + "-tab");
    var navTabs = document.querySelectorAll(".nav-tab");
    // console.log(event.currentTarget);

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
    <div className="h-screen flex" onClick={() => props.refreshPayments()}>
      {/* NAV */}
      <nav className="relative flex flex-col justify-around p-4  bg-gray-200 dark:bg-gray-900">
        <div
          className="button nav-icon"
          onClick={(event) => handleClickNavIcon(event, "add")}
        >
          <i
            className="fa fa-plus fa-2x pointer-events-none"
            aria-hidden="true"
          ></i>
          <Tooltip text="Add" />
        </div>
        <div
          className="button nav-icon"
          onClick={(event) => handleClickNavIcon(event, "analysis")}
        >
          <i className="fa fa-file-text fa-2x " aria-hidden="true"></i>
          <Tooltip text="Analysis" />
        </div>
        <div
          className="button nav-icon group"
          onClick={(event) => handleClickNavIcon(event, "income")}
        >
          <i className="fa fa-cog fa-2x " aria-hidden="true"></i>
          {/* <p className="tooltip">Income</p> */}
          <Tooltip text="Income" />
        </div>

        <Link to="/profile" className="button nav-icon">
          <i className="fa fa-user fa-2x" aria-hidden="true"></i>
          <Tooltip text="Profile" />
        </Link>
      </nav>

      {/* ADD TAB */}
      <div id="add-tab" className="nav-tab">
        <strong className=" text-xl text-center my-2 text-gray-900 dark:text-white">
          <h1>Add a payment</h1>
        </strong>
        <PaymentsProvider>
          <AddPaymentForm refreshPayments={props.refreshPayments} />
        </PaymentsProvider>
      </div>

      {/* RESULTS TAB */}
      <div id="analysis-tab" className="nav-tab  text-gray-900 dark:text-white">
        <strong className=" text-xl text-center my-2 ">
          <h1>Financial Goals</h1>
        </strong>
        <p>
          Annual total: ${props.results.annualTotal} {props.settings.currency}
        </p>
      </div>

      {/* INCOME TAB */}
      <div id="income-tab" className="nav-tab text-gray-900 dark:text-white">
        <strong className=" text-xl text-center my-2">
          <h1>Income Information</h1>
        </strong>
        <p>
          These settings are optional - you can still see your analysis without
          adding income information!
        </p>
        <br />
        <SettingsForm currentCurrency={props.settings.currency} />
      </div>
    </div>
  );
}
