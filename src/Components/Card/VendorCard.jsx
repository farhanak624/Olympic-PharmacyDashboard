import React from "react";
function VendorCard({ img, icon, data, color, text }) {
  return (
    <div className="bg-containerWhite rounded-lg shadow-md p-3">
      <div className="p-3 rounded-xl w-14 flex items-center justify-center h-14 bg-navblue">
        {icon}
      </div>
      <div className="mt-3 mb-3">
        <h1 className="font-bold text-textColor">{text}</h1>
        <p className="text-textColor text-xs">Last 30 days</p>
      </div>
      <div className="w-full font-bold flex gap-1  text-xl items-center text-textColor">
        <p className="mb-2" style={{ color: "rgba(63, 197, 0, 1)" }}>
          {"\u2191"}
        </p>
        {data?.price}
      </div>
    </div>
  );
}

export default VendorCard;
