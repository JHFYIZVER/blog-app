import { api } from "@/shared/api";
import { Button } from "@/shared/ui/button";
import React from "react";

const LogOutBtn = () => {
  const handleClick = () => {
    const response = api.post("auth/logout");
  };

  return (
    <Button
      onClick={handleClick}
      className="cursor-pointer"
      variant={"destructive"}
    >
      Выйти
    </Button>
  );
};

export default LogOutBtn;
