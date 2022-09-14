// eslint-disable-next-line import/no-extraneous-dependencies
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

import { ICommandResult } from "./ICommandResult";

@ApiModel({
  description: "CommandResult",
  name: "CommandResult",
})
export class CommandResult<T> implements ICommandResult<T> {
  @ApiModelProperty({
    description: "Success",
    required: true,
    example: true,
  })
  public readonly success: boolean;

  @ApiModelProperty({
    description: "Message",
    required: true,
    example: "Success",
  })
  public readonly message: string;

  @ApiModelProperty({
    description: "Data",
    required: false,
    example: [
      {
        id: "34a81865-ed6b-47b0-9c4a-00d0f1499ddc", name: "john doe", email: "johndoe@email.com", created_at: "2022/09/14",
      },
    ],
  })
  public readonly data: T;
  constructor(
    success: boolean,
    message: string,
    data: T,
  ) {
    this.data = data;
    this.message = message;
    this.success = success;
  }
}
