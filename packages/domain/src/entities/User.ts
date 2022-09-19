import {
  Avatar,
  Email,
  Name,
  Password,
  Guid,
} from "../valueObjects";
import { BaseEntity } from "./BaseEntity";

export interface IUser {
  name: Name;
  email: Email;
  password: Password;
  avatar?: Avatar;
  createdAt: string;
}

export class User extends BaseEntity<IUser> {
  constructor(props: IUser, id?: Guid) {
    super(props, id);
    this.AddNotifications(this._props.email.GetNotifications);
    this.AddNotifications(this._props.name.GetNotifications);
    this.AddNotifications(this._props.password.GetNotifications);
  }

  public get name(): Name {
    return this._props.name;
  }

  public get email(): Email {
    return this._props.email;
  }

  public get password(): Password {
    return this._props.password;
  }

  public get avatar(): Avatar | null {
    return this._props.avatar || null;
  }

  public get createdAt(): string {
    return this._props.createdAt;
  }
}
