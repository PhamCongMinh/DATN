import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  permanentAddress?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  temporaryAddress?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  numberPhone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  citizenIdNumber?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  citizenIdImage: Express.Multer.File;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  portraitImage: Express.Multer.File;

  @ApiPropertyOptional({ type: 'string', format: 'binary', required: true })
  @IsOptional()
  proofImage: Express.Multer.File;
}
