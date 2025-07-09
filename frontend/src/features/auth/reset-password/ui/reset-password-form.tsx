"use client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useState } from "react";
import Link from "next/link";
import { resetPasswordSchema, TypeResetPasswordSchema } from "../../lib/schema";
import { useResetPasswordMutation } from "../../hooks/useResetPasswordMutation";
import ReCAPTCHA from "react-google-recaptcha";
import { useTheme } from "next-themes";
import { toast } from "react-toastify";

const initialFormState: TypeResetPasswordSchema = {
  email: "",
};

const ResetPasswordForm = () => {
  const [userFormData, setUserFormData] = useState<TypeResetPasswordSchema>({
    email: "",
  });
  const { theme } = useTheme();
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const [showErrors, setShowErrors] = useState<boolean>(false);

  const formData: TypeResetPasswordSchema = {
    ...initialFormState,
    ...userFormData,
  };

  const validate = () => {
    const res = resetPasswordSchema.safeParse(formData);

    if (res.success) {
      return undefined;
    }

    return res.error.format();
  };

  const { reset, isLoadingReset } = useResetPasswordMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const errors = validate();
      if (errors) {
        setShowErrors(true);
        return;
      }
      if (!recaptchaValue) {
        toast.info("Завершите recaptcha");
        return;
      }
      const validatedData = resetPasswordSchema.parse(formData);
      reset({ values: validatedData, recaptcha: recaptchaValue });
    } catch (error) {}
  };

  const errors = showErrors ? validate() : undefined;
  return (
    <form
      className="max-w-lg w-full mx-auto rounded-lg bg-accent p-5 space-y-4 lg:space-y-6"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center font-bold text-[clamp(22px,2vw,32px)]">
        Сброс пароля
      </h1>
      <p className="text-accent-foreground/80 text-[clamp(12px,2vw,16px)]">
        Чтобы сбросить пароль введите свой email
      </p>
      <label className="my-3 flex flex-col">
        <span
          className={`text-xs md:text-sm lg:text-base mb-2 ${
            errors?.email ? "text-red-500" : ""
          }`}
        >
          Email
        </span>
        <Input
          value={formData.email}
          onChange={(e) =>
            setUserFormData((l) => ({ ...l, email: e.target.value }))
          }
          disabled={isLoadingReset}
          aria-label="email input"
          type="email"
        />
        <div className="text-red-500 my-1">
          {errors?.email?._errors.join(", ")}
        </div>
      </label>
      <div className="flex justify-center">
        <ReCAPTCHA
          sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY as string}
          onChange={setRecaptchaValue}
          theme={theme === "light" ? "light" : "dark"}
        />
      </div>
      <Button
        disabled={isLoadingReset}
        aria-label="login button"
        className="w-full cursor-pointer"
      >
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
