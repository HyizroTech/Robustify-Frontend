import axios from "axios";

import { StorageService } from "../../../services/storage.service";

export const LoginService = {
  login: async (username, password) => {
    const res = await axios.post("auth/signin", {
      username: username.toLowerCase(),
      password,
    });
    if (res.status === 200 && res?.data?.accessToken) {
      StorageService.setAuthKey(res?.data);
      return res?.data?.roles;
    }
    return false;
  },
};
