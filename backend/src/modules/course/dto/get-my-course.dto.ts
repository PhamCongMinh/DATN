import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prop } from '@shared/swagger';
import mongoose from 'mongoose';

export class GetMyCourseDto {
  @ApiPropertyOptional()
  @IsOptional()
  is_contest?: boolean;
}
