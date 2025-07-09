import { NewPasswordForm } from "@/features/auth";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Восстановление пароля",
};

const page = () => {
  return <NewPasswordForm />;
};

export default page;
