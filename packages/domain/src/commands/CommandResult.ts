import { ICommandResult } from "./ICommandResult";

export class CommandResult<T> implements ICommandResult<T> {
  public readonly success: boolean;
  public readonly message: string;
  public readonly data: T;
  constructor(
    success: boolean,
    message: string,
    data: T,
  ) {
    this.data = data;
    this.message = message;
    this.success = success;
  }
}
