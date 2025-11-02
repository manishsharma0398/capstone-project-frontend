import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./auth.thunks";
import token from "@/utils/token";
import { RequestStatus } from "../common.types";
import { AppState } from "@/app/store";
import { deleteCookie, setCookie } from "cookies-next";
import { CookieKeys } from "@/constants";
import { redirect } from "next/navigation";

export type UserType = "volunteer" | "organization" | "admin";
export type AuthProvider = "local" | "phone" | "google";
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserType;
  token: string;
}

export type AuthState = {
  isAuthenticated: boolean;
  userId: number | null;
  user: User | null;
  status:
    | RequestStatus.Idle
    | RequestStatus.Failed
    | RequestStatus.Loading
    | RequestStatus.Succeeded;
  error: string | null;
  errorCode: string | null;
  userType: UserType | null;
  provider: AuthProvider | null;
};

const COOKIE_DOMAIN = "localhost";
const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds
export const DEFAULT_COOKIE_OPTIONS = {
  path: "/",
  domain: COOKIE_DOMAIN,
  maxAge,
};

export const INITIAL_STATE_AUTH: AuthState = {
  isAuthenticated: false,
  user: null,
  userId: null,
  status: RequestStatus.Idle,
  error: null,
  errorCode: null,
  userType: null,
  provider: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE_AUTH,
  reducers: {
    logoutUser: (state) => {
      token.clear();
      deleteCookie(CookieKeys.JWT_TOKEN, DEFAULT_COOKIE_OPTIONS);
      deleteCookie(CookieKeys.USER_ROLE, DEFAULT_COOKIE_OPTIONS);

      state.error = INITIAL_STATE_AUTH.error;
      state.errorCode = INITIAL_STATE_AUTH.errorCode;
      state.isAuthenticated = INITIAL_STATE_AUTH.isAuthenticated;
      state.provider = INITIAL_STATE_AUTH.provider;
      state.status = INITIAL_STATE_AUTH.status;
      state.user = INITIAL_STATE_AUTH.user;
      state.userId = INITIAL_STATE_AUTH.userId;
      state.userType = INITIAL_STATE_AUTH.userType;

      redirect("/");
    },

    setAuthenticatedUser: (state, action) => {
      state.status = RequestStatus.Succeeded;
      state.isAuthenticated = true;

      state.userId = action.payload.userId;
      state.userType = action.payload.role;
      state.provider = action.payload.provider;

      token.set(action.payload.jwt);
      setCookie(
        CookieKeys.JWT_TOKEN,
        action.payload.jwt,
        DEFAULT_COOKIE_OPTIONS
      );
      setCookie(
        CookieKeys.USER_ROLE,
        action.payload.decodedJwt.role,
        DEFAULT_COOKIE_OPTIONS
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = RequestStatus.Succeeded;
        state.isAuthenticated = true;

        state.userId = action.payload.decodedJwt.userId;
        state.userType = action.payload.decodedJwt.role;

        state.provider = action.payload.decodedJwt.provider;

        token.set(action.payload.jwt);
        setCookie(
          CookieKeys.JWT_TOKEN,
          action.payload.jwt,
          DEFAULT_COOKIE_OPTIONS
        );
        setCookie(
          CookieKeys.USER_ROLE,
          action.payload.decodedJwt.role,
          DEFAULT_COOKIE_OPTIONS
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.payload?.message as string;
        if (action.payload?.code) {
          state.errorCode = action.payload!.code;
        }
      })

      .addCase(registerUser.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
        state.errorCode = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = RequestStatus.Succeeded;
        state.isAuthenticated = true;

        state.userId = action.payload.decodedJwt.userId;
        state.userType = action.payload.decodedJwt.role;
        state.user = action.payload.user as User;
        state.provider = action.payload.decodedJwt.provider as AuthProvider;

        token.set(action.payload.jwt);
        setCookie(
          CookieKeys.JWT_TOKEN,
          action.payload.jwt,
          DEFAULT_COOKIE_OPTIONS
        );
        setCookie(
          CookieKeys.USER_ROLE,
          action.payload.decodedJwt.role,
          DEFAULT_COOKIE_OPTIONS
        );
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.payload?.message as string;
        if (action.payload?.code) {
          state.errorCode = action.payload!.code;
        }
      });
  },
});

export const authReducer = authSlice.reducer;

export const { logoutUser, setAuthenticatedUser } = authSlice.actions;

// selectors
export const getUserId = (state: AppState) =>
  state.auth.userId || INITIAL_STATE_AUTH.userId;
export const getIsAuthenticated = (state: AppState) =>
  state.auth.isAuthenticated || INITIAL_STATE_AUTH.isAuthenticated;
export const getUser = (state: AppState) =>
  state.auth.user || INITIAL_STATE_AUTH.user;

export const getAuthState = (state: AppState) =>
  state.auth || INITIAL_STATE_AUTH;
