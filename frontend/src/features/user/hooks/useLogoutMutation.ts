import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { toastMessageHandler } from "@/shared/lib/toast-message-handler";
import { authService } from "@/features/auth/services/auth.service";

export function useLogoutMutation() {
  const router = useRouter();

  const { mutate: logout, isPending: isLoadingLogout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authService.logout(),
    onSuccess() {
      toast.success("Вы успешно вышли из системы");
      router.push("/auth/sign-in");
    },
    onError(error) {
      toastMessageHandler(error);
    },
  });

  return { logout, isLoadingLogout };
}
