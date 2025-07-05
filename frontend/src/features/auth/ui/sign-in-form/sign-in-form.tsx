"use client";
import { useState } from "react";
import { loginSchema, type LoginFormData } from "../../lib/schema";
import { validate } from "@/shared/lib";
import { Input } from "@/shared/ui/input";
import { Separator } from "@/shared/ui/separator";
import Link from "next/link";
import { Button } from "@/shared/ui/button";

const initialFormState: LoginFormData = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [userFormData, setUserFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [showErorrs, setShowErrors] = useState<boolean>(false);

  const formData: LoginFormData = {
    ...initialFormState,
    ...userFormData,
  };

  const humdleSumbit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const errors = validate(formData, loginSchema);
      if (errors) {
        setShowErrors(true);
        return;
      }
      const validatedData = loginSchema.parse(formData);
    } catch (error) {}
  };
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
      <label className="my-3 flex flex-col">
        <span className="text-xs md:text-sm lg:text-base mb-2">Email </span>
        <Input aria-label="email input" type="email" />
      </label>
      <label className="my-3 flex flex-col">
        <div className="text-xs flex items-center justify-between md:text-sm lg:text-base mb-2">
          Пароль
          <Button
            aria-label="forgot password button"
            variant={"link"}
            className="cursor-pointer p-0 m-0 ml-auto"
          >
            Забыли пароль?
          </Button>
        </div>
        <Input aria-label="password input" type="password" />
      </label>

      <p className="w-full relative text-center before:left-0 after:right-0 before:top-1/2 after:top-1/2 before:w-[calc(1/2*100%-1.5rem)] after:w-[calc(1/2*100%-1.5rem)] before:absolute after:absolute before:h-0.5 after:h-0.5 before:bg-foreground after:bg-foreground">
        или
      </p>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
        <Button
          aria-label="login button with google"
          variant={"outline"}
          className="w-full cursor-pointer"
        >
          Google
        </Button>
        <Button
          aria-label="login button with yandex"
          variant={"outline"}
          className="w-full cursor-pointer"
        >
          Yandex
        </Button>
      </div>
      <Button aria-label="login button" className="w-full cursor-pointer">
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
