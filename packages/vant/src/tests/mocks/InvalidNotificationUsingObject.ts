import { Notifiable, Notification } from "../../entities";

export class InvalidNotificationUsingObject extends Notifiable {
  constructor() {
    super();
    this.AddNotification(
      new Notification("InvalidUsingObject.test", "Notificação de teste"),
    );
  }
}
