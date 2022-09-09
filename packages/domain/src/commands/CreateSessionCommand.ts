import { Notifiable } from "notifications";
import { Contract } from "validations";

import { ICommand } from "./ICommand";

export class CreateSessionCommand
  extends Notifiable
  implements ICommand<{ email: string; password: string }> {
  public email: string;
  public password: string;

  constructor(email: string, password: string) {
    super();
    this.email = email;
    this.password = password;
  }

  validate(): void {
    this.AddNotification(
      new Contract()
        .IsNotNullOrEmptyString(this.email, "email", "O e-mail é obrigatório!")
        .IsEmail(this.email, "email", "E-mail inválido!")
        .IsNotNullOrEmptyString(
          this.password,
          "password",
          "A senha é obrigatória!",
        )
        .HasMinLength(
          this.password,
          6,
          "password",
          "A senha deve ter pelo menos 6 caracteres.",
        ),
    );
  }
}
