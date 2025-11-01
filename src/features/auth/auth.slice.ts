import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "./auth.thunks";
import token from "@/utils/token";
// import api from "@/lib/api";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "volunteer" | "organization";
  token?: string;
}

export type UserType = "Retailer" | "Administrator" | "Wholesaler" | null;

export type AuthState = {
  isAuthenticated: boolean;
  userId?: string | null;
  retailerId?: string | null;
  user?: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  userType: UserType;
};

export const INITIAL_STATE_AUTH: AuthState = {
  isAuthenticated: false,
  userCredit: null,
  user: null,
  userId: null,
  retailerId: null,
  status: RequestStatus.Idle,
  error: null,
  userType: null,
};

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    userData: {
      email: string;
      password: string;
      name: string;
      role: "volunteer" | "organization";
    },
    { rejectWithValue }
  ) => {
    try {
      // const response = await api.post("/auth/register", userData);
      // return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = undefined;
      localStorage.removeItem("token");
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        token.set(action.payload.jwt);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
