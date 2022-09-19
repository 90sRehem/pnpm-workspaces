import { IErrorType } from "./IErrorType";

export class ApiError extends Error implements IErrorType {
  public statusCode = 500;
  public fields?: { [field: string]: { message: string } };

  constructor(errorType: IErrorType) {
    super(errorType.message);
    this.name = errorType.name;
    if (errorType.statusCode) this.statusCode = errorType.statusCode;
    this.fields = errorType.fields;
  }
}
