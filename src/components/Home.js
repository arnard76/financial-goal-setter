import React from "react";

// home components
import Sidebar from "./Sidebar";
import Payments from "./Payments";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <Payments />
    </div>
  );
}
