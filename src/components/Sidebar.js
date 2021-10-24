import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { breakPoints, breakPointsBootstrap } from "../Theme";
import Tooltip from "./Tooltip";

export default function Sidebar() {
  // console.log(window.outerWidth, window.innerWidth, breakPointsBootstrap.lg);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  });

  function handleShowTab(event, tabName) {
    console.log("opening ", tabName, " tab!");
  }

  return (
    <div className="bg-gray-500 text-white h-screen flex px-2">
      <nav className="flex flex-col justify-around">
        <Link
          to=""
          onClick={(event) => handleShowTab(event, "add")}
          className="flex relative items-center"
        >
          <div
            className=" h-16 w-16 flex justify-center  items-center bg-blue-400 hover:bg-blue-500 rounded-3xl transition-all duration-200"
            onMouseEnter={(event) => {
              event.target.classList.add("rounded-xl");
              event.target.classList.remove("rounded-3xl");
              console.log(event.target.parentElement.children[1]);
              event.target.parentElement.children[1].classList.remove("hidden");
            }}
            onMouseLeave={(event) => {
              event.target.classList.add("rounded-3xl");
              event.target.classList.remove("rounded-xl");
              event.target.parentElement.children[1].classList.add("hidden");
            }}
          >
            <i className="fa fa-plus fa-2x mr" aria-hidden="true"></i>
          </div>
          <Tooltip
            text="Add"
            classes="absolute transform translate-x-16 ml-4 bg-gray-500 py-1 px-3 hidden"
          />
        </Link>
        <Link to="" onClick={(event) => handleShowTab(event, "results")}>
          <div
            className=" h-16 w-16 flex justify-center  items-center bg-blue-400 hover:bg-blue-500 rounded-3xl transition-all duration-200"
            onMouseEnter={(event) => {
              event.target.classList.add("rounded-xl");
              event.target.classList.remove("rounded-3xl");
            }}
            onMouseLeave={(event) => {
              event.target.classList.add("rounded-3xl");
              event.target.classList.remove("rounded-xl");
            }}
          >
            <i className="fa fa-file-text fa-2x" aria-hidden="true"></i>
          </div>
        </Link>
        <Link to="" onClick={(event) => handleShowTab(event, "settings")}>
          <div
            className=" h-16 w-16 flex justify-center  items-center bg-blue-400 hover:bg-blue-500 rounded-3xl transition-all duration-200"
            onMouseEnter={(event) => {
              event.target.classList.add("rounded-xl");
              event.target.classList.remove("rounded-3xl");
            }}
            onMouseLeave={(event) => {
              event.target.classList.add("rounded-3xl");
              event.target.classList.remove("rounded-xl");
            }}
          >
            <i className="fa fa-cog fa-2x" aria-hidden="true"></i>
          </div>
        </Link>
        <Link to="/profile" onClick={(event) => handleShowTab(event, "add")}>
          <div
            className=" h-16 w-16 flex justify-center  items-center bg-blue-400 hover:bg-blue-500 rounded-3xl transition-all duration-200"
            onMouseEnter={(event) => {
              event.target.classList.add("rounded-xl");
              event.target.classList.remove("rounded-3xl");
            }}
            onMouseLeave={(event) => {
              event.target.classList.add("rounded-3xl");
              event.target.classList.remove("rounded-xl");
            }}
          >
            <i className="fa fa-user fa-2x" aria-hidden="true"></i>
          </div>
        </Link>
      </nav>
    </div>
  );
}
