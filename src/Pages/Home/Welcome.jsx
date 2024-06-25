import React from "react";
import "./Home.css";
import olympicLogo from "../../assets/images/olympicLogo.png";
function Welcome() {
  return (
    <div className="text-white">
      <div className="bg-[#020202cc] flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-10 justify-center items-center w-full inset-0 h-[calc(100%)] max-h-full">
        <div className=" p-4 md:ml-24 ">
          <p className="font-semibold ml-10 -mb-7 text-gray-300">WELCOME TO</p>
          <h1 className="flex items-center font-bold text-xl">
            <img src={olympicLogo} className="w-32" alt="" />
            OLYMPIC COMBAT
          </h1>
        </div>
      </div>
      <div className="absolute sun-like top-0"></div>
      <div className="absolute sun-like top-40 right-0 2xl:right-[30vh]"></div>
      <div className="absolute sun-like left-0 2xl:left-56 top-[50vh]"></div>
    </div>
  );
}

export default Welcome;
