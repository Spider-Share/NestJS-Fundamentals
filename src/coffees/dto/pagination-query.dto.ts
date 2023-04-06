import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

/* PaginationQueryDto - FINAL CODE */
export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  // @Type(() => Number)  enableImplicitConversion: true - com isso a declaração explicita passa a funcionar   limit: number;
  limit: number;

  @IsOptional()
  @IsPositive()
  // @Type(() => Number)   enableImplicitConversion: true - com isso a declaração explicita passa a funcionar   offset: number;
  offset: number;
}