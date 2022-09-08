import { interfaces } from "inversify-express-utils";

export class Principal<T> implements interfaces.Principal {
  public constructor(public details: T) { }
  public isAuthenticated(): Promise<boolean> {
    return Promise.resolve(true);
  }
  public isResourceOwner(): Promise<boolean> {
    throw Error("Not implemented");
  }
  public isInRole(_role: string): Promise<boolean> {
    throw Error("Not implemented");
  }
}
