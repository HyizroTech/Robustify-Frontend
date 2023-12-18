import axios from "axios";

export const HomeServices = {
  getOrderHistogram: async () =>
    axios.get("/charts/order-histogram").then((res) => res.data),

  getAvgUtilization: async () =>
    axios.get("/charts/average-utilization").then((res) => res.data),
};
