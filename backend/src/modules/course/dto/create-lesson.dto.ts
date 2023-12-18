import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UploadedAsset } from '@models/entities/UploadedAsset.entity';
import { ELessonType } from '@models/entities/Lesson.entity';

export class CreateLessonDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  course_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  section_id: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  documents?: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  embed_file?: string;

  @ApiPropertyOptional()
  @IsOptional()
  exam?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  type?: ELessonType;
}
