import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { breakPoints, breakPointsBootstrap } from "../Theme";

export default function Sidebar() {
  console.log(window.outerWidth, window.innerWidth, breakPointsBootstrap.lg);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  });

  return (
    <div className={screenWidth <= breakPointsBootstrap.lg ? "w-100" : "h-100"}>
      <ul
        id="payments-nav"
        className={`nav  ${
          screenWidth <= breakPointsBootstrap.lg ? `  ` : ` h-100 flex-column `
        } d-flex justify-content-around`}
        style={{ backgroundColor: "rgb(21, 26, 25)" }}
      >
        <li className="nav-item" title="Add Payments">
          <a className="nav-link active" href="#">
            <i className="fa fa-plus fa-2x" aria-hidden="true"></i>
          </a>
        </li>
        <li title="Results">
          <a className="nav-link active" href="#">
            <i className="fa fa-file-text fa-2x" aria-hidden="true"></i>
          </a>
        </li>
        <li title="Settings">
          <a className="nav-link active" href="#">
            <i className="fa fa-cog fa-2x" aria-hidden="true"></i>
          </a>
        </li>
        <li title="Account">
          <Link className="nav-link active" to="/profile">
            <i className="fa fa-user fa-2x" aria-hidden="true"></i>
          </Link>
        </li>
        <li title="Logout">
          <a className="nav-link active" href="#">
            <i className="fa fa-sign-out fa-2x" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
    </div>
  );
}
