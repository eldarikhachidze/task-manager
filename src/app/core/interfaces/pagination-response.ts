export interface PaginationResponse<t> {
  data: t[];
  totalCount: number;
  page: number;
  limit: number;
}
