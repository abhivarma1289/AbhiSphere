import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import type { TaskPriority } from '../schemas/task.schema';

export class CreateTaskDto {
  @ApiProperty({ example: 'Buy groceries' })
  @IsString()
  @MinLength(1)
  @MaxLength(160)
  title: string;

  @ApiPropertyOptional({ example: 'Milk, eggs, bread' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @ApiPropertyOptional({ example: '2025-09-05T18:30:00.000Z' })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiPropertyOptional({ enum: ['low', 'medium', 'high'], default: 'medium' })
  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  priority?: TaskPriority;
}
