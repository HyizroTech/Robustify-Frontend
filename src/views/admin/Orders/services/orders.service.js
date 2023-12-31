import axios from "axios";

export const OrdersServices = {
  list: async () =>
    axios.get("/orders").then((res) => {
      return res?.data?.orders?.map((order) => {
        return {
          id: order.id,
          name: order.Customer.name,
          status: order.status,
        };
      });
    }),
};
