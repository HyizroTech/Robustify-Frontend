import axios from "axios";

export const HomeServices = {
  getOrderHistogram: async () => {
    const res = await axios.get("/charts/order-histogram");
    return res?.data;
  },
};
