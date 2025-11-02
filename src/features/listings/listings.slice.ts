import { createSlice } from "@reduxjs/toolkit";
import { getListingsByOrganizationId } from "./listings.thunks";
import { RequestStatus } from "../common.types";
import { AppState } from "@/app/store";

export type ListingsState = {
  listings: Array<{ [key: string]: unknown }>;
  status:
    | RequestStatus.Idle
    | RequestStatus.Failed
    | RequestStatus.Loading
    | RequestStatus.Succeeded;
  error: string | null;
  errorCode: string | null;
};

export const INITIAL_STATE_LISTINGS: ListingsState = {
  listings: [],
  status: RequestStatus.Idle,
  error: null,
  errorCode: null,
};

const listingsSlice = createSlice({
  name: "listings",
  initialState: INITIAL_STATE_LISTINGS,
  reducers: {
    setListings: (state, action) => {
      state.status = RequestStatus.Succeeded;
      state.error = null;
      state.errorCode = null;
      state.listings = action.payload.listings;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListingsByOrganizationId.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(getListingsByOrganizationId.fulfilled, (state, action) => {
        state.status = RequestStatus.Succeeded;
        state.error = null;
        state.errorCode = null;
        state.listings = action.payload.listings;
      })
      .addCase(getListingsByOrganizationId.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.payload?.message as string;
        if (action.payload?.code) {
          state.errorCode = action.payload!.code;
        }
      });
  },
});

export const listingsReducer = listingsSlice.reducer;

export const { setListings } = listingsSlice.actions;

// selectors
export const getListings = (state: AppState) =>
  state.listings.listings || INITIAL_STATE_LISTINGS.listings;
