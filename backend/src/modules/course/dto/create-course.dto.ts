import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tags?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  img?: string;

  @ApiPropertyOptional()
  @IsOptional()
  start_time?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  end_time?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status?: string;
}
