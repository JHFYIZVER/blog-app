import { SignInForm } from "@/features/auth";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Вход в аккаунт",
};

const page = () => {
  return <SignInForm />;
};

export default page;
