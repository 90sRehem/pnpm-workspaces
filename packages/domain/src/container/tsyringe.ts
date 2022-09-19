import { IocContainer } from "@tsoa/runtime";
import { container } from "tsyringe";
import {
  AuthRepositoryInMemory,
  IAuthRepository,
  IUserRepository,
  UserRepositoryInMemory,
} from "../repositories";
import { UserQueries } from "../queries";
import { SessionHandler } from "../handlers";
import { EHandlers, EQueries, ERepositories } from "../enums";

export const iocContainer: IocContainer = {
  get: <T>(controller: { prototype: T }): T => container.resolve<T>(controller as never),
};

container.register<IUserRepository>(
  ERepositories.UsersRepository,
  UserRepositoryInMemory,
);
container.register<IAuthRepository>(
  ERepositories.AuthRepository,
  AuthRepositoryInMemory,
);
container.register<UserQueries>(EQueries.UserQueries, UserQueries);
container.register<SessionHandler>(EHandlers.SessionHandler, SessionHandler);
