import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export enum ESortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum ESortBy {
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  ID = 'id',
}

export class PaginationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;
}

export class PaginationWithSortDto extends PaginationDto {
  @ApiPropertyOptional({ enum: Object.values(ESortBy) })
  @IsOptional()
  sort_by?: string;

  @ApiPropertyOptional({ enum: [ESortDirection.ASC, ESortDirection.DESC] })
  @IsEnum([ESortDirection.ASC, ESortDirection.DESC])
  @IsOptional()
  direction?: ESortDirection;
}
