"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import React from "react";
import { useLogoutMutation } from "../../hooks/useLogoutMutation";
import { IUser } from "@/features/auth/lib/types";

interface UserButtonProps {
  user: IUser;
}

const LogOutBtn = ({ user }: UserButtonProps) => {
  const { logout, isLoadingLogout } = useLogoutMutation();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.picture} />
          <AvatarFallback>{user.displayName.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem disabled={isLoadingLogout} onClick={() => logout()}>
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LogOutBtn;
