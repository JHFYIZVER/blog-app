import { Module } from '@nestjs/common';
import { ImageProcessingService } from './image-processing.service';

@Module({
  providers: [ImageProcessingService],
})
export class ImageProcessingModule {}
