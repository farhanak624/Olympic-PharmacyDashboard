import React, { useEffect } from "react";
import ApexCharts from "apexcharts";
function OnebarGraph() {
  var options = {
    series: [
      {
        name: "Series 1",
        data: [44, 55, 41, 64, 22, 43, 21],
        color: "rgba(27, 89, 248, 0.8)",
      },
      // Add more series if needed
    ],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "10px",
        barHeight: "50%",
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
      theme: "dark", // You can also try 'light' for different default styles
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      fillSeriesColor: false, // If true, tooltip background color will match the series color
      marker: {
        show: true,
      },
      x: {
        show: true,
      },
      fixed: {
        enabled: false,
        position: "topRight", // Available options: topRight, topLeft, bottomRight, bottomLeft
        offsetX: 0,
        offsetY: 0,
      },
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          `<div style="padding: 5px; color: white; background-color: #ff6347;">` +
          `<strong>${w.globals.labels[dataPointIndex]}</strong>: ${series[seriesIndex][dataPointIndex]}` +
          `</div>`
        );
      },
    },
    xaxis: {
      categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
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

export default OnebarGraph;
