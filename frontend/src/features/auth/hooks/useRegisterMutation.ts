import { useMutation } from "@tanstack/react-query";
import { toastMessageHandler } from "@/shared/lib/toast-message-handler";
import { authService } from "../services/auth.service";
import { RegisterFormData } from "../lib/schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useRegisterMutation(reset: any) {
  const router = useRouter();
  const { mutate: register, isPending: isLoadingRegister } = useMutation({
    mutationKey: ["register user"],
    mutationFn: ({
      values,
      recaptcha,
    }: {
      values: RegisterFormData;
      recaptcha: string;
    }) => authService.register(values, recaptcha),
    onSuccess(data: any) {
      toastMessageHandler(data);
      router.replace("/auth/sign-in");
      reset();
    },
    onError(error) {
      toastMessageHandler(error);
    },
  });

  return { register, isLoadingRegister };
}
