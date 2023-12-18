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

export class CreateQuestionPointDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  point?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  question_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  order?: number;
}

export class CreateExamDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  exam_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  exam_time?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  point_ladder?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  pass_point?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  evaluation_criteria?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  retry_times_number?: number;

  @ApiPropertyOptional()
  @IsOptional()
  start_time?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  end_time?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiPropertyOptional({ type: [CreateQuestionPointDto] })
  @IsArray()
  @Type(() => CreateQuestionPointDto)
  @ValidateNested({ each: true })
  question_point?: CreateQuestionPointDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  course_id?: string;
}
