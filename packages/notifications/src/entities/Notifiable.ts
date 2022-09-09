import { Contract } from "validations";
import { INotifiable } from "./INotifiable";
import { Notification } from "./Notification";

export abstract class Notifiable implements INotifiable {
  private _notifications: Array<Notification>;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    this._notifications = new Array<Notification>();
  }

  public get Messages(): Array<string> {
    return this._notifications.map((x) => x.message);
  }

  public get Properties(): Array<string> {
    return this._notifications.map((x) => x.property);
  }

  public get Invalid(): boolean {
    return this._notifications.length > 0;
  }

  public get Valid(): boolean {
    return this._notifications.length <= 0;
  }

  public get GetNotifications(): Array<Notification> {
    return this._notifications;
  }

  public AddNotification(property: string, message: string): void;
  public AddNotification(notification: Notification): void;
  public AddNotification(Contract: Contract): void;
  public AddNotification(
    property?: string | Notification | Contract,
    message?: string,
  ): void {
    if (property instanceof Notification) {
      this._notifications.unshift(property);
    }
    if (property instanceof Contract) {
      const nots = property.GetNotifications;
      this._notifications.unshift(...nots);
    }
    // eslint-disable-next-line eqeqeq
    if (typeof property == "string") {
      const newNotification = new Notification(property, String(message));
      this._notifications.unshift(newNotification);
    }
  }

  public AddNotifications(notifications: Array<Notification>): void {
    this._notifications.unshift(...notifications);
  }
}
