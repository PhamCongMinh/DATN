import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { RentalStatus, RentNewsType } from '@models/entities/RentalNews';
import { Type } from 'class-transformer';

export class CreateRentalNewsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status: RentalStatus = RentalStatus.AVAILABLE;

  @ApiProperty()
  @IsNumber()
  @Min(100000)
  pricePerMonth: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  area: number;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  district: string;

  @ApiProperty()
  @IsString()
  commune: string;

  @ApiProperty()
  @IsString()
  street: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  // @Min(1)
  houseNumber: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  specificAddress: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  imageUrl: string[];

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  image: Express.Multer.File;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDay: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDay: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  rentNewsType: RentNewsType;
}
