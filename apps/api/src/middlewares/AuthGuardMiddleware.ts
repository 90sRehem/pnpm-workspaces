import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";

import { IAuthRepository, REPOSITORIES } from "@monorepo-template/domain";

@injectable()
export class AuthGuardMiddleware extends BaseMiddleware {
  @inject(REPOSITORIES.AuthRepository)
  private readonly _authRepository: IAuthRepository;

  public handler(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (authToken) {
      const [, token] = authToken.split(" ");

      try {
        const verifyToken = this._authRepository.verify(token);

        if (verifyToken.sub) {
          return next();
        }
      } catch (err) {
        if (err instanceof Error) {
          if (err.message === "invalid token") {
            return res.status(401).json({ error: "token-invalid" });
          }
        }

        return res.status(401).json({ error: "token-expired" });
      }
    }

    return res.status(401).json({ error: "token-invalid" });
  }
}
