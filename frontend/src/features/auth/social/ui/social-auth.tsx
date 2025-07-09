import { Button } from "@/shared/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { authService } from "../../services/auth.service";

const SocialAuth = ({ isLoadingAuth }: any) => {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationKey: ["oauth by provider"],
    mutationFn: async (provider: "google" | "yandex") =>
      await authService.oauthByProvider(provider),
  });

  const handleClick = async (provider: "google" | "yandex") => {
    const response = await mutateAsync(provider);

    if (response) {
      router.push(response.url);
    }
  };
  return (
    <>
      <p className="w-full relative text-center before:left-0 after:right-0 before:top-1/2 after:top-1/2 before:w-[calc(1/2*100%-1.5rem)] after:w-[calc(1/2*100%-1.5rem)] before:absolute after:absolute before:h-0.5 after:h-0.5 before:bg-foreground after:bg-foreground">
        или
      </p>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
        <Button
          onClick={() => handleClick("google")}
          disabled={isLoadingAuth}
          aria-label="login button with google"
          variant={"outline"}
          className="w-full cursor-pointer"
        >
          Google
        </Button>
        <Button
          onClick={() => handleClick("yandex")}
          disabled={isLoadingAuth}
          aria-label="login button with yandex"
          variant={"outline"}
          className="w-full cursor-pointer"
        >
          Yandex
        </Button>
      </div>
    </>
  );
};

export default SocialAuth;
