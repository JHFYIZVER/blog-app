import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  public constructor(private readonly userService: UserService) {}
  public async register(dto: RegisterDto) {
    const isExists = await this.userService.findByEmail(dto.email);

    if (isExists) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }
  }

  public async login() {}

  public async logout() {}

  private async saveSession() {}
}
