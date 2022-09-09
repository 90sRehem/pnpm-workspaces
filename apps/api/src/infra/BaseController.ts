import * as express from "express";

export abstract class BaseController {
  protected _request: express.Request;
  protected _response: express.Response;
  protected abstract executeImpl(): Promise<void | any>;

  public get request(): express.Request {
    return this._request;
  }

  public execute(request: express.Request, response: express.Response): void {
    this._request = request;
    this._response = response;

    this.executeImpl();
  }

  public static jsonResponse(
    response: express.Response,
    code: number,
    message: string,
  ): express.Response {
    return response.status(code).json({ message });
  }

  public ok<T>(dto?: T): express.Response {
    if (dto) {
      return this._response.status(200).json(dto);
    }

    return this._response.sendStatus(200);
  }

  public response<T>(statusCode: number, dto?: T): express.Response {
    if (dto) {
      return this._response.status(statusCode).json(dto);
    }

    return this._response.sendStatus(statusCode);
  }

  public created(): express.Response {
    return this._response.sendStatus(201);
  }

  public clientError(message?: string): express.Response {
    return BaseController.jsonResponse(
      this._response,
      400,
      message || "Unauthorized",
    );
  }

  public unauthorized(message?: string): express.Response {
    return BaseController.jsonResponse(
      this._response,
      401,
      message || "Unauthorized",
    );
  }

  public forbidden(message?: string): express.Response {
    return BaseController.jsonResponse(
      this._response,
      403,
      message || "Forbidden",
    );
  }

  public notFound(message?: string): express.Response {
    return BaseController.jsonResponse(
      this._response,
      404,
      message || "Not found",
    );
  }

  public conflict(message?: string): express.Response {
    return BaseController.jsonResponse(
      this._response,
      409,
      message || "Conflict",
    );
  }

  public tooMany(message?: string): express.Response {
    return BaseController.jsonResponse(
      this._response,
      429,
      message || "Too many requests",
    );
  }

  public noContent(): express.Response {
    return BaseController.jsonResponse(this._response, 204, "");
  }

  public fail(error: Error | string): express.Response {
    console.log(error);

    return this._response.status(500).json({
      message: error.toString(),
    });
  }

  public setCookie(name: string, val: any, options: express.CookieOptions) {
    return this._response.cookie(name, val, options);
  }
}
