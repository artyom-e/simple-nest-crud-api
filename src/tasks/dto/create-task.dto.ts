import { IsOptional, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @Length(3, 255)
  @IsString()
  title: string;

  @Length(3, 2048)
  @IsString()
  @IsOptional()
  description?: string;
}
