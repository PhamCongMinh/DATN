import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  EQuestionDifficultyLevel,
  EQuestionStatus,
  EQuestionType,
} from '@constants/questions.constant';
import { Type } from 'class-transformer';

export class GetQuizDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  difficulty_level?: EQuestionDifficultyLevel;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status?: EQuestionStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  type?: EQuestionType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  course_id?: string;
}
