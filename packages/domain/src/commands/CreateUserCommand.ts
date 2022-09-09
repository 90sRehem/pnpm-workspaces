import { Notifiable } from "notifications";
import { Contract } from "validations";

import { ICreateUserDTO } from "../dtos";
import { ICommand } from "./ICommand";

export class CreateUserCommand
  extends Notifiable
  implements ICommand<ICreateUserDTO> {
  public email: string;
  public firstName: string;
  public lastName: string;
  public password: string;

  constructor({
    email, firstName, lastName, password,
  }: ICreateUserDTO) {
    super();
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }

  validate(): void {
    this.AddNotification(
      new Contract()
        .IsNotNullOrEmptyString(
          this.firstName,
          "firstName",
          "O nome é obrigatório!",
        )
        .HasMinLength(
          this.firstName,
          3,
          "firstName",
          "O nome deve conter pelo menos 3 caracteres.",
        )
        .IsNotNullOrEmptyString(this.email, "email", "E-mail obrigatório!")
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
