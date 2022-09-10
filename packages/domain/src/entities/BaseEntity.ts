import { Notifiable } from "vant";

import { Guid } from "../valueObjects/Guid";

export abstract class BaseEntity<T> extends Notifiable {
  protected readonly _id: Guid;
  protected readonly _props: T;

  constructor(props: T, id?: Guid) {
    super();
    this._id = id || new Guid();
    this._props = props;
  }

  public get id(): Guid {
    return this._id;
  }

  public Equals(object?: BaseEntity<T>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!(object instanceof BaseEntity)) {
      return false;
    }

    return this._id.Equals(object._id);
  }
}
