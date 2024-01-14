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

class QuestionChoiceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  is_correct?: boolean;
}

class QuestionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ type: [QuestionChoiceDto] })
  @IsOptional()
  @IsArray()
  @Type(() => QuestionChoiceDto)
  @ValidateNested({ each: true })
  question_choice?: QuestionChoiceDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  course_id?: string;
}

export class ImportQuestionsDto {
  @ApiPropertyOptional({ type: [QuestionDto] })
  @IsOptional()
  @IsArray()
  @Type(() => QuestionDto)
  @ValidateNested({ each: true })
  questions?: QuestionDto[];
}
