import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

import { toast } from "sonner";
import { toastMessageHandler } from "@/shared/lib/toast-message-handler";
import { authService } from "../services/auth.service";
import { LoginFormData } from "../lib/schema";

export function useLoginMutation(
  setIsShowFactor: Dispatch<SetStateAction<boolean>>
) {
  const router = useRouter();

  const { mutate: login, isPending: isLoadingLogin } = useMutation({
    mutationKey: ["login user"],
    mutationFn: ({
      values,
      recaptcha,
    }: {
      values: LoginFormData;
      recaptcha: string;
    }) => authService.login(values, recaptcha),
    onSuccess(data: any) {
      if (data.message) {
        toastMessageHandler(data);
        setIsShowFactor(true);
      } else {
        toast.success("Успешная авторизация");
        router.push("/dashboard/settings");
      }
    },
    onError(error) {
      toastMessageHandler(error);
    },
  });

  return { login, isLoadingLogin };
}
