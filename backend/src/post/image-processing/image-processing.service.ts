import { Injectable, BadRequestException } from '@nestjs/common';
import * as sharp from 'sharp';
import { writeFile } from 'fs/promises';
import { join } from 'path';

import { readFile } from 'fs/promises';

@Injectable()
export class ImageProcessingService {
  async processAndSaveImage(
    file: Express.Multer.File,
    filename: string,
    destination: string,
  ): Promise<string> {
    if (!file) {
      throw new BadRequestException('Файл изображения отсутствует');
    }

    try {
      const fileBuffer = await readFile(join(destination, filename));

      const webpBuffer = await sharp(fileBuffer)
        .webp({ quality: 80 })
        .toBuffer();

      const fullPath = join(destination, filename);
      await writeFile(fullPath, webpBuffer);

      return filename;
    } catch (error) {
      throw new BadRequestException('Не удалось обработать изображение');
    }
  }
}
