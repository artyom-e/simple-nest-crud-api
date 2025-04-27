import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskListDto } from './create-task-list.dto';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateTaskListDto extends PartialType(CreateTaskListDto) {
  @Length(3, 255)
  @IsString()
  title: string;

  @Length(3, 2048)
  @IsString()
  @IsOptional()
  description?: string;
}
