import { Contract, Notifiable } from "dovant";
import { ICommand } from "./ICommand";

export class CreateRefreshTokenCommand
  extends Notifiable
  implements ICommand<{ refreshToken: string }> {
  constructor(public refreshToken: string, public userId: string) {
    super();
  }
  validate(): void {
    this.AddNotification(
      new Contract()
        .IsNotNullOrEmptyString(
          this.refreshToken,
          "refreshToken",
          "O token é obrigatório!",
        )
        .IsNotNullOrEmptyString(
          this.userId,
          "userId",
          "O id do usuário é obrigatório!",
        ),
    );
  }
}
