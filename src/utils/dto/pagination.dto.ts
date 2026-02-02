import { IsOptional, IsInt, Min, IsString, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum FilterOperator {
  EQ = 'eq',
  LIKE = 'like',
  GT = 'gt',
  LT = 'lt',
  IN = 'in',
  GTE = 'gte',
  LTE = 'lte',
  IS_NULL = 'is_null',
  IS_NOT_NULL = 'is_not_null',
}

export class FilterRule {
  @IsString()
  field: string;

  @IsEnum(FilterOperator)
  operator: FilterOperator;

  @IsOptional()
  value: any;
}

export class QueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsString()
  sortField?: string;

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilterRule)
  filters?: FilterRule[];
}
