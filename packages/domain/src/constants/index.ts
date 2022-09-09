import "dotenv/config";
import { Secret } from "jsonwebtoken";
import { EHandlers, ERepositories } from "../enums";

interface IAuthConfig {
  jwt: {
    privateKey: Secret;
    publicKey: Secret;
    tokenExpiresIn: number | string;
    refreshTokenExpiresIn: number | string;
  };
}

export const APP_PORT = process.env.PORT || 3333;
export const ACCESS_TOKEN_PRIVATE_KEY = process.env
  .ACCESS_TOKEN_PRIVATE_KEY as string;
export const ACCESS_TOKEN_PUBLIC_KEY = process.env
  .ACCESS_TOKEN_PUBLIC_KEY as string;

export const authConfig: IAuthConfig = {
  jwt: {
    tokenExpiresIn: "15m",
    refreshTokenExpiresIn: "7d",
    privateKey: ACCESS_TOKEN_PRIVATE_KEY,
    publicKey: ACCESS_TOKEN_PUBLIC_KEY,
    // privateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY?.replace(
    //   /\\n/gm,
    //   "\n",
    // ) as string,
    // publicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY?.replace(
    //   /\\n/gm,
    //   "\n",
    // ) as string,
  },
};

export const REPOSITORIES = {
  UsersRepository: Symbol(ERepositories.UsersRepository),
  AuthRepository: Symbol(ERepositories.UsersRepository),
};

export const HANDLERS = {
  SessionHandler: Symbol(EHandlers.SessionHandler),
};

export const MIDDLEWARES = {
  AuthGuardMiddleWare: Symbol("AuthGuardMiddleWare"),
};
