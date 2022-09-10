import { randomUUID } from "crypto";

export class Guid {
  private _value: string;

  constructor(id?: string) {
    this._value = id || randomUUID();
  }

  public Equals(id?: Guid): boolean {
    if (id === null || id === undefined) {
      return false;
    }

    if (!(id instanceof Guid)) {
      return false;
    }

    return id.toValue() === this._value;
  }

  toString(): string {
    return String(this._value);
  }

  toValue(): string {
    return this._value;
  }
}
