import "reflect-metadata";
import "express-async-errors";
import cors from "cors";
import express from "express";
import "dotenv/config";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";

// import { MIDDLEWARES, REPOSITORIES } from "@/config/constants";
// import { AppError } from "@/domain/errors";
// import { SessionHandler } from "@/domain/handlers";
// import { UserQueries } from "@/domain/queries";
// import { IAuthRepository, IUserRepository } from "@/domain/repositories";
// import {
//   AuthRepositoryInMemory,
//   UserRepositoryInMemory,
// } from "@/infra/repositories";

import "./controllers";
// import { AuthGuardMiddleware } from "./middlewares/AuthGuardMiddleware";
// import { CustomAuthProvider } from "./middlewares/CustomAuthProvider";

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
      // CustomAuthProvider,
    );
    this.createServer();
    this.configDependencies();
  }

  public get port(): number {
    return this._port;
  }

  private configDependencies(): void {
    // this._container
    //   .bind<IUserRepository>(REPOSITORIES.UsersRepository)
    //   .to(UserRepositoryInMemory);
    // this._container
    //   .bind<IAuthRepository>(REPOSITORIES.AuthRepository)
    //   .to(AuthRepositoryInMemory);
    // this._container.bind(UserQueries).toSelf();
    // this._container.bind(SessionHandler).toSelf();
    // this._container
    //   .bind<AuthGuardMiddleware>(MIDDLEWARES.AuthGuardMiddleWare)
    //   .to(AuthGuardMiddleware);
  }

  private createServer(): void {
    this._app.setConfig((app) => {
      app.use(
        cors({ origin: ["http://localhost:3000", "http://localhost:3001"] }),
      );
      app.disable("x-powered-by");
      app.use(express.json());
      app.use(this.errorMiddleware);
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
    // if (err instanceof AppError) {
    //   console.error(err);

    //   return response.status(err.statusCode).json({
    //     status: "error",
    //     message: err.message,
    //   });
    // }

    console.error(err);

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
}
