"use client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useState } from "react";
import { useNewPasswordMutation } from "../../hooks/useNewPasswordMutation";
import { newPasswordSchema, TypeNewPasswordSchema } from "../../lib/schema";
import ReCAPTCHA from "react-google-recaptcha";
import { useTheme } from "next-themes";
import { toast } from "react-toastify";
import Link from "next/link";

const initialFormState: TypeNewPasswordSchema = {
  password: "",
};

const NewPasswordForm = () => {
  const [userFormData, setUserFormData] = useState<TypeNewPasswordSchema>({
    password: "",
  });
  const { theme } = useTheme();
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const [showErrors, setShowErrors] = useState<boolean>(false);

  const formData: TypeNewPasswordSchema = {
    ...initialFormState,
    ...userFormData,
  };

  const validate = () => {
    const res = newPasswordSchema.safeParse(formData);

    if (res.success) {
      return undefined;
    }

    return res.error.format();
  };

  const { newPassword, isLoadingNew } = useNewPasswordMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const errors = validate();
      if (errors) {
        setShowErrors(true);
        return;
      }

      const validatedData = newPasswordSchema.parse(formData);
      if (!recaptchaValue) {
        toast.info("Завершите recaptcha");
        return;
      }

      newPassword({ values: validatedData, recaptcha: recaptchaValue });
    } catch (error) {}
  };

  const errors = showErrors ? validate() : undefined;
  return (
    <form
      className="max-w-lg w-full mx-auto rounded-lg bg-accent p-5 space-y-4 lg:space-y-6"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center font-bold text-[clamp(22px,2vw,32px)]">
        Новый пароль
      </h1>
      <p className="text-accent-foreground/80 text-[clamp(12px,2vw,16px)]">
        Придумайте новый пароль для вашего аккаунта.
      </p>
      <label className="my-3 flex flex-col">
        <span
          className={`text-xs md:text-sm lg:text-base mb-2 ${
            errors?.password ? "text-red-500" : ""
          }`}
        >
          Пароль
        </span>
        <Input
          value={formData.password}
          onChange={(e) =>
            setUserFormData((l) => ({ ...l, password: e.target.value }))
          }
          disabled={isLoadingNew}
          aria-label="email input"
          type="password"
        />
        <div className="text-red-500 my-1">
          {errors?.password?._errors.join(", ")}
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
        disabled={isLoadingNew}
        aria-label="login button"
        className="w-full cursor-pointer"
      >
        Восстановить пароль
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

export default NewPasswordForm;
