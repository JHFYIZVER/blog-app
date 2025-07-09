"use client";
import { loginSchema, type LoginFormData } from "../../lib/schema";
import { useLoginMutation } from "../../hooks/useLoginMutation";
import SocialAuth from "../../social/ui/social-auth";
import { Separator } from "@/shared/ui/separator";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useTheme } from "next-themes";
import { toast } from "react-toastify";
import { useState } from "react";
import Link from "next/link";

const initialFormState: LoginFormData = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [userFormData, setUserFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [isShowTwoFactor, setIsShowFactor] = useState<boolean>(false);
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const { theme } = useTheme();
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const formData: LoginFormData = {
    ...initialFormState,
    ...userFormData,
  };

  const validate = () => {
    const res = loginSchema.safeParse(formData);

    if (res.success) {
      return undefined;
    }

    return res.error.format();
  };

  const { login, isLoadingLogin } = useLoginMutation(setIsShowFactor);

  const humdleSumbit = (e: React.FormEvent) => {
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
      const validatedData = loginSchema.parse(formData);
      login({ values: validatedData, recaptcha: recaptchaValue });
    } catch (error) {}
  };

  const errors = showErrors ? validate() : undefined;
  return (
    <form
      className="max-w-lg w-full mx-auto rounded-lg bg-accent p-5 space-y-4 lg:space-y-6"
      onSubmit={humdleSumbit}
    >
      <h1 className="text-center font-bold text-[clamp(22px,2vw,32px)]">
        Авторизация
      </h1>
      <p className="text-accent-foreground/80 text-[clamp(12px,2vw,16px)]">
        Чтобы войти введи ваш email и пароль
      </p>
      {isShowTwoFactor && (
        <label className="my-3 flex flex-col">
          <span
            className={`text-xs md:text-sm lg:text-base mb-2 ${
              errors?.code ? "text-red-500" : ""
            }`}
          >
            Код
          </span>
          <Input
            value={formData.code}
            onChange={(e) =>
              setUserFormData((l) => ({ ...l, code: e.target.value }))
            }
            disabled={isLoadingLogin}
            aria-label="code input"
            type="text"
          />
          <div className="text-red-500 my-1">
            {errors?.code?._errors.join(", ")}
          </div>
        </label>
      )}
      {!isShowTwoFactor && (
        <>
          {" "}
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
              disabled={isLoadingLogin}
              aria-label="email input"
              type="email"
            />
            <div className="text-red-500 my-1">
              {errors?.email?._errors.join(", ")}
            </div>
          </label>
          <label className="my-3 flex flex-col">
            <div className="text-xs flex items-center justify-between md:text-sm lg:text-base mb-2">
              <span
                className={`text-xs md:text-sm lg:text-base ${
                  errors?.password ? "text-red-500" : ""
                }`}
              >
                Пароль
              </span>
              <Link
                href="/auth/reset-password"
                className="cursor-pointer p-0 m-0 ml-auto hover:underline"
              >
                Забыли пароль?
              </Link>
            </div>
            <Input
              value={formData.password}
              onChange={(e) =>
                setUserFormData((l) => ({ ...l, password: e.target.value }))
              }
              disabled={isLoadingLogin}
              aria-label="password input"
              type="password"
            />
            <div className="text-red-500 my-1">
              {errors?.password?._errors.join(", ")}
            </div>
          </label>
        </>
      )}

      <SocialAuth isLoadingAuth={isLoadingLogin} />
      <div className="flex w-full justify-center">
        <ReCAPTCHA
          sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY as string}
          onChange={setRecaptchaValue}
          theme={theme === "light" ? "light" : "dark"}
        />
      </div>
      <Button
        disabled={isLoadingLogin}
        aria-label="login button"
        className="w-full cursor-pointer"
      >
        Войти
      </Button>
      <Separator />
      <div className="text-center flex flex-wrap items-center gap-2 justify-center">
        Нет аккаунта?
        <Link
          className="font-bold transition-all relative after:absolute after:w-0 after:h-1 after:bg-foreground hover:after:w-full after:-bottom-2 after:left-1/2 hover:after:left-0 after:transition-all after:duration-500"
          href="/auth/sign-up"
        >
          Зарегестрироваться
        </Link>
      </div>
    </form>
  );
};

export default SignInForm;
