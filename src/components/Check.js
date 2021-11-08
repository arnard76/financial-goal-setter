import React from "react";

export default function Check() {
  return (
    <div className="relative w-16 h-16 bg-gray-900 text-white">
      Parent
      <div className="absolute bg-red-500 inset-x-0 h-full">Child</div>
    </div>
  );
}
