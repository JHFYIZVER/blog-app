import { z } from "zod";

export const resetPasswordSchema = z.object({
  email: z.string().email("Некорректный email"),
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
