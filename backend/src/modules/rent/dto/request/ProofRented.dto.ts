import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ProofRentedDto {
  @ApiProperty()
  @IsString()
  rentalNewsId: string;

  @ApiProperty()
  @IsString()
  rentalStartDate: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary', required: true })
  @IsOptional()
  proofImage: Express.Multer.File;
}
