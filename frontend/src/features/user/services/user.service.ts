import { api } from "@/shared/api";
import { TypeSettingsSchema } from "../lib/schema";
import { IUser } from "@/features/auth/lib/types";

class UserService {
  public async findProfile() {
    const response = await api.get<IUser>("users/profile");

    return response;
  }

  public async updateProfile(body: TypeSettingsSchema) {
    const response = await api.patch<IUser>("users/profile", body);

    return response;
  }
}

const userService = new UserService();

export default userService