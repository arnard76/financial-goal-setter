import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Payments from "./Payments";

export default function Home() {
  return (
    <div className="flex ">
      {/* <h2>Home</h2>
      <Link to="/profile">Your Profile</Link> */}
      <Sidebar />
      <Payments />
    </div>
  );
}
