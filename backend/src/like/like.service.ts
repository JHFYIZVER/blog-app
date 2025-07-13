import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async like(userId: string, postId: string) {
    const [user, post] = await Promise.all([
      this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
      }),
      this.prismaService.post.findUnique({
        where: {
          id: postId,
        },
      }),
    ]);

    if (!user) {
      throw new NotFoundException(
        'Пользователь не найден, проверьте правильность данных',
      );
    }

    if (!post) {
      throw new NotFoundException(
        'Пост не найден, проверьте правильность данных',
      );
    }

    const deletedLike = await this.prismaService.like.deleteMany({
      where: { userId, postId },
    });

    if (deletedLike.count > 0) {
      return { message: 'Лайк удалён' };
    }

    await this.prismaService.like.create({
      data: { userId, postId },
    });

    return { message: 'Лайк поставлен' };
  }
}
