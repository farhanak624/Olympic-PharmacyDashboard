import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
function BarGraph() {
  const gradientColors = ["#18FF90"];

  // Define the gradient stops
  const gradientStops = [0, 10, 20];

  // Define the gradient configuration
  const gradient = {
    type: "horizontal",
    gradientStops: gradientStops,
    colorStops: gradientColors,
  };
  var options = {
    series: [
      {
        name: "Series 1",
        data: [44, 55, 41, 64, 22, 43, 21, 52, 86, 44, 78, 90],
      },
    ],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "10px",
        borderRadius: 5,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      x: {
        show: true,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 1,
        colorStops: [
          {
            offset: 0,
            color: "#18FF90",
            opacity: 1,
          },
          {
            offset: 100,
            color: "#18FF90",
            opacity: 1,
          },
        ],
      },
    },
  };

  useEffect(() => {
    let chart = new ApexCharts(
      document.getElementById("labels-chart1"),
      options
    );
    chart.render();

    // Cleanup function to destroy the chart instance when component unmounts
    return () => {
      chart.destroy();
    };
    // Ensure the previous chart instance is destroyed
  }, []); // Ensure the chart is rendered when options change

  return (
    <div id="labels-chart1">
      {/* Ensure the element with ID "chart" is present */}
    </div>
  );
}

export default BarGraph;
