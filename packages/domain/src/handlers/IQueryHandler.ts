import { IQuery, IQueryResult } from "../queries";

export interface IQueryHandler<Q extends IQuery<Q>, R> {
  handle(query: Q): Promise<IQueryResult<R>>;
}
