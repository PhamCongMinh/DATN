import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class StartExamDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  exam_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  password?: string;
}
