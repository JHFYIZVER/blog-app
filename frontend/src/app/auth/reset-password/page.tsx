import { ResetPasswordForm } from "@/features/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сброс пароля",
};

const page = () => {
  return <ResetPasswordForm />;
};

export default page;
