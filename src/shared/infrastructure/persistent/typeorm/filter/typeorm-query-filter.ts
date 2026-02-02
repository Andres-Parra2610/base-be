import { FilterOperator, QueryDto } from '@/src/utils/dto/pagination.dto';
import { ObjectLiteral, SelectQueryBuilder, Brackets } from 'typeorm';

export class TypeOrmQueryHelper {
  static applyRequest<T extends ObjectLiteral>(
    queryBuilder: SelectQueryBuilder<T>,
    queryDto: QueryDto,
    allowedFilterFields: string[] = [],
    allowedSortFields: string[] = [],
  ): SelectQueryBuilder<T> {
    const mainAlias = queryBuilder.alias;

    // 1. FILTROS
    if (queryDto.filters) {
      queryDto.filters.forEach((filter, index) => {
        if (!allowedFilterFields.includes(filter.field)) return;

        const paramName = `param_${index}`;

        // Alias inteligente
        const fieldPath = filter.field.includes('.')
          ? filter.field
          : `${mainAlias}.${filter.field}`;

        switch (filter.operator) {
          case FilterOperator.EQ:
            queryBuilder.andWhere(`${fieldPath} = :${paramName}`, { [paramName]: filter.value });
            break;

          case FilterOperator.LIKE:
            queryBuilder.andWhere(`${fieldPath} ILIKE :${paramName}`, {
              [paramName]: `%${filter.value}%`,
            });
            break;

          case FilterOperator.GT:
            queryBuilder.andWhere(`${fieldPath} > :${paramName}`, { [paramName]: filter.value });
            break;

          case FilterOperator.LT:
            queryBuilder.andWhere(`${fieldPath} < :${paramName}`, { [paramName]: filter.value });
            break;

          case FilterOperator.GTE:
            queryBuilder.andWhere(`${fieldPath} >= :${paramName}`, { [paramName]: filter.value });
            break;

          case FilterOperator.LTE:
            queryBuilder.andWhere(`${fieldPath} <= :${paramName}`, { [paramName]: filter.value });
            break;

          case FilterOperator.IN:
            if (Array.isArray(filter.value) && filter.value.length > 0) {
              queryBuilder.andWhere(`${fieldPath} IN (:...${paramName})`, {
                [paramName]: filter.value,
              });
            }
            break;

          case FilterOperator.IS_NULL:
            queryBuilder.andWhere(`${fieldPath} IS NULL`);
            break;

          case FilterOperator.IS_NOT_NULL:
            queryBuilder.andWhere(`${fieldPath} IS NOT NULL`);
            break;
        }
      });
    }

    // 2. ORDENAMIENTO
    if (queryDto.sortField && allowedSortFields.includes(queryDto.sortField)) {
      const sortPath = queryDto.sortField.includes('.')
        ? queryDto.sortField
        : `${mainAlias}.${queryDto.sortField}`;

      queryBuilder.orderBy(sortPath, queryDto.order || 'ASC');
    }

    // 3. PAGINACIÓN
    // Aquí confiamos en que el Repositorio ya nos mandó valores por defecto (1 y 10)
    // Pero mantenemos el check de seguridad
    if (queryDto.page && queryDto.limit) {
      const skip = (queryDto.page - 1) * queryDto.limit;
      queryBuilder.skip(skip).take(queryDto.limit);
    }

    return queryBuilder;
  }
}
