import React, { useEffect } from "react";
import { ChartContainer, PieChart } from "@mui/x-charts";

function Pichart() {
  const labelContent = (entry) => `${entry.dataEntry.value}%`;
  return (
    <div className="h-[210px] bg-[#151515] w-[210px] rounded-full">
      <PieChart
        series={[
          {
            data: [
              {
                value: 30,
                color: "#FFDD11",
              },
              {
                value: 10,
                color: "#8E7900",
              },
              {
                value: 25,
                color: "#FFB600",
              },
              {
                value: 40,
                color: "#DDC784",
              },
            ],
            innerRadius: 60,
            outerRadius: 100,
            paddingAngle: 1,
            cornerRadius: 10,
            startAngle: -90,
            endAngle: 360,
            cx: 100,
            cy: 100,
          },
        ]}
        // Set the height to 100%
      >
        {({ series }) =>
          series[0].data.map((entry, index) => (
            <text
              key={`label-${index}`}
              x={entry.x + 5}
              y={entry.y + 5}
              style={{ fill: "#000", fontSize: 12 }}
              dominantBaseline="middle"
              textAnchor="middle"
            >
              {labelContent(entry)}
            </text>
          ))
        }
      </PieChart>
    </div>
  );
}

export default Pichart;
