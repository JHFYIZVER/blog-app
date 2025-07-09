"use client";

import { Toaster } from "../ui/sonner";

export function ToastProvider() {
  return <Toaster position="bottom-right" duration={3000} />;
}
