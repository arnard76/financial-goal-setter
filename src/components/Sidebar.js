import React from "react";
import { Link } from "react-router-dom";

import AddPaymentForm from "./Forms/AddPaymentForm2";
import EditPaymentForm from "./Forms/EditPaymentForm";
import PeriodConfigForm from "./Forms/SettingsForm";
import Tooltip from "./Tooltip";

export default function Sidebar(props) {
  function handleClickNavIcon(event, tabName) {
    var clickedIcon = event.currentTarget;
    var navIcons = document.querySelectorAll("nav .nav-icon");
    var clickedTab = document.querySelector("#" + tabName + "-tab");
    var navTabs = document.querySelectorAll("#add-tab, #settings-tab");

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
      <nav className="relative flex flex-col justify-around p-4  bg-white dark:bg-gray-900">
        <div
          className="button nav-icon group"
          onClick={(event) => handleClickNavIcon(event, "add")}
        >
          <i className="fa fa-plus fa-2x" aria-hidden="true"></i>
          <Tooltip text="Add" />
        </div>
        {/* <div
          className="button nav-icon group"
          onClick={(event) => handleClickNavIcon(event, "analysis")}
        >
          <i className="fa fa-file-text fa-2x " aria-hidden="true"></i>
          <Tooltip text="Analysis" />
        </div> */}
        <div
          className="button nav-icon group"
          onClick={(event) => handleClickNavIcon(event, "settings")}
        >
          <i className="fa fa-cog fa-2x " aria-hidden="true"></i>
          {/* <p className="tooltip">Income</p> */}
          <Tooltip text="Settings" />
        </div>

        <Link to="/profile" className="button nav-icon group">
          <i className="fa fa-user fa-2x" aria-hidden="true"></i>
          <Tooltip text="Profile" />
        </Link>
      </nav>

      {/* ADD TAB */}
      <div id="add-tab" className="nav-tab">
        <h1 className="relative z-10 text-xl text-center text-gray-900 dark:text-white font-bold">
          Add a payment
        </h1>

        <AddPaymentForm />
      </div>

      {/* RESULTS TAB */}
      {/* <div id="analysis-tab" className="nav-tab  text-gray-900 dark:text-white">
        <strong className=" text-xl text-center my-2 ">
          <h1>Financial Goals</h1>
        </strong>
        <p>
          Annual total: ${props.results.annualTotal.toFixed(2)}{" "}
          {props.settings.currency}
        </p>
        <p>
          Weekly average: ${props.results.weeklyEstimate.toFixed(2)}{" "}
          {props.settings.currency}
        </p>
      </div> */}

      {/* SETTINGS TAB */}
      <div id="settings-tab" className="nav-tab text-gray-900 dark:text-white">
        <h1 className="relative z-10 text-xl text-center text-gray-900 dark:text-white font-bold">
          Configure Financial Period
        </h1>
        <PeriodConfigForm />
        {/* <h1 className="relative z-10 text-xl text-center text-gray-900 dark:text-white font-bold">
          Income Information
        </h1>
        <p>
          These settings are optional - you can still see your analysis without
          adding income information!
        </p>
        <br /> 
        <SettingsForm currentCurrency={props.settings.currency} /> */}
      </div>
    </div>
  );
}
