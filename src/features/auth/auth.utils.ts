import { AppDispatch, AppState } from "@/app/store";
import {
  createListenerMiddleware,
  isAnyOf,
  TypedStartListening,
} from "@reduxjs/toolkit";
import { loginUser } from "./auth.thunks";
import { getListingsByOrganizationId } from "../listings";

export const authListener = createListenerMiddleware();

export type AppStartListening = TypedStartListening<AppState, AppDispatch>;

export const startAppListening =
  authListener.startListening as AppStartListening;

// when a user logs in we have to initialize other states
startAppListening({
  matcher: isAnyOf(loginUser.fulfilled),
  effect: async (_, listenerApi) => {
    console.log(":asdas");

    const { dispatch, getState } = listenerApi;
    const { userType, userId } = getState().auth;

    // init states
    if (userType === "organization") {
      const results = await Promise.allSettled([
        dispatch(
          getListingsByOrganizationId({ organizationId: userId! })
        ).unwrap(),
      ]);

      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error(
            `[Redux][Auth]Error on initialize other states ${i}:`,
            { reason: r.reason },
            "redux",
            "client"
          );
        }
      });
    }

    // get address
    // get cart
    // get following brands
  },
});
