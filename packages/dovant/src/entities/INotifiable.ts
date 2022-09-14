import { Notification } from "./Notification";

export interface INotifiable {
  AddNotification({ message, property }: Notification): void;
  AddNotifications(notifications: Array<Notification>): void;
}
