import React, { useState } from "react";
import TopVendors from "./TopVendors";
import VendorRequests from "./VendorRequests";

const VendMain = () => {
  const [activeButton, setActiveButton] = useState("topVendors");

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <>
      <div className="flex justify-between text-sm mb-5">
        <h1 className="text-lg font-bold">Vendors</h1>
      </div>
      <div className="bg-containerWhite w-full rounded-xl min-h-[600px] shadow-sm p-4">
        <div className="flex justify-between">
          <div className="flex">
            <div
              className={`rounded-l-xl cursor-pointer text-xs text-center px-8 py-3 ${
                activeButton === "topVendors"
                  ? "bg-navblue text-textColor2"
                  : "bg-subContainerColor text-white"
              }`}
              onClick={() => handleButtonClick("topVendors")}
            >
              Vendors
            </div>
            <div
              className={`rounded-r-xl cursor-pointer text-xs text-center px-2 py-3 ${
                activeButton === "newVendors"
                  ? "bg-navblue text-textColor2"
                  : "bg-subContainerColor text-white"
              }`}
              onClick={() => handleButtonClick("newVendors")}
            >
              Vendor Requests
            </div>
          </div>
        </div>

        {activeButton === "topVendors" ? <TopVendors /> : <VendorRequests />}
      </div>
    </>
  );
};

export default VendMain;
