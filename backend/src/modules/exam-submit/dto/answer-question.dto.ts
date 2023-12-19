import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Prop } from '@shared/swagger';
import mongoose from 'mongoose';
import { ExamSubmit } from '@models/entities/ExamSubmit.entity';

export class AnswerQuestionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  exam_submit: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  question_point: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  question_choice?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  answer?: string;
}
