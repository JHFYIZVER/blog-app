"use client";
import { validate } from "@/shared/lib";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { ResetPasswordFormData, resetPasswordSchema } from "../lib/types";
import { useState } from "react";
import Link from "next/link";

const initialFormState: ResetPasswordFormData = {
  email: "",
};

const ResetPasswordForm = () => {
  const [userFormData, setUserFormData] = useState<ResetPasswordFormData>({
    email: "",
  });

  const [showErorrs, setShowErrors] = useState<boolean>(false);

  const formData: ResetPasswordFormData = {
    ...initialFormState,
    ...userFormData,
  };

  const humdleSumbit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const errors = validate(formData, resetPasswordSchema);
      if (errors) {
        setShowErrors(true);
        return;
      }
      const validatedData = resetPasswordSchema.parse(formData);
    } catch (error) {}
  };
  return (
    <form
      className="max-w-lg w-full mx-auto rounded-lg bg-accent p-5 space-y-4 lg:space-y-6"
      onSubmit={humdleSumbit}
    >
      <h1 className="text-center font-bold text-[clamp(22px,2vw,32px)]">
        Сброс пароля
      </h1>
      <p className="text-accent-foreground/80 text-[clamp(12px,2vw,16px)]">
        Чтобы сбросить пароль введите свой email
      </p>
      <label className="my-3 flex flex-col">
        <span className="text-xs md:text-sm lg:text-base mb-2">Email</span>
        <Input aria-label="email input" type="email" />
      </label>

      <Button aria-label="login button" className="w-full cursor-pointer">
        Сбросить
      </Button>
      <div className="w-full text-center">
        <Link
          className="font-bold text-center transition-all relative after:absolute after:w-0 after:h-1 after:bg-foreground hover:after:w-full after:-bottom-2 after:left-1/2 hover:after:left-0 after:transition-all after:duration-500"
          href="/auth/sign-in"
        >
          Войти в аккаунт
        </Link>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
