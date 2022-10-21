import "reflect-metadata";
import "express-async-errors";
import cors from "cors";
import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";

import { ValidateError } from "tsoa";
import { AppError } from "@monorepo-template/domain";
import { RegisterRoutes } from "./routes";

export class App {
  private readonly _app: express.Express = express();
  private _port: number;

  constructor() {
    this.createServer();
  }

  public get port(): number {
    return this._port;
  }

  private createServer(): void {
    this._app.use(cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:3001",
      ],
    }));
    this._app.disable("x-powered-by");
    this._app.use(
      express.urlencoded({
        extended: true,
      }),
    );
    this._app.use(express.json({
      type: "*/json",
      limit: "10mb",
    }));
    RegisterRoutes(this._app);

    this._app.use(this.errorHandler);
    this._app.use(
      "/api-docs",
      swaggerUi.serve,
      async (_req: express.Request, res: express.Response) => res.send(
        swaggerUi.generateHTML(await import("./swagger.json")),
      ),
    );

    this._app.use((_req, res: express.Response) => {
      res.status(404).send({
        message: "Not Found",
      });
    });
  }

  public listen(port: number): void {
    this._port = port;
    this._app.listen(port, () => {
      console.log(`Server started, listening on port ${port} 🚀`);
    });
  }

  private errorHandler(
    err: unknown,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): express.Response | void {
    if (err instanceof ValidateError) {
      console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
      return res.status(422).json({
        message: "Validation Failed",
        details: err?.fields,
      });
    }
    if (err instanceof Error) {
      console.log(err);

      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
    if (err instanceof AppError) {
      console.log(err);

      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    return next();
  }

  // private errorMiddleware(
  //   err: Error,
  //   _request: express.Request,
  //   response: express.Response,
  //   _next: express.NextFunction,
  // ) {
  //   if (err instanceof AppError) {
  //     console.error(err);

  //     return response.status(err.statusCode).json({
  //       status: "error",
  //       message: err.message,
  //     });
  //   }

  //   console.error(err);

  //   return response.status(500).json({
  //     status: "error",
  //     message: `Internal server error - ${err.message}`,
  //   });
  // }
}
