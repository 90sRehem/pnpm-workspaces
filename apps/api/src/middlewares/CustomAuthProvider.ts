import { Request, Response, NextFunction } from "express";
import { injectable, inject } from "inversify";
import { interfaces } from "inversify-express-utils";

import { IAuthRepository, REPOSITORIES, Principal } from "@monorepo-template/domain";

const authRepository = inject(REPOSITORIES.AuthRepository);

@injectable()
export class CustomAuthProvider implements interfaces.AuthProvider {
  @authRepository private readonly _authRepository: IAuthRepository;
  public async getUser(
    req: Request,
    _res: Response,
    _next: NextFunction,
  ): Promise<interfaces.Principal> {
    let principal: Principal<unknown> = new Principal(null);
    const authToken = req.headers.authorization;

    if (authToken) {
      try {
        const [, token] = authToken.split(" ");
        const verifyToken = this._authRepository.verify(token);
        principal = new Principal(verifyToken.sub as string);
      } catch (error) { }
    }
    return principal;
  }
}
