import { shallowEqual } from "shallow-equal-object";

import { Notifiable } from "notifications";

interface IValueObjectProps {
  [index: string]: any;
}

export abstract class ValueObject<
  T extends IValueObjectProps,
> extends Notifiable {
  public readonly props: T;

  constructor(props: T) {
    super();
    this.props = Object.freeze(props);
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }

    if (vo.props === undefined) {
      return false;
    }

    return shallowEqual(this.props, vo.props);
  }
}
