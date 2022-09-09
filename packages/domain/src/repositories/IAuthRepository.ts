import { JwtPayload, Jwt } from "jsonwebtoken";

export interface IAuthRepository {
  generate(
    payload: string | Record<string, unknown> | Buffer,
    subject: string | undefined,
  ): { token: string; expiresIn: string | number };
  createToken(
    payload: string | Record<string, unknown> | Buffer,
    subject: string | undefined,
  ): { token: string; expiresIn: string | number };
  createRefreshToken(): { refreshToken: string | number };
  verify(token: string): string | JwtPayload;
  decode(token: string): Jwt | null;
}
