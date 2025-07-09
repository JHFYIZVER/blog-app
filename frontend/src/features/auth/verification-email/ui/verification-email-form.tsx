"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useVerificationMutation } from "../../hooks/useVerificationMutation";
import { Card, CardAction, CardHeader, CardTitle } from "@/shared/ui/card";
import { Loader2 } from "lucide-react";

const VerificationEmailForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { verification } = useVerificationMutation();

  useEffect(() => {
    verification(token);
  }, [token]);

  return (
    <Card className="max-w-xl w-full space-y-4">
      <CardHeader>
        <CardTitle>
          <h1 className="text-center font-bold text-[clamp(22px,2vw,32px)]">
            Подтверждение почты
          </h1>
        </CardTitle>
      </CardHeader>
      <CardAction className="flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </CardAction>
    </Card>
  );
};

export default VerificationEmailForm;
