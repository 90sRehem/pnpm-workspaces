import { MIDDLEWARES, UserQueries, CommandResult } from "@monorepo-template/domain";
import {
  httpGet,
  BaseHttpController,
  IHttpActionResult,
  controller,
} from "inversify-express-utils";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ApiOperationGet, ApiPath, SwaggerDefinitionConstant } from "swagger-express-ts";

@ApiPath({
  name: "users",
  path: "/users",
})
@controller("/users", MIDDLEWARES.AuthGuardMiddleWare)
export class UsersController extends BaseHttpController {
  constructor(private readonly userQueries: UserQueries) {
    super();
  }

  @ApiOperationGet({
    description: "Get versions objects list",
    summary: "Get versions list",
    responses: {
      200: {
        description: "Success",
        type: SwaggerDefinitionConstant.Response.Type.OBJECT,
        model: "CommandResult",
      },
    },
    security: {
      apiKeyHeader: [],
    },
  })
  @httpGet("/")
  public async listAllUsers(): Promise<IHttpActionResult> {
    const users = await this.userQueries.list(
      this.httpContext.user.details,
      Number(this.httpContext.request.query.page),
      Number(this.httpContext.request.query.limit),
    );
    this.httpContext.response.setHeader("X-Total-Count", users.totalCount);
    return this.ok(new CommandResult(true, "Sucesso.", users.data));
  }
}
