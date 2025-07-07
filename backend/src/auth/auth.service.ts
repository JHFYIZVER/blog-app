import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthMethod, User } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}
  public async register(req: Request, dto: RegisterDto) {
    const isExists = await this.userService.findByEmail(dto.email);

    if (isExists) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const newUser = await this.userService.create(
      dto.email,
      dto.displayName,
      dto.password,
      '',
      AuthMethod.CREDENTIALS,
      false,
    );

    return this.saveSession(req, newUser);
  }

  public async login(req: Request, dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user || !user.password) {
      throw new NotFoundException(
        'Пользователь не найден, проверьте введенные данные',
      );
    }

    const isValidPassword = await verify(user.password, dto.password);

    if (!isValidPassword) {
      throw new UnauthorizedException(
        'Неверный пароль, проверьте правильность введенных данных',
      );
    }

    return this.saveSession(req, user);
  }

  public async logout(req: Request, res: Response): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          return reject(
            new InternalServerErrorException(
              'Не удалось завершить сессию. Возможно, возникла проблема с сервером или сессия уже была завершена',
            ),
          );
        }

        res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'));

        resolve();
      });
    });
  }

  public async saveSession(req: Request, user: User) {
    return new Promise((resolve, reject) => {
      req.session.userId = user.id;

      req.session.save((err) => {
        if (err) {
          return reject(
            new InternalServerErrorException(
              'Не удалось сохранить сессию. Проверьте, правильно ли настроены параметры сессии.',
            ),
          );
        }

        resolve({
          user,
        });
      });
    });
  }
}
