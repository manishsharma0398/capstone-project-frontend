import { authReducer } from "@/features/auth";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({ auth: authReducer });

export type RootState = ReturnType<typeof rootReducer>;
type PreloadedState<T> = Partial<T>;

export const createStore = (
  preloadedState?: PreloadedState<Partial<RootState>>
) =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
    preloadedState,
  });

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppState = ReturnType<AppStore["getState"]>;
