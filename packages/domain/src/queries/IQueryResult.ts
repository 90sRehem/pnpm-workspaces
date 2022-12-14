export interface IQueryResult<T> {
  success: boolean;
  message: string;
  data: T;
}
