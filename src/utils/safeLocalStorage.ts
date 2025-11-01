// import LocalStorageKey from "constants/localstorage";
import { LocalStorageKeys } from "@/constants";
// import { serverLogger } from "./serverLogs.utils";

export const safeLocalStorage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const value = localStorage.getItem(key);

      // Special case: jwtToken might be a plain string (legacy)
      if (key === LocalStorageKeys.JWT_TOKEN) {
        try {
          return JSON.parse(value);
        } catch {
          // fallback: return as string
          return value as T;
        }
      }

      return JSON.parse(value);
    } catch (err) {
      //   serverLogger.error(
      //     `Failed to read localStorage key: ${key}`,
      //     err,
      //     "safeLocalStorage"
      //   );
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      //   serverLogger.error(
      //     `Failed to set localStorage key: ${key}`,
      //     err,
      //     "safeLocalStorage"
      //   );
    }
  },

  remove: (key: string) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(key);
    } catch (err) {
      //   serverLogger.error(
      //     `Failed to remove localStorage key: ${key}`,
      //     err,
      //     "safeLocalStorage"
      //   );
    }
  },
};
