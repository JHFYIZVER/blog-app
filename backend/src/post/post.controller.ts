import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';
import { Request } from 'express';
import { Authorization } from 'src/auth/decorators/auth.decorator';
import { multerOptions } from '../config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageProcessingService } from './image-processing/image-processing.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly imageProcessingService: ImageProcessingService,
  ) {}

  @Get()
  public async getPosts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('tag') tag?: string,
    @Query('sort') sort: 'newest' | 'popular' = 'newest',
  ) {
    return this.postService.getAll(page, limit, tag, sort);
  }

  @Authorization()
  @Post('create')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  public async create(
    @Req() req: Request,
    @Body() dto: PostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let webpFilename: string | undefined;

    if (file) {
      webpFilename = file.filename;
      await this.imageProcessingService.processAndSaveImage(
        file,
        webpFilename,
        './uploads/posts',
      );
    }
    return this.postService.create(
      req.session.userId!,
      dto.title,
      dto.description,
      dto.tags,
      file?.filename,
    );
  }

  @Authorization()
  @Patch('/:postId')
  public async update(
    @Req() req: Request,
    @Param('postId') postId: string,
    @Body() dto: PostDto,
  ) {
    return this.postService.update(req.session.userId!, postId, dto);
  }

  @Authorization()
  @Delete('/:postId')
  public async delete(@Req() req: Request, @Param('postId') postId: string) {
    return this.postService.delete(postId, req.session.userId!);
  }
}
