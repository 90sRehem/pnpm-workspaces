import { injectable } from "tsyringe";
import {
  Controller,
  Get,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";

@injectable()
@Tags("health-check")
@Route("api/")
export class HealthCheckController
  extends Controller {
  constructor() {
    super();
  }
  /**
   * Enpoint para verificar a saúde do servidor.
   * @summary Retorna o status do servidor.
   */
  @SuccessResponse(200)
  @Get("/")
  public async index(): Promise<string> {
    return "server ok.";
  }
}
