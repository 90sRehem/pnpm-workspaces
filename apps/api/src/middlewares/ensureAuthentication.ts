import { Request, Response, NextFunction } from "express";

import { AuthRepositoryInMemory } from "@monorepo-template/domain";

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authRepository = new AuthRepositoryInMemory();
  const authToken = req.headers.authorization;

  if (authToken) {
    const [, token] = authToken.split(" ");

    try {
      const verifyToken = authRepository.verify(token);

      if (verifyToken.sub) {
        req.user = verifyToken.sub as string;
        return next();
      }
    } catch (err) {
      if (err instanceof Error) {
        // console.log(`auth-error: ${err.message}`);
        if (err.message === "invalid token") {
          return res.status(401).json({ error: "token-invalid" });
        }
      }

      return res.status(401).json({ error: "token-expired" });
    }
  }

  return res.status(401).json({ error: "token-invalid" });
}
