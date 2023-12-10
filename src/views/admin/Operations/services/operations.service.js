import axios from "axios";

export const OperationsServices = {
  listUsersWithUtil: async () => {
    const res = await axios.get("/admin/users?utilization=true");
    return res?.data?.map((user) => {
      return {
        id: user.id,
        name: user.username,
        department: user.department,
        utilization: user.Utilizations[0]?.utilizationRate * 100  || 0,
      };
    });
  },

  listDesignEmployees: async () => {
    const res = await axios.get(
      "/admin/users?department=Design&utilization=false"
    );

    return res?.data?.map((user) => {
      return { name: user.username, id: user.id };
    });
  },

  createNewOrder: (data) =>
    axios.post("/orders", data).then((res) => res?.data),
};
