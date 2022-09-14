import { SessionHandler, CreateSessionCommand, CreateRefreshTokenCommand } from "@monorepo-template/domain";
import {
  controller,
  BaseHttpController,
  IHttpActionResult,
  Controller,
  httpPost,
} from "inversify-express-utils";

@controller("/session")
export class SessionController
  extends BaseHttpController
  implements Controller {
  constructor(private readonly _sessionHandler: SessionHandler) {
    super();
  }

  @httpPost("/")
  public async authenticate(): Promise<IHttpActionResult> {
    const { email, password } = this.httpContext.request.body as {
      email: string;
      password: string;
    };
    const command = new CreateSessionCommand(email, password);
    const session = await this._sessionHandler.handle(command);

    if (session.success) {
      return this.ok(session);
    }

    return this.json(session, 400);
  }

  @httpPost("/refresh")
  public async refresh(): Promise<IHttpActionResult> {
    const { refreshToken, userId } = this.httpContext.request.body as {
      refreshToken: string;
      userId: string;
    };
    const command = new CreateRefreshTokenCommand(refreshToken, userId);
    const createRefreshToken = await this._sessionHandler.handle(command);

    if (createRefreshToken.success) {
      return this.ok(createRefreshToken);
    }

    return this.json(createRefreshToken, 400);
  }
}
