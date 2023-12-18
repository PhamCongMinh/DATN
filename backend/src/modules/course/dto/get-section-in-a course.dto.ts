import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetSectionInACourseDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  course_id: string;
}
