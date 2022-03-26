import React from "react";
import { Link } from "react-router-dom";
import { useModals } from "../contexts/ModalsContext";

import GeneralSettingsForm from "./Forms/SettingsForm";
import Tooltip from "./Tooltip";

export default function Sidebar() {
  const { setAddPaymentModalOpen, setPaymentGraphModalOpen } = useModals();

  return (
    <div className="h-screen flex">
      {/* NAV */}
      <nav className="relative flex flex-col justify-around p-4  bg-white dark:bg-gray-900">
        <div
          className="button nav-icon group"
          onClick={() => setAddPaymentModalOpen(true)}
        >
          <i className="fa fa-plus fa-2x" aria-hidden="true"></i>
          <Tooltip text="Add" />
        </div>
        <div
          className="button nav-icon group"
          onClick={() => setPaymentGraphModalOpen(true)}
        >
          <i className="fa fa-bar-chart fa-2x" aria-hidden="true"></i>
          <Tooltip text="Graph" />
        </div>
        {/* <div
          className="button nav-icon group"
          onClick={(event) => handleClickNavIcon(event, "analysis")}
        >
          <i className="fa fa-file-text fa-2x " aria-hidden="true"></i>
          <Tooltip text="Analysis" />
        </div> */}
        {/* <div
          className="button nav-icon group"
          onClick={(event) => handleClickNavIcon(event, "settings")}
        >
          <i className="fa fa-cog fa-2x " aria-hidden="true"></i>
          <Tooltip text="Settings" />
        </div> */}

        <Link to="/profile" className="button nav-icon group">
          <i className="fa fa-user fa-2x" aria-hidden="true"></i>
          <Tooltip text="Profile" />
        </Link>
      </nav>

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
        <GeneralSettingsForm />
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
