import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function PrivateHome() {
  const [open, setOpen] = useState(false);
  return (
    // fondo
    <div className="flex bg-teal-200">
      {/* sidebar */}
      <div
        className={`${
          open ? "w-72" : "w-20"
        } duration-300 h-screen bg-cyan-900 relative`}
      >
        {/* flecha */}
        <img
          src="http://localhost:3000/flecha2.png"
          className={`absolute cursor-pointer rounded-full 
          -right-3 top-9 w-7 border-2 p-1 bg-white border-cyan-900 ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
      </div>
      <div>
        <h1> Home Page</h1>
      </div>
    </div>
  );
}
