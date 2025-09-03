import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import type { TaskStatus } from '../schemas/task.schema';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiPropertyOptional({ enum: ['todo', 'doing', 'done'] })
  @IsOptional()
  @IsEnum(['todo', 'doing', 'done'])
  status?: TaskStatus;
}
