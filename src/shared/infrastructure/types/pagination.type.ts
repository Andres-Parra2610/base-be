export interface FindAllResponse<T> {
  data: T[];
  total: number;
  page?: number;
  limit?: number;
}
