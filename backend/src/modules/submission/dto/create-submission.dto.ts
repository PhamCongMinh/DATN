import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ESubmissionLanguage } from '@constants/submission.constant';

export class CreateSubmissionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  question_id: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  source: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  language: ESubmissionLanguage;
}
