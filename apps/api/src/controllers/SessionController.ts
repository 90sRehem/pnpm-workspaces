import {
  SessionHandler,
  CreateSessionCommand,
  CreateRefreshTokenCommand,
  CommandResult,
  IAuthUserDTO,
} from "@monorepo-template/domain";
import { injectable } from "tsyringe";
import {
  Body,
  Controller,
  Route,
  SuccessResponse,
  Tags,
  Response,
  Post,
} from "tsoa";

@injectable()
@Tags("session")
@Route("api/v1/session")
export class SessionController
  extends Controller {
  constructor(private readonly _sessionHandler: SessionHandler) {
    super();
  }

  @Post("/")
  @SuccessResponse(200, "Successo.")
  @Response(400)
  public async authenticate(
    @Body() body: { email: string; password: string },
  ): Promise<CommandResult<IAuthUserDTO>> {
    const { email, password } = body;
    const command = new CreateSessionCommand(email, password);
    const session = await this._sessionHandler.handle(command);

    if (session.success) {
      this.setStatus(200);
      return session;
    }

    this.setStatus(400);
    return session;
  }

  @Post("/refresh")
  @SuccessResponse(200, "Successo.")
  @Response(400)
  public async refresh(
    @Body() body: { refreshToken: string; userId: string },
  ): Promise<CommandResult<IAuthUserDTO>> {
    const { refreshToken, userId } = body;
    const command = new CreateRefreshTokenCommand(refreshToken, userId);
    const createRefreshToken = await this._sessionHandler.handle(command);

    if (createRefreshToken.success) {
      this.setStatus(200);
      return createRefreshToken;
    }

    this.setStatus(400);
    return createRefreshToken;
  }
}
