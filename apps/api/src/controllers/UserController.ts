import {
  CommandResult,
  IListUsersDTO,
  IQueryResult,
  UserQueries,
} from "@monorepo-template/domain";
import {
  Controller,
  Get,
  Query,
  Request,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from "tsoa";
import { injectable } from "tsyringe";
import express from "express";

interface ICustomRequest extends express.Request {
  user: string;
}

@injectable()
@Tags("users")
@Route("api/v1/users")
export class UsersController extends Controller {
  constructor(private readonly userQueries: UserQueries) {
    super();
  }

  @Security("jwt")
  @SuccessResponse(200)
  @Get("/")
  public async listAllUsers(
    @Request() request: ICustomRequest,
    @Query("page") page: number,
    @Query("limit") limit: number,
  ): Promise<IQueryResult<IListUsersDTO>> {
    const { data, totalCount } = await this.userQueries.list(
      request.user,
      Number(page),
      Number(limit),
    );

    return new CommandResult(true, "Sucesso.", { total: totalCount, users: data });
  }
}
