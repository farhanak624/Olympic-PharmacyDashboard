import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import "react-datepicker/dist/react-datepicker.css";
import { borderColor, width } from "@mui/system";
// import { getVendorSalesAnalysis } from "../../Api/ApiCall";
const VendorChart = () => {
  const [data, setData] = useState({});
  const [selected, setselected] = useState("Current Year");
  const [dropdown, setdropdown] = useState(false);

  useEffect(() => {
    // getSalesAnalysis(selected);
  }, [selected]);
  //   const getSalesAnalysis = async (selected) => {
  //     try {
  //       const res = await getVendorSalesAnalysis(selected);

  //       setData(res.data);
  //     } catch (error) {
  //       console.log(error, "sfdhhhhhhhhhhhhh");
  //     }
  //   };

  useEffect(() => {
    const options = {
      // set the labels option to true to show the labels on the X and Y axis
      xaxis: {
        show: true,
        categories: [
          "jan",
          "feb",
          "mar",
          "apr",
          "may",
          "jun",
          "jul",
          "aug",
          "sep",
          "oct",
          "nov",
          "dec",
        ],
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
          },
          formatter: function (value) {
            return "$" + value;
          },
        },
      },
      series: [
        {
          name: "Max Gain",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 100, 150, 200],
          color: "rgba(250, 0, 255, 1)",
        },
      ],
      chart: {
        sparkline: {
          enabled: false,
        },
        height: "100%",
        width: "100%",
        type: "area",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          var name = w.globals.initialSeries[seriesIndex].name;
          var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

          return (
            "<ul style='background-color: rgba(250, 0, 255, 1);  text-align: center; padding: 10px; font-size: 16px; border:none;'>" +
            "<li style='color: white;'>" +
            name +
            "</li>" +
            "<li style='color: white;'>" +
            data +
            "</li></ul>"
          );
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: "#21D7E3",
          gradientToColors: ["rgba(203, 187, 204, 0.04)"],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 4,
      },
      legend: {
        show: false,
      },
      grid: {
        show: true,
        strokeDashArray: 3,
        borderColor: "rgba(255, 255, 255, 0.15)",
      },
    };

    let chart = new ApexCharts(
      document.getElementById("labels-chart"),
      options
    );
    chart.render();

    // Cleanup function to destroy the chart instance when component unmounts
    return () => {
      chart.destroy();
    };
  }, [data]);

  return (
    <div class="w-full h-[90%]">
      <div class="flex justify-between w-full">
        <div className="">
          <div
            className="p-1.5 relative flex justify-between min-w-[20%] items-center rounded-lg"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
            onClick={() => setdropdown(!dropdown)}
          >
            <p className="px-2">{selected}</p>

            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.375076 1.70711L3.96086 5.29289C4.35139 5.68342 4.98455 5.68342 5.37508 5.29289L8.96086 1.70711C9.59083 1.07714 9.14466 0 8.25376 0H1.08218C0.191278 0 -0.254888 1.07714 0.375076 1.70711Z"
                fill="black"
              />
            </svg>

            {dropdown && (
              <ul
                style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", zIndex: 999 }}
                className="absolute top-9 w-full bg-black rounded-md left-0 hover:cursor-pointer"
              >
                <li
                  className="p-1 flex justify-center"
                  onClick={(e) => {
                    setselected("Current Year");
                    setdropdown(!dropdown);
                  }}
                >
                  Current Year
                </li>
                <li
                  className="p-1 flex justify-center"
                  onClick={(e) => {
                    setselected("Last Year");
                    setdropdown(!dropdown);
                  }}
                >
                  Last Year
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div id="labels-chart" class="px-2.5"></div>
      <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5 p-4 md:p-6 pt-0 md:pt-0"></div>
    </div>
  );
};

export default VendorChart;
