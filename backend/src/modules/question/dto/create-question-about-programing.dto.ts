import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { EQuestionDifficultyLevel } from '@constants/questions.constant';
import { Testcase } from '@models/entities';
import { CreateTestcaseDto } from '@modules/testcase/dto/create-testcase.dto';
import { Type } from 'class-transformer';

export class CreateQuestionAboutProgramingDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional({ type: [CreateTestcaseDto] })
  @IsArray()
  @Type(() => CreateTestcaseDto)
  @ValidateNested({ each: true })
  test_cases?: CreateTestcaseDto[];

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

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  course_id?: string;
}
