import jwt, { JwtPayload } from "jsonwebtoken";
import { safeLocalStorage } from "./safeLocalStorage";
import { LocalStorageKeys } from "@/constants";
import { AuthProvider, UserType } from "@/features/auth";

export interface DecodedJWTToken {
  userId: number;
  role: UserType;
  provider: AuthProvider;
  iat: number;
  exp: number;
}

const token = {
  /**
   * Gets the JWT token from the local storage
   * @returns {string | null}
   */
  get: (): string | null => {
    return safeLocalStorage.get(LocalStorageKeys.JWT_TOKEN, null);
  },

  /**
   * Sets the JWT token from into the local storage
   * @param value {string}
   * @returns {boolean}
   */
  set: (value: string): boolean => {
    safeLocalStorage.set(LocalStorageKeys.JWT_TOKEN, value);
    return token.get() === value;
  },

  /**
   * Removes the JWT token from the local storage
   * @return {boolean}
   */
  clear: (): boolean => {
    safeLocalStorage.remove(LocalStorageKeys.JWT_TOKEN);
    return typeof token.get() !== "string";
  },

  /**
   * Checks if the JWT token stored in localStorage is expired.
   * @returns {boolean} True if the JWT is expired, false otherwise.
   * @throws {Error} If the JWT does not have an 'exp' property or if 'exp' is not a number.
   */
  isExpired: (): boolean => {
    try {
      const raw = token.get();
      if (!raw) return true;

      const decoded = jwt.decode(raw) as JwtPayload | null;

      const exp = decoded?.exp;
      if (typeof exp !== "number") return true;

      const expireDate = exp * 1000;
      const currentDate = Date.now();

      return currentDate > expireDate;
    } catch {
      return true; // Assume expired on any decoding error
    }
  },

  /**
   * Decodes a JWT token into a structured object
   */
  decode: (jwtToken: string): DecodedJWTToken => {
    const decoded = jwt.decode(jwtToken) as JwtPayload | null;

    if (!decoded || typeof decoded === "string") {
      throw new Error("Invalid or malformed JWT token");
    }

    // Explicitly map and typecast to your DecodedJWTToken interface
    return {
      userId: decoded.userId as number,
      role: decoded.role as UserType,
      provider: decoded.provider as AuthProvider,
      iat: decoded.iat as number,
      exp: decoded.exp as number,
    };
  },
};

export default token;
