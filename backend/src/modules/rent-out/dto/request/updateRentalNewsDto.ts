import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { RentalStatus } from '@models/entities/RentalNews';

export class UpdateRentalNewsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status: RentalStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(100000)
  pricePerMonth: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(1)
  area: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  district: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  commune: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  street: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(1)
  houseNumber: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  specificAddress: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  imageUrl: string[];

  @ApiPropertyOptional({ type: 'string', format: 'binary', required: true })
  image: Express.Multer.File;
}
