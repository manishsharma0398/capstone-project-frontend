import { createSlice } from "@reduxjs/toolkit";
import { getApplicationsByOrganizationId } from "./applications.thunks";
import { RequestStatus } from "../common.types";
import { AppState } from "@/app/store";

export type ApplicationsState = {
  applications: Array<{ [key: string]: unknown }>;
  status:
    | RequestStatus.Idle
    | RequestStatus.Failed
    | RequestStatus.Loading
    | RequestStatus.Succeeded;
  error: string | null;
  errorCode: string | null;
};

export const INITIAL_STATE_APPLICATIONS: ApplicationsState = {
  applications: [],
  status: RequestStatus.Idle,
  error: null,
  errorCode: null,
};

const applicationsSlice = createSlice({
  name: "applications",
  initialState: INITIAL_STATE_APPLICATIONS,
  reducers: {
    setApplications: (state, action) => {
      state.status = RequestStatus.Succeeded;
      state.error = null;
      state.errorCode = null;
      state.applications = action.payload.applications;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApplicationsByOrganizationId.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(getApplicationsByOrganizationId.fulfilled, (state, action) => {
        state.status = RequestStatus.Succeeded;
        state.error = null;
        state.errorCode = null;
        state.applications = action.payload.applications;
      })
      .addCase(getApplicationsByOrganizationId.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.payload?.message as string;
        if (action.payload?.code) {
          state.errorCode = action.payload!.code;
        }
      });
  },
});

export const applicationsReducer = applicationsSlice.reducer;

export const { setApplications } = applicationsSlice.actions;

// selectors
export const getApplications = (state: AppState) =>
  state.applications.applications || INITIAL_STATE_APPLICATIONS.applications;
