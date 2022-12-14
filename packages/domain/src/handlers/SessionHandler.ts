import { inject, injectable } from "tsyringe";
import { Notifiable } from "dovant";

import { IAuthUserDTO } from "../dtos";

import {
  CommandResult,
  CreateRefreshTokenCommand,
  CreateSessionCommand,
  ICommandResult,
} from "../commands";
import type { IAuthRepository, IUserRepository } from "../repositories";
import { ICommandHandler } from "./ICommandHandler";
import { ERepositories } from "../enums";

type CreateSessionCommandResult = IAuthUserDTO;
type CreateRefreshTokenCommandResult = IAuthUserDTO;

@injectable()
export class SessionHandler
  extends Notifiable
  implements
  ICommandHandler<CreateSessionCommand, CreateSessionCommandResult>,
  ICommandHandler<CreateRefreshTokenCommand, CreateRefreshTokenCommandResult> {
  constructor(
    @inject(ERepositories.UsersRepository)
    private readonly _userRepository: IUserRepository,
    @inject(ERepositories.AuthRepository)
    private readonly _authRepository: IAuthRepository,
  ) {
    super();
  }
  handle(
    command: CreateSessionCommand,
  ): Promise<ICommandResult<CreateSessionCommandResult>>;
  handle(
    command: CreateRefreshTokenCommand,
  ): Promise<ICommandResult<CreateRefreshTokenCommandResult>>;
  async handle(
    command: CreateSessionCommand | CreateRefreshTokenCommand,
  ): Promise<ICommandResult<unknown>> {
    command.validate();
    let result: IAuthUserDTO;

    if (command instanceof CreateSessionCommand) {
      if (command.Invalid) {
        return new CommandResult(
          false,
          "Ops, parece que tem algo de errado.",
          command.GetNotifications,
        );
      }

      const userExists = await this._userRepository.findByEmail(command.email);

      if (userExists) {
        const { token } = this._authRepository.createToken(
          {},
          userExists.id.toString(),
        );
        const { refreshToken } = this._authRepository.createRefreshToken();
        result = {
          id: userExists.id.toString(),
          name: userExists.name.fullName,
          email: userExists.email.address,
          token,
          refreshToken,
        };

        return new CommandResult(true, "Usu??rio autenticado.", result);
      }

      return new CommandResult(
        false,
        "Combina????o incorreta de e-mail/senha.",
        null,
      );
    }

    if (command.Invalid) {
      return new CommandResult(
        false,
        "Ops, parece que tem algo de errado.",
        command.GetNotifications,
      );
    }

    try {
      this._authRepository.verify(command.refreshToken);
      const userExists = await this._userRepository.findById(command.userId);

      if (userExists) {
        const { refreshToken } = this._authRepository.createRefreshToken();
        const { token } = this._authRepository.createToken(
          {},
          userExists.id.toString(),
        );

        result = {
          id: userExists.id.toString(),
          name: userExists.name.fullName,
          email: userExists.email.address,
          token,
          refreshToken,
        };
        return new CommandResult(true, "Sucesso.", result);
      }
    } catch (error) {
      console.log(error);
    }

    return new CommandResult(
      false,
      "Ops, parece que tem algo de errado.",
      command.GetNotifications,
    );
  }
}
