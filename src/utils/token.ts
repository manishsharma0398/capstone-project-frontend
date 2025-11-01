import jwt, { JwtPayload } from "jsonwebtoken";
import { safeLocalStorage } from "./safeLocalStorage";
import { LocalStorageKeys } from "@/constants";

export interface DecodedJWTToken {
  userId: number;
  role: string;
  provider: string;
  iat: number;
  exp: number;
}

const token = {
  /**
   * Gets the JWT token from the local storage
   * @returns {string | null}
   */
  get: () => {
    return safeLocalStorage.get(LocalStorageKeys.JWT_TOKEN, null);
  },

  /**
   * Sets the JWT token from into the local storage
   * @param value {string}
   * @returns {boolean}
   */
  set: (value: unknown) => {
    safeLocalStorage.set(LocalStorageKeys.JWT_TOKEN, value);
    return token.get() === value;
  },

  /**
   * Removes the JWT token from the local storage
   * @return {boolean}
   */
  clear: () => {
    safeLocalStorage.remove(LocalStorageKeys.JWT_TOKEN);
    return typeof token.get() !== "string";
  },

  /**
   * Checks if the JWT token stored in localStorage is expired.
   * @returns {boolean} True if the JWT is expired, false otherwise.
   * @throws {Error} If the JWT does not have an 'exp' property or if 'exp' is not a number.
   */
  isExpired: () => {
    try {
      const { exp } = jwt.decode<JwtPayload>(token.get());

      if (typeof exp === "undefined") {
        // noinspection ExceptionCaughtLocallyJS
        // throw new Error(ERROR_LOGS.JWT_NO_EXP_PROP);
      } else if (typeof exp !== "number") {
        // noinspection ExceptionCaughtLocallyJS
        // throw new Error(ERROR_LOGS.JWT_EXP_NOT_NUMBER);
      }
      const expireDate = exp * 1000;
      const currentDate = new Date().getTime();
      return currentDate > expireDate;
    } catch (error) {
      //   serverLogger.error(error);
      //   throw error;

      return true; // Assume expired if there's an error
    }
  },

  decode: (jwtToken: string): DecodedJWTToken => {
    return jwt.decode(jwtToken);
  },
};

export default token;
