import { ICommand, ICommandResult } from "../commands";

export interface ICommandHandler<T extends ICommand<T>, U> {
  handle(command: T): Promise<ICommandResult<U>>;
}
