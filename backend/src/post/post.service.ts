import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { Prisma } from '@prisma/client';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class PostService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findById(id: string) {
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: { like: true },
        },
        tag: true,
      },
    });

    if (!post) {
      throw new NotFoundException(
        'Пост не найден, проверьте правильность данных',
      );
    }

    return post;
  }

  public async getAll(
    page: number = 1,
    limit: number = 10,
    tagName?: string,
    sortBy: 'newest' | 'popular' = 'newest',
  ) {
    const skip = (page - 1) * limit;

    const where: Prisma.PostWhereInput = {};

    if (tagName) {
      where.tag = {
        some: {
          name: {
            equals: tagName,
            mode: 'insensitive',
          },
        },
      };
    }

    const orderBy: Prisma.PostOrderByWithRelationInput =
      sortBy === 'popular'
        ? { like: { _count: 'desc' } }
        : { createdAt: 'desc' };

    const [posts, total] = await Promise.all([
      this.prismaService.post.findMany({
        skip,
        take: limit,
        where,
        orderBy,
        include: {
          _count: {
            select: { like: true },
          },
          tag: true,
        },
      }),
      this.prismaService.post.count({ where }),
    ]);

    return {
      data: posts,
      meta: {
        total,
        page,
        limit,
        hasMore: skip + limit < total,
      },
    };
  }

  public async create(
    userId: string,
    title: string,
    description: string,
    tags: string[] = [],
    image?: string,
  ) {
    const post = await this.prismaService.post.create({
      data: {
        userId,
        title,
        description,
        image,
        tag: {
          create: tags.map((name) => ({ name })),
        },
      },
      include: {
        tag: true,
      },
    });

    return post;
  }

  public async update(userId: string, postId: string, dto: UpdatePostDto) {
    const post = await this.findById(postId);
    if (post.userId !== userId) {
      throw new ForbiddenException('Вы не можете изменить этот пост');
    }
    const updateData: Prisma.PostUpdateInput = {
      title: dto.title,
      description: dto.description,
    };
    if (dto.image) {
      updateData.image = dto.image;
    }
    if (dto.tags && dto.tags.length > 0) {
      await this.prismaService.tag.deleteMany({
        where: {
          postId: post.id,
        },
      });
      updateData.tag = {
        create: dto.tags.map((name) => ({ name })),
      };
    }
    const updatedPost = await this.prismaService.post.update({
      where: {
        id: post.id,
      },
      data: updateData,
      include: {
        tag: true,
      },
    });

    return updatedPost;
  }

  public async delete(postId: string, userId: string) {
    const post = await this.findById(postId);

    if (post.userId !== userId) {
      throw new ForbiddenException('Вы не можете удалить этот пост');
    }
    if (post.image) {
      try {
        await fs.unlink(path.join('uploads/posts', post.image));
      } catch (fsError) {
        console.error('Ошибка при удалении файла изображения:', fsError);
      }
    }
    return await this.prismaService.post.delete({
      where: { id: postId },
    });
  }
}
