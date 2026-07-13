import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const defaultColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

const CustomPieChart = ({ data, label, colors = defaultColors }) => {
  return (
    <ResponsiveContainer width="100%" height={325}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="status"
          label={label}
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
          // fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
