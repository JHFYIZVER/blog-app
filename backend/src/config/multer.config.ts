import { diskStorage } from 'multer';
import * as sharp from 'sharp';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads/posts',
    filename: async (req, file, callback) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');

      callback(null, `${randomName}.webp`);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  },
};

export async function convertToWebp(
  file: Express.Multer.File,
): Promise<Buffer> {
  return sharp(file.buffer).webp({ quality: 80 }).toBuffer();
}
