import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { HomeServices } from "../services/home.service";
const OrderHistogram = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getHistogramData = async () => {
      try {
        const res = await HomeServices.getOrderHistogram();
        const resData = Object.entries(res).map(([key, value]) => ({
          name: key,
          value,
        }));
        setData(resData);
      } catch (error) {
        console.error(error.message);
      }
    };
    getHistogramData();
  }, []);

  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" radius={[10, 10, 0, 0]}/>
    </BarChart>
  );
};

export default OrderHistogram;
