import { ImageProcessingService } from './image-processing/image-processing.service';
import { UserService } from 'src/user/user.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [PostController],
  providers: [PostService, UserService, ImageProcessingService],
})
export class PostModule {}
