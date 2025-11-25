export const Constants = {
  PER_PAGE: 10,
};

interface PaginationQueryProps {
  page?: number;
  limit?: number;
}

/**
 * Retorna skip y take a partir de page y limit
 */
export const query = ({
  page = 1,
  limit = Constants.PER_PAGE,
}: PaginationQueryProps) => {
  return {
    skip: (page - 1) * limit,
    take: limit,
  };
};

/**
 * Devuelve un objeto paginado con metadata
 */
export const get = <T = any>(
  data: T[],
  page = 1,
  perPage = Constants.PER_PAGE,
  total = 0,
) => ({
  data,
  page,
  perPage,
  pages: Math.ceil(total / perPage),
  total,
});

/**
 * Aplica paginación a un array ya cargado
 */
export const getCustom = <T = any>(
  data: T[],
  page = 1,
  perPage = Constants.PER_PAGE,
  total = 0,
) => ({
  data: data.slice((page - 1) * perPage, page * perPage),
  page,
  perPage,
  pages: Math.ceil(total / perPage),
  total,
});
