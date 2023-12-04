import axios from "axios";

export const OperationsServices = {
  listUsers: async () => {
    const res = await axios.get("/admin/users?utilization=true");
    return res?.data?.map((user) => {
      return {
        id: user.id,
        name: user.username,
        department: user.department,
        utilization: user.utilization * 100,
      };
    });
  },
};
