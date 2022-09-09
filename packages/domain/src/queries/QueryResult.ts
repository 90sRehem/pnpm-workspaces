import { IQueryResult } from "./IQueryResult";

export class QueryResult<T> implements IQueryResult<T> {
  constructor(
    public readonly success: boolean,
    public readonly message: string,
    public readonly data: T,
  ) { }
}
