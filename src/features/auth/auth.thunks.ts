import { AppDispatch, AppState } from "@/app/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { authFetcher } from "@/services";
import token, { DecodedJWTToken } from "@/utils/token";

interface ThunkApiConfig {
  state: AppState;
  dispatch: AppDispatch;
  rejectValue: { message: string };
}

export const login = createAsyncThunk<
  { jwt: string; decodedJwt: DecodedJWTToken },
  { email: string; password: string },
  ThunkApiConfig
>(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const loggedInData = await authFetcher.post("/login", {
        email,
        password,
      });

      if (!loggedInData) {
        return rejectWithValue({ message: "Login failed: no data returned" });
      }

      const decodedJwt = token.decode(loggedInData?.data);

      return { jwt: loggedInData?.data, decodedJwt };
    } catch (err: any) {
      //   serverLogger.error(
      //     "[Redux][Auth] Error on login",
      //     { context: { email }, err },
      //     "redux",
      //     "client"
      //   );
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);
