import { Notifiable } from "../../entities";

export class InvalidNotificationUsingPropAndMsg extends Notifiable {
  constructor() {
    super();
    this.AddNotification("InvalidUsingString.test", "Notificação de teste");
  }
}
