import { VerificationEmailForm } from "@/features/auth";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Подтверждение почты",
};

const page = () => {
  return <VerificationEmailForm />;
};

export default page;
