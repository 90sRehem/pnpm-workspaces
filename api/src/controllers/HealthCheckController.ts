import {
  BaseHttpController, controller, Controller, httpGet,
} from "inversify-express-utils";
import type { IHttpActionResult } from "inversify-express-utils";

@controller("/")
export class HealthCheckController
  extends BaseHttpController
  implements Controller {
  @httpGet("/")
  public index(): IHttpActionResult {
    return this.ok("Server ok.");
  }
}
