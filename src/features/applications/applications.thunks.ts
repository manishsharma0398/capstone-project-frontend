import { AppDispatch, AppState } from "@/app/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { applicationsFetcher } from "@/services";
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

export const getApplicationsByOrganizationId = createAsyncThunk<
  { applications: Array<{ [key: string]: unknown }> },
  null,
  ThunkApiConfig
>(
  "applications/getApplicationsByOrganizationId",
  async (_, { rejectWithValue }) => {
    try {
      const applications = await applicationsFetcher.get(`/organization`);

      return { applications: applications.data.data };
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
