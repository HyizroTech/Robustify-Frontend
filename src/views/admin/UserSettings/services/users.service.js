import axios from "axios";

export const UserSettingsServices = {
  list: async (department) => {
    const res = await axios.get(
      `/admin/users?role=EMPLOYEE&department=${department}`
    );
    if (res?.status === 200 && res?.data) {
      return res?.data?.map((item) => {
        return {
          id: item.id,
          name: item.username,
          department: item.department,
        };
      });
    }
    return false;
  },
  create: async (data) => {
    const res = await axios.post("admin/users", {
      username: data.username,
      email: data.email,
      password: data.password,
      department: data.department,
      role: data.role,
    });
    return res?.data;
  },
};
