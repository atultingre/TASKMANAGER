import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const CustomBarChart = ({ data }) => {
  // function to alternate colors
  const getBarColor = (entry) => {
    switch (entry?.priority) {
      case "Low":
        return "#00BC7D";
      case "Medium":
        return "#FE9900";
      case "High":
        return "#FF1F57";
      default:
        return "#00BC7D";
    }
  };

  const customTooltip = ({ active, payload }) => {
    // console.log("payload", payload);
    if (active && payload && payload.length) {
      const { priority, count } = payload[0]?.payload;
      return (
        <div className="custom-tooltip bg-white rounded-lg p-2 border border-gray-300 shadow-md">
          <p className="text-sx font-semibold text-purple-800 mb-1">
            {priority}
          </p>
          <p className="text-sm font-medium text-gray-900">
            Count: <span>{count}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" strokeDasharray="3 3" />

          <XAxis
            dataKey="priority"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
            allowDecimals={false}
          />

          <Tooltip content={customTooltip} cursor={{ fill: "transparent" }} />

          <Bar dataKey="count" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
