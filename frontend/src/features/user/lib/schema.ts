import { z } from "zod";

export const settingsSchema = z.object({
  displayName: z.string().min(3, {
    message: "Введите имя",
  }),
  email: z.string().email({
    message: "Некорректная почта",
  }),
  isTwoFactorEnabled: z.boolean(),
});

export type TypeSettingsSchema = z.infer<typeof settingsSchema>;
