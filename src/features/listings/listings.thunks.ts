import { AppDispatch, AppState } from "@/app/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { listingsFetcher } from "@/services";
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

export const getListingsByOrganizationId = createAsyncThunk<
  { listings: Array<{ [key: string]: unknown }> },
  { organizationId: number },
  ThunkApiConfig
>(
  "listings/getListingsByOrganizationId",
  async (
    { organizationId }: { organizationId: number },
    { rejectWithValue }
  ) => {
    try {
      const listings = await listingsFetcher.get(`/${organizationId}`);

      return { listings: listings.data.data };
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

// export const registerUser = createAsyncThunk<
//   { jwt: string; decodedJwt: DecodedJWTToken; user: unknown },
//   {
//     email: string;
//     firstName: string;
//     lastName: string;
//     role: "volunteer" | "organization";
//     password: string;
//   },
//   ThunkApiConfig
// >(
//   "auth/registerUser",
//   async (
//     {
//       email,
//       password,
//       firstName,
//       lastName,
//       role,
//     }: {
//       email: string;
//       firstName: string;
//       lastName: string;
//       role: "volunteer" | "organization";
//       password: string;
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const registeredData = await authFetcher.post("/register/email", {
//         email,
//         password,
//         firstName,
//         lastName,
//         role,
//       });

//       const data = registeredData?.data?.data;

//       const jwt = data?.jwtToken;
//       const user = data?.user;

//       const decodedJwt = token.decode(jwt);

//       return { jwt, decodedJwt, user };
//     } catch (error) {
//       const err = error as AxiosError<APIResponseError>;
//       const apiError = err.response?.data;

//       return rejectWithValue({
//         code: apiError?.code || "UNKNOWN_ERROR",
//         message: apiError?.message || "Something went wrong",
//         requestId: apiError?.requestId || "",
//         success: apiError?.success || false,
//       });
//     }
//   }
// );
