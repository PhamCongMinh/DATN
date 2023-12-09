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

export class CreateQuestionChoiceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  point?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  is_correct?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  order?: number;
}

export class CreateQuizDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  points?: number;

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
  comment?: string;

  @ApiPropertyOptional({ type: [CreateQuestionChoiceDto] })
  @IsArray()
  @Type(() => CreateQuestionChoiceDto)
  @ValidateNested({ each: true })
  question_choice?: CreateQuestionChoiceDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  course_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  custom_question_id?: string;
}
