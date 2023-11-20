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
};
