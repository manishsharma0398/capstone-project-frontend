"use client";

import type React from "react";

import { Provider } from "react-redux";
import { AppStore, createStore } from "./store";
import { JSX, useEffect, useRef } from "react";
import { useAppDispatch } from "@/hooks";

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

  const auth = {};

  if (storeRef.current === null) {
    // init store with data comming SSR app.js
    storeRef.current = createStore({
      auth: { ...auth },
    });
  }

  return (
    <Provider store={storeRef.current}>
      <StoreBootstrap />
      {children}
    </Provider>
  );
}
