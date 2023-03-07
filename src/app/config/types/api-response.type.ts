export type ApiResponse<T> = {
  page: number;
  perPage: number;
  data: Array<T>;
  total_pages: number;
  total: number;
};
