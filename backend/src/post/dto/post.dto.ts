import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class PostDto {
  @IsString({ message: 'Заголовок должно быть строкой.' })
  @IsNotEmpty({ message: 'Заголовок обязательен для заполнения.' })
  title: string;

  @IsString({ message: 'Описание должено быть строкой.' })
  @IsNotEmpty({ message: 'Описание обязателено для заполнения.' })
  description: string;

  @IsOptional()
  @IsString({ message: 'Путь к картинке должно быть строкой.' })
  image?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
