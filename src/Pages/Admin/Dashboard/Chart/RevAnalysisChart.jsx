import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";

const RevAnalysisChart = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState({});
  useEffect(() => {
    if (chartRef.current) {
      var options = {
        chart: {
          height: 380,
          width: "100%",
          type: "line",
        },
        series: [
          {
            name: "Series 1",
            data: [45, 52, 38, 45, 19, 33],
          },
          {
            name: "Series 2",
            data: [10, 32, 20, 35, 29, 53],
          },
        ],
        colors: ["#37DA82", "#FF2121"],
        xaxis: {
          categories: [
            "01 Jan",
            "02 Jan",
            "03 Jan",
            "04 Jan",
            "05 Jan",
            "06 Jan",
          ],
        },
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      // Cleanup on component unmount
      return () => {
        chart.destroy();
      };
    }
  }, [data]);

  return (
    <div className="bg-[#111111] mt-5 rounded-xl">
      <div class="flex justify-between w-full mt-3">
        <div className="text-white">
          <div className="flex items-center p-3">
            <div className="w-2 h-2 rounded-full bg-[#7F52FF]"></div>
            <p className="text-white px-2">Revenue Analysis</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-[#FF2121]"></div>
            <p className="text-white inline-flex items-center px-2">High</p>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-[#8FFBC0]"></div>
            <p className="text-white inline-flex items-center px-2">Low</p>
          </div>
          <div className="">
            <div
              className="p-2 relative flex justify-between min-w-[20%] items-center rounded-lg"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
              //  onClick={() => setdropdown(!dropdown)}
            >
              <svg
                width="10"
                height="12"
                viewBox="0 0 10 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.464844"
                  y="1.87891"
                  width="9.06956"
                  height="9.12111"
                  rx="1"
                  stroke="#AEB9E1"
                  stroke-width="0.8"
                />
                <path
                  d="M0.464844 4.92578H9.53441V9.99791C9.53441 10.5502 9.08669 10.9979 8.53441 10.9979H1.46485C0.91256 10.9979 0.464844 10.5502 0.464844 9.99791V4.92578Z"
                  fill="#AEB9E1"
                  stroke="#AEB9E1"
                  stroke-width="0.8"
                />
                <path
                  d="M7.51562 1V2.65369"
                  stroke="#AEB9E1"
                  stroke-width="0.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.55469 1V2.65369"
                  stroke="#AEB9E1"
                  stroke-width="0.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <p className="px-2 text-[#AEB9E1]">Monthly</p>

              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.375076 1.70711L3.96086 5.29289C4.35139 5.68342 4.98455 5.68342 5.37508 5.29289L8.96086 1.70711C9.59083 1.07714 9.14466 0 8.25376 0H1.08218C0.191278 0 -0.254888 1.07714 0.375076 1.70711Z"
                  fill="#AEB9E1"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full " id="chart" ref={chartRef}></div>
    </div>
  );
};

export default RevAnalysisChart;
