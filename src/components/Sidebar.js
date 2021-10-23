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

  return <div className="bg-yellow-400">Sidebar</div>;
}
