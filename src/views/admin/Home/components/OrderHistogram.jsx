import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios";

const OrderHistogram = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Orders Count",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/charts/order-histogram");
      const data = await res?.data;
      console.log(data);

      setChartData({
        ...chartData,
        labels: Object.keys(data),
        datasets: [
          {
            ...chartData.datasets[0],
            data: Object.values(data),
          },
        ],
      });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = {
    maintainAspectRatio: true, // Enable responsive resizing
    aspectRatio: 2, // Width:Height ratio, 2 means width is twice the height
    // ... other options
  };

  return <Bar data={chartData} width="100" height="100" />;
};

export default OrderHistogram;
