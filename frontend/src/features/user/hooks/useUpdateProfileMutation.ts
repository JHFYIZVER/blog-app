import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { toastMessageHandler } from "@/shared/lib/toast-message-handler";
import { TypeSettingsSchema } from "../lib/schema";
import userService from "../services/user.service";

export function useUpdateProfileMutation() {
  const { mutate: update, isPending: isLoadingUpdate } = useMutation({
    mutationKey: ["update profile"],
    mutationFn: (data: TypeSettingsSchema) => userService.updateProfile(data),
    onSuccess() {
      toast.success("Профиль успешно обновлён");
    },
    onError(error) {
      toastMessageHandler(error);
    },
  });

  return { update, isLoadingUpdate };
}
