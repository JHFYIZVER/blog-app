import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
  code: z.optional(z.string()),
});

export const registerSchema = loginSchema
  .extend({
    displayName: z.string().min(3, "Имя пользователя слишком короткое"),
    repeatPassword: z
      .string()
      .min(6, "Пароль подтверждения должен быть не менее 6 символов"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Пароли не совпадают",
    path: ["repeatPassword"],
  });

export const resetPasswordSchema = z.object({
  email: z.string().email({
    message: "Некорректная почта",
  }),
});

export const newPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Пароль минимум 6 символов",
  }),
});

export type TypeNewPasswordSchema = z.infer<typeof newPasswordSchema>;
export type TypeResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
