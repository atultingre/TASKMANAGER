import React from "react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length > 0) {
    return (
      <div className="bg-white p-2 shadow-lg border border-gray-300 rounded-md">
        <p className="text-xs font-semibold text-purple-800 mb-1">{label}</p>
        <p className="text-xs font-semibold text-purple-800 mb-1">{`Count: ${payload[0].name}`}</p>
        <p className="text-xs text-gray-600">
          Count:{" "}
          <span className="font-medium text-sm text-gray-900">
            {payload[0].value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
