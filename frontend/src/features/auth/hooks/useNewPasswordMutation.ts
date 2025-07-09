import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import { toastMessageHandler } from '@/shared/lib/toast-message-handler'

import { passwordRecoveryService } from "../services/password-recovery.service";
import { toast } from "react-toastify";
import { TypeNewPasswordSchema } from "../lib/schema";

export function useNewPasswordMutation() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const { mutate: newPassword, isPending: isLoadingNew } = useMutation({
    mutationKey: ["new password"],
    mutationFn: ({
      values,
      recaptcha,
    }: {
      values: TypeNewPasswordSchema;
      recaptcha: string;
    }) => passwordRecoveryService.new(values, token, recaptcha),
    onSuccess() {
      toast.success(
        "Пароль успешно изменён. Теперь вы можете войти в свой аккаунт."
      );
      router.push("/dashboard/settings");
    },
    onError(error) {
      toastMessageHandler(error);
    },
  });

  return { newPassword, isLoadingNew };
}
