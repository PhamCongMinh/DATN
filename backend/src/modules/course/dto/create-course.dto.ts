import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prop } from '@shared/swagger';
import mongoose from 'mongoose';

export class CreateCourseDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tags?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  course_image?: any;

  @ApiPropertyOptional()
  @IsOptional()
  start_time?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  end_time?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiPropertyOptional()
  @IsOptional()
  start_registration?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  end_registration?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  introduction?: string;

  @ApiPropertyOptional()
  @IsOptional()
  content_introduction?: string;

  @ApiPropertyOptional()
  @IsOptional()
  teacher_introduction?: string;
}
