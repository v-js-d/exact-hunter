export interface PaginationInfo {
  page: number;
  totalPages: number;
  totalItems: number;
}
export interface RespWithPagination<T> {
  result: PaginationInfo & {
    items: T[];
  };
}
