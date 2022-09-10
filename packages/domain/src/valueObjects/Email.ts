import { Contract } from "vant";

import { ValueObject } from "./ValueObject";

interface IEmailProps {
  address: string;
}

export class Email extends ValueObject<IEmailProps> {
  constructor(props: IEmailProps) {
    super(props);
    this.AddNotification(
      new Contract()
        .IsNotNullOrEmptyString(
          this.props.address,
          "Email.Address",
          "O e-mail é obrigatório.",
        )
        .IsEmail(this.props.address, "Email.Address", "E-mail inválido!"),
    );
  }

  public get address(): IEmailProps["address"] {
    return this.props.address;
  }
}
