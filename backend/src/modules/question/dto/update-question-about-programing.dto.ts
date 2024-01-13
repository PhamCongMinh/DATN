import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { EQuestionDifficultyLevel } from '@constants/questions.constant';

export class UpdateQuestionAboutProgramingDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  test_cases?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  points?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  difficulty_level: EQuestionDifficultyLevel;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  example_input?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  example_output?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  time_limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  memory_limit?: number;
}
