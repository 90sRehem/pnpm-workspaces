import { ICommand, ICommandResult } from "../commands";

export interface IHandler<T extends ICommand<T>, R> {
  handle(command: T): Promise<ICommandResult<R>>;
}
