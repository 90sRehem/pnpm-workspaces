export interface ICommandResult<T> {
  success: boolean;
  message: string;
  data: T;
}
