export interface IWrite<T> {
  create(item: T): Promise<T>;
  update(id: string, item: T): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}

export interface IRead<T> {
  findAll(): Promise<T[]>;
  findOne(item: T): Promise<T>;
}

export abstract class BaseRepository<C, R, U>
  implements IWrite<C | U>, IRead<R> {
  create(item: C | U): Promise<C | U> {
    throw new Error("Method not implemented.");
  }
  update(id: string, item: C | U): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<R[]> {
    throw new Error("Method not implemented.");
  }
  findOne(item: R): Promise<R> {
    throw new Error("Method not implemented.");
  }
}
