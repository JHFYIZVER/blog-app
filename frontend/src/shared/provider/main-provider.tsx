"use client";

import { type PropsWithChildren } from "react";
import { TanstackQueryProvider } from "./tanstack-query-provider";
import { ThemeProvider } from "./theme-provider";
import { ToastProvider } from "./toastProvider";

export function MainProvider({ children }: PropsWithChildren<unknown>) {
  return (
    <TanstackQueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange
        storageKey="teacoder-theme"
      >
        <ToastProvider />
        {children}
      </ThemeProvider>
    </TanstackQueryProvider>
  );
}
