"use client";
import { registerSchema, type RegisterFormData } from "../../lib/schema";
import { Separator } from "@/shared/ui/separator";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useTheme } from "next-themes";
import { useState } from "react";
import Link from "next/link";
import { useRegisterMutation } from "../../hooks/useRegisterMutation";
import { toast } from "sonner";
import SocialAuth from "../../social/ui/social-auth";

const initialFormState: RegisterFormData = {
  displayName: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const SignUpForm = () => {
  const [userFormData, setUserFormData] = useState<RegisterFormData>({
    displayName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const { theme } = useTheme();
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const formData: RegisterFormData = {
    ...initialFormState,
    ...userFormData,
  };

  const validate = () => {
    const res = registerSchema.safeParse(formData);

    if (res.success) {
      return undefined;
    }

    return res.error.format();
  };

  const reset = () =>
    setUserFormData({
      displayName: "",
      password: "",
      email: "",
      repeatPassword: "",
    });

  const { register, isLoadingRegister } = useRegisterMutation(reset);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const errors = validate();
      if (errors) {
        setShowErrors(true);
        return;
      }
      const validatedData = registerSchema.parse(formData);
      if (!recaptchaValue) {
        toast.info("Завершите recaptcha");
        return;
      }
      register({ values: validatedData, recaptcha: recaptchaValue });
    } catch (error) {}
  };

  const errors = showErrors ? validate() : undefined;
  return (
    <form
      className="max-w-lg w-full mx-auto rounded-lg bg-accent p-5 space-y-4 lg:space-y-6"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center font-bold text-[clamp(22px,2vw,32px)]">
        Регистрация
      </h1>
      <p className="text-accent-foreground/80 text-[clamp(12px,2vw,16px)]">
        Чтобы зарегестрироваться заполните все данные
      </p>

      <label className="my-3 flex flex-col">
        <span
          className={`text-xs md:text-sm lg:text-base mb-2 ${
            errors?.displayName ? "text-red-500" : ""
          }`}
        >
          Имя
        </span>
        <Input
          value={formData.displayName}
          onChange={(e) =>
            setUserFormData((l) => ({ ...l, displayName: e.target.value }))
          }
          disabled={isLoadingRegister}
          aria-label="username input"
          type="text"
        />
        <div className="text-red-500 mt-1">
          {errors?.displayName?._errors.join(", ")}
        </div>
      </label>
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
          disabled={isLoadingRegister}
          aria-label="email input"
          type="email"
        />
        <div className="text-red-500 my-1">
          {errors?.email?._errors.join(", ")}
        </div>
      </label>
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
          disabled={isLoadingRegister}
          aria-label="password input"
          type="password"
        />
        <div className="text-red-500 my-1">
          {errors?.password?._errors.join(", ")}
        </div>
      </label>
      <label className="my-3 flex flex-col">
        <span
          className={`text-xs md:text-sm lg:text-base mb-2 ${
            errors?.repeatPassword ? "text-red-500" : ""
          }`}
        >
          Повторите пароль
        </span>
        <Input
          value={formData.repeatPassword}
          onChange={(e) =>
            setUserFormData((l) => ({ ...l, repeatPassword: e.target.value }))
          }
          disabled={isLoadingRegister}
          aria-label="repeat password input"
          type="password"
        />
        <div className="text-red-500 my-1">
          {errors?.repeatPassword?._errors.join(", ")}
        </div>
      </label>

      <SocialAuth isLoadingAuth={isLoadingRegister} />
      <div className="flex w-full justify-center">
        <ReCAPTCHA
          sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY as string}
          onChange={setRecaptchaValue}
          theme={theme === "light" ? "light" : "dark"}
        />
      </div>
      <Button
        disabled={isLoadingRegister}
        aria-label="login button"
        className="w-full cursor-pointer"
      >
        Зарегестрироваться
      </Button>
      <Separator />
      <div className="text-center flex flex-wrap items-center gap-2 justify-center">
        Уже аккаунта?
        <Link
          className="font-bold transition-all relative after:absolute after:w-0 after:h-1 after:bg-foreground hover:after:w-full after:-bottom-2 after:left-1/2 hover:after:left-0 after:transition-all after:duration-500"
          href="/auth/sign-in"
        >
          Войти
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
