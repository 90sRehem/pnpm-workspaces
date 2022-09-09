import { injectable } from "inversify";
import jwt, { JwtPayload, Jwt } from "jsonwebtoken";

import { authConfig } from "@/config/auth";
import { IAuthRepository } from "@/domain/repositories";

@injectable()
export class AuthRepositoryInMemory implements IAuthRepository {
  createToken(
    payload: string | Record<string, unknown> | Buffer,
    subject: string | undefined,
  ): { token: string; expiresIn: string | number } {
    return {
      expiresIn: authConfig.jwt.tokenExpiresIn,
      token: jwt.sign(payload, authConfig.jwt.privateKey, {
        algorithm: "RS256",
        expiresIn: authConfig.jwt.tokenExpiresIn,
        subject,
      }),
    };
  }
  createRefreshToken(): { refreshToken: string | number } {
    return {
      refreshToken: jwt.sign({}, authConfig.jwt.privateKey, {
        algorithm: "RS256",
        expiresIn: authConfig.jwt.refreshTokenExpiresIn,
      }),
    };
  }
  generate(
    payload: string | Buffer | Record<string, unknown>,
    subject: string | undefined,
  ): { token: string; expiresIn: string | number } {
    return {
      expiresIn: authConfig.jwt.tokenExpiresIn,
      token: jwt.sign(payload, authConfig.jwt.privateKey, {
        algorithm: "RS256",
        expiresIn: authConfig.jwt.tokenExpiresIn,
        subject,
      }),
    };
  }
  verify(token: string): string | JwtPayload {
    return jwt.verify(token, authConfig.jwt.publicKey);
  }
  decode(token: string): Jwt | null {
    return jwt.decode(token, { complete: true });
  }
}
