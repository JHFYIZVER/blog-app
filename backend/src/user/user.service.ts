import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthMethod } from '@prisma/client';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        accounts: true,
      },
    });

    if (!user) {
      throw new NotFoundException(
        'Пользователь не найден, проверьте правильность данных',
      );
    }

    return user;
  }
  public async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      include: {
        accounts: true,
      },
    });

    return user;
  }

  public async create(
    email: string,
    displayName: string,
    password: string,
    picture: string,
    method: AuthMethod,
    isVerified: boolean,
  ) {
    const user = await this.prismaService.user.create({
      data: {
        email,
        displayName,
        password: password ? await hash(password) : '',
        picture,
        method,
        isVerified,
      },
      include: {
        accounts: true,
      },
    });

    return user;
  }

  public async update(userId: string, dto: UpdateUserDto) {
    const user = await this.findById(userId);

    const updatedUser = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: dto.email,
        displayName: dto.name,
        isTwoFactorEnabled: dto.isTwoFactorEnabled,
      },
    });

    return updatedUser;
  }
}
