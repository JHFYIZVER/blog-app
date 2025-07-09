"use client";
import { useProfile } from "@/shared/hook/useProfile";

import { Card, CardAction, CardHeader, CardTitle } from "@/shared/ui/card";
import { AvatarFallback } from "@radix-ui/react-avatar";
import React, { useState } from "react";
import { useUpdateProfileMutation } from "../hooks/useUpdateProfileMutation";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { settingsSchema, TypeSettingsSchema } from "../lib/schema";
import { Loader2 } from "lucide-react";
import { Switch } from "@/shared/ui/switch";
import LogOutBtn from "../logout/ui/logout-btn";

const initialFormState: TypeSettingsSchema = {
  email: "",
  displayName: "",
  isTwoFactorEnabled: false,
};

const SettingsForm = () => {
  const { user, isLoading } = useProfile();
  const { update, isLoadingUpdate } = useUpdateProfileMutation();
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [userFormData, setUserFormData] = useState<Partial<TypeSettingsSchema>>(
    {}
  );
  const formData: TypeSettingsSchema = {
    ...initialFormState,
    ...user,
    ...userFormData,
  };

  const validate = () => {
    const res = settingsSchema.safeParse(formData);

    if (res.success) {
      return undefined;
    }

    return res.error.format();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const errors = validate();
      if (errors) {
        setShowErrors(true);
        return;
      }

      const validatedData = settingsSchema.parse(formData);
      update(validatedData);
    } catch (error) {}
  };

  if (isLoading) return <Loader2 className="mx-auto animate-spin" />;
  const errors = showErrors ? validate() : undefined;

  if (!user) return null;
  return (
    <Card className="max-w-xl w-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>
          <h1 className="text-center font-bold text-[clamp(22px,2vw,32px)]">
            Настройки профиля
          </h1>
        </CardTitle>
        <LogOutBtn user={user} />
      </CardHeader>
      <CardAction className="w-full p-5">
        <form
          className="w-full mx-auto rounded-lg bg-accent p-5 space-y-4 lg:space-y-6"
          onSubmit={handleSubmit}
        >
          <label className="my-3 flex flex-col">
            <span
              className={`text-xs md:text-sm lg:text-base mb-2 ${
                errors?.displayName ? "text-red-500" : ""
              }`}
            >
              Имя
            </span>
            <Input
              value={formData.displayName}
              onChange={(e) =>
                setUserFormData((prev) => ({
                  ...prev,
                  displayName: e.target.value,
                }))
              }
              disabled={isLoadingUpdate}
              aria-label="displayName input"
              type="text"
            />
            <div className="text-red-500 my-1">
              {errors?.displayName?._errors.join(", ")}
            </div>
          </label>
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
                setUserFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              disabled={isLoadingUpdate}
              aria-label="email input"
              type="email"
            />
            <div className="text-red-500 my-1">
              {errors?.email?._errors.join(", ")}
            </div>
          </label>
          <label className="my-3 flex items-center justify-between">
            <span className="text-xs md:text-sm lg:text-base">
              Двухфакторная аутентификация
            </span>
            <Switch
              checked={formData.isTwoFactorEnabled}
              onCheckedChange={(checked) =>
                setUserFormData((prev) => ({
                  ...prev,
                  isTwoFactorEnabled: checked,
                }))
              }
              disabled={isLoadingUpdate}
            />
          </label>
          <div className="text-red-500 my-1">
            {errors?.isTwoFactorEnabled?._errors.join(", ")}
          </div>
          <Button
            disabled={isLoadingUpdate}
            aria-label="save button"
            className="w-full cursor-pointer"
            type="submit"
          >
            {isLoadingUpdate ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Сохранить"
            )}
          </Button>
        </form>
      </CardAction>
    </Card>
  );
};

export default SettingsForm;
