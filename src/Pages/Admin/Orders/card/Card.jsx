import React, { useState } from "react";

function Card({ text, data, img, color }) {
  const [selected, setselected] = useState("All");
  const [dropdown, setdropdown] = useState(false);
  return (
    <div className="bg-containerWhite  rounded-xl p-4">
      <div className="flex justify-between w-full text-sm">
        <p className="text-white">{text}</p>
      </div>
      <div className="flex gap-4 mt-10 items-center">
        <div className="p-3 rounded-lg" style={{ backgroundColor: color }}>
          {img}
        </div>
        <div>
          <div>
            <p className="text-xl font-bold text-white">
              {data?.totalCount ? data?.totalCount : "0"}
            </p>
            <p
              className="flex gap-1 items-center"
              style={{
                color: data?.persetage >= 0 ? "rgba(63, 197, 0, 1)" : "red",
              }}
            >
              <span
                className=""
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2em", // Adjust font size to make it smaller
                  lineHeight: "0.1", // Adjust line height to make it smaller
                }}
              >
                {data?.persetage >= 0 ? "\u2191" : "\u2193"}
              </span>
              {data?.persetage.toFixed()}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
