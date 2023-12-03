import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateConferenceDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  conference_name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  area: string;

  @ApiProperty()
  @IsOptional()
  start_time: string;

  @ApiProperty()
  @IsOptional()
  end_time: string;
}
