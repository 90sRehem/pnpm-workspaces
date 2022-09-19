import { authConfig, AppError } from "@monorepo-template/domain";
import * as express from "express";
import * as jwt from "jsonwebtoken";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[],
): Promise<any> {
  if (securityName === "jwt") {
    const authToken = request.headers?.authorization || "";
    const [, token] = authToken.split(" ");

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new AppError("token-invalid", 401));
      }

      jwt.verify(token, authConfig.jwt.publicKey, (err: any, decoded: any) => {
        if (err) {
          reject(new AppError("token-expired", 401));
        }
        // Check if JWT contains all required scopes
        scopes?.forEach((scope) => {
          if (!decoded.scopes.includes(scope)) {
            reject(new Error("JWT does not contain required scope."));
          }
        });

        return resolve(decoded.sub);
      });
    });
  }
  return Promise.reject();
}
