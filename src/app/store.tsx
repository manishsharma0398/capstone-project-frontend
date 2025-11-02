import { authReducer } from "@/features/auth";
import { authListener } from "@/features/auth/auth.utils";
import { listingsReducer } from "@/features/listings";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  auth: authReducer,
  listings: listingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
type PreloadedState<T> = Partial<T>;

export const createStore = (
  preloadedState?: PreloadedState<Partial<RootState>>
) =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().prepend(authListener.middleware);
    },
  });

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppState = ReturnType<AppStore["getState"]>;
