"use client";

import type React from "react";

import { Provider } from "react-redux";
import { AppStore, createStore } from "./store";
import { JSX, useEffect, useRef } from "react";
import { useAppDispatch } from "@/hooks";
import { INITIAL_STATE_AUTH } from "@/features/auth";
import token from "@/utils/token";

// When a logged-in user enters the app, we then have to initialize other states
const StoreBootstrap = ({}: {}): JSX.Element | null => {
  const initialized = useRef(false);
  const dispatch = useAppDispatch();
  //   const {} = useAppSelector();

  /**
   * initialises logged-in user data
   *
   * - runs only once on the first render
   * - if the user is logged in, fetches the wishlist and registers the user on stripe
   */
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
  }, [dispatch]);

  return null;
};

export function Providers({ children }: { children: React.ReactNode }) {
  // use useRef to prevent reinitializing the Redux store on every render ensuring better performance
  const storeRef = useRef<AppStore | null>(null);

  if (storeRef.current === null) {
    let decoded = null;

    try {
      const jwt = token.get();
      if (jwt && !token.isExpired()) {
        decoded = token.decode(jwt);
      }
    } catch {
      decoded = null;
    }

    storeRef.current = createStore({
      auth: {
        ...INITIAL_STATE_AUTH,
        isAuthenticated: Boolean(decoded?.userId),
        userId: decoded?.userId ?? null,
        userType: decoded?.role ?? null,
      },
    });
  }

  return (
    // eslint-disable-next-line react-hooks/refs
    <Provider store={storeRef.current}>
      <StoreBootstrap />
      {children}
    </Provider>
  );
}
