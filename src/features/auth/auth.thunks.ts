import { AppDispatch, AppState } from "@/app/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { authFetcher } from "@/services";
import token, { DecodedJWTToken } from "@/utils/token";
import { AxiosError } from "axios";

export interface APIResponseError {
  success: boolean;
  code: string;
  message: string;
  requestId: string;
}

interface ThunkApiConfig {
  state: AppState;
  dispatch: AppDispatch;
  rejectValue: APIResponseError;
}

export const loginUser = createAsyncThunk<
  { jwt: string; decodedJwt: DecodedJWTToken },
  { email: string; password: string },
  ThunkApiConfig
>(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const loggedInData = await authFetcher.post("/login", {
        email,
        password,
      });

      const decodedJwt = token.decode(loggedInData?.data?.data);

      return { jwt: loggedInData?.data?.data, decodedJwt };
    } catch (error) {
      const err = error as AxiosError<APIResponseError>;
      const apiError = err.response?.data;

      return rejectWithValue({
        code: apiError?.code || "UNKNOWN_ERROR",
        message: apiError?.message || "Something went wrong",
        requestId: apiError?.requestId || "",
        success: apiError?.success || false,
      });
    }
  }
);

export const registerUser = createAsyncThunk<
  { jwt: string; decodedJwt: DecodedJWTToken; user: unknown },
  {
    email: string;
    firstName: string;
    lastName: string;
    role: "volunteer" | "organization";
    password: string;
  },
  ThunkApiConfig
>(
  "auth/registerUser",
  async (
    {
      email,
      password,
      firstName,
      lastName,
      role,
    }: {
      email: string;
      firstName: string;
      lastName: string;
      role: "volunteer" | "organization";
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const registeredData = await authFetcher.post("/register/email", {
        email,
        password,
        firstName,
        lastName,
        role,
      });

      const data = registeredData?.data?.data;

      const jwt = data?.jwtToken;
      const user = data?.user;

      const decodedJwt = token.decode(jwt);

      return { jwt, decodedJwt, user };
    } catch (error) {
      const err = error as AxiosError<APIResponseError>;
      const apiError = err.response?.data;

      return rejectWithValue({
        code: apiError?.code || "UNKNOWN_ERROR",
        message: apiError?.message || "Something went wrong",
        requestId: apiError?.requestId || "",
        success: apiError?.success || false,
      });
    }
  }
);
