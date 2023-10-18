import moment from "moment";

const AUTH_KEY = "Robusitfy";
const TTL = 8;

export const StorageService = {
  setAuthKey: (value) => {
    if (value === undefined) localStorage.removeItem(AUTH_KEY);
    else {
      const expiry = moment().add(TTL, "hours");
      localStorage.setItem(AUTH_KEY, JSON.stringify({ value, expiry }));
    }
    return true;
  },
  getAuthKey: () => {
    const valueRaw = localStorage.getItem(AUTH_KEY);
    if (!valueRaw) return undefined;
    return JSON.parse(valueRaw);
  },
};
