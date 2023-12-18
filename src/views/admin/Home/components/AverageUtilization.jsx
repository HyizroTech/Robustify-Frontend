import React, { useEffect, useState } from "react";
import { HomeServices } from "../services/home.service";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const AverageUtilization = () => {
  const [utilizationAverage, setUtilizationAverage] = useState(null);
  const COLORS = ["#5748C5", "#aaa7c8"];

  useEffect(() => {
    const getAvgUtilization = async () => {
      try {
        const utilizationValue = await HomeServices.getAvgUtilization();
        setUtilizationAverage(parseFloat(utilizationValue));
      } catch (error) {
        console.error(error.message);
      }
    };
    getAvgUtilization();
  }, []);

  const pieChartData =
    utilizationAverage !== null
      ? [
          { name: "Utilization", value: utilizationAverage },
          { name: "Remaining", value: 100 - utilizationAverage },
        ]
      : [];

  return (
    <PieChart width={300} height={200}>
      <Pie
        data={pieChartData}
        cx={137}
        cy={130}
        startAngle={180}
        endAngle={0}
        innerRadius={60}
        outerRadius={80}
        paddingAngle={5}
        dataKey="value"
        blendStroke
      >
        {pieChartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend verticalAlign="bottom" height={50} />
    </PieChart>
  );
};

export default AverageUtilization;
