import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { EQuestionDifficultyLevel } from '@constants/questions.constant';
import { Prop } from '@shared/swagger';
import mongoose from 'mongoose';

export class CreateTestcaseDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  input: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  output: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  order: number;
}
