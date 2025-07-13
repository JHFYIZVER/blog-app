import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [LikeController],
  providers: [LikeService, UserService],
})
export class LikeModule {}
