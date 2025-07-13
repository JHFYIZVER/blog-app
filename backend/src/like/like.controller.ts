import { Authorization } from 'src/auth/decorators/auth.decorator';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { LikeService } from './like.service';
import { Request } from 'express';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Authorization()
  @Post()
  public async like(@Req() req: Request, @Body() dto: { postId: string }) {
    return this.likeService.like(req.session.userId!, dto.postId);
  }
}
