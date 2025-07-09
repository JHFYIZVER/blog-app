import { SignUpForm } from "@/features/auth";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Регистрация",
};

const page = () => {
  return <SignUpForm />;
};

export default page;
