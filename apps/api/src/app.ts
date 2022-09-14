import "reflect-metadata";
import "express-async-errors";
import cors from "cors";
import express from "express";
import "dotenv/config";

import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
// eslint-disable-next-line import/no-extraneous-dependencies
import * as swagger from "swagger-express-ts";
import {
  AppError,
  IAuthRepository,
  IUserRepository,
  MIDDLEWARES,
  REPOSITORIES,
  SessionHandler,
  UserQueries,
} from "@monorepo-template/domain";

import { AuthGuardMiddleware, CustomAuthProvider } from "./middlewares";
import { UserRepositoryInMemory, AuthRepositoryInMemory } from "./infra";
import "./controllers";

export class App {
  private readonly _app: InversifyExpressServer;
  private _port: number;
  private readonly _container: Container;

  constructor() {
    this._container = new Container({ skipBaseClassChecks: true });
    this._app = new InversifyExpressServer(
      this._container,
      null,
      {
        rootPath: "/api/v1",
      },
      null,
      CustomAuthProvider,
    );
    this.createServer();
    this.configDependencies();
  }

  public get port(): number {
    return this._port;
  }

  private configDependencies(): void {
    this._container
      .bind<IUserRepository>(REPOSITORIES.UsersRepository)
      .to(UserRepositoryInMemory);
    this._container
      .bind<IAuthRepository>(REPOSITORIES.AuthRepository)
      .to(AuthRepositoryInMemory);
    this._container.bind(UserQueries).toSelf();
    this._container.bind(SessionHandler).toSelf();
    this._container
      .bind<AuthGuardMiddleware>(MIDDLEWARES.AuthGuardMiddleWare)
      .to(AuthGuardMiddleware);
  }

  private createServer(): void {
    this._app.setConfig((app) => {
      app.use(
        cors({ origin: ["http://localhost:3000", "http://localhost:3001"] }),
      );
      app.disable("x-powered-by");
      app.use(express.json());
      app.use(this.errorMiddleware);
      // app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
      app.use("/api-docs/swagger", express.static("swagger"));
      app.use("/api-docs/swagger/assets", express.static("node_modules/swagger-ui-dist"));
      app.use(swagger.express(
        {
          definition: {
            info: {
              title: "Swagger para Node/Express",
              description: "Documentação de um API Node/Express com Swagger - Experts Club",
              version: "1.0.0",
            },
            host: "localhost:3333",
            openapi: "3.0.1",
            // Models can be defined here
          },
        },
      ));
    });
  }

  public listen(port: number): void {
    this._port = port;
    const server = this._app.build();
    server.listen(port, () => {
      console.log(`Server started, listening on port ${port} 🚀`);
    });
  }

  private errorMiddleware(
    err: Error,
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction,
  ) {
    if (err instanceof AppError) {
      console.error(err);

      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
}
