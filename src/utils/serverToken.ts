import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { UserType } from "@/features/auth";
import { CookieKeys } from "@/constants";

export interface DecodedJWTToken {
  userId: number;
  role: UserType;
  provider: string;
  iat: number;
  exp: number;
}

const isTokenExpired = (decoded: DecodedJWTToken) => {
  if (!decoded?.exp || typeof decoded.exp !== "number") return true;

  const expireDate = decoded.exp * 1000;
  const currentDate = Date.now();

  return currentDate > expireDate;
};

const tokenServer = {
  /**
   * Gets the JWT token from cookies (server-side only)
   * @returns {string | null}
   */
  get: async (): Promise<string | null> => {
    try {
      const cookieStore = await cookies();
      const value = cookieStore.get(CookieKeys.JWT_TOKEN)?.value;
      return value || null;
    } catch {
      return null;
    }
  },

  /**
   * Checks if the JWT token stored in cookies is expired.
   * @returns {boolean} True if the JWT is expired, false otherwise.
   */
  isExpired: async (): Promise<boolean> => {
    try {
      const decoded = await tokenServer.decode();
      if (!decoded) return true;
      return isTokenExpired(decoded);
    } catch {
      return true; // Assume expired if any error occurs
    }
  },

  /**
   * Decodes a JWT token into a structured object
   * @returns {DecodedJWTToken | null}
   */
  decode: async (): Promise<DecodedJWTToken | null> => {
    try {
      const raw = await tokenServer.get();
      if (!raw) return null;

      const decoded = jwt.decode(raw) as DecodedJWTToken | null;
      if (!decoded || typeof decoded === "string") return null;

      if (isTokenExpired(decoded)) return null;

      return {
        userId: decoded.userId as number,
        role: decoded.role as UserType,
        provider: decoded.provider as string,
        iat: decoded.iat as number,
        exp: decoded.exp as number,
      };
    } catch {
      return null;
    }
  },
};

export default tokenServer;
