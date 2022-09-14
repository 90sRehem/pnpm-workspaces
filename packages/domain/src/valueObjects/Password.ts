import bcrypt from "bcrypt";

import { Contract } from "dovant";

import { ValueObject } from "./ValueObject";

interface IPasswordProps {
  value: string;
  hashed?: boolean;
}

export class Password extends ValueObject<IPasswordProps> {
  constructor(props: IPasswordProps) {
    super(props);
    this.AddNotification(
      new Contract()
        .IsNotNullOrEmptyString(
          this.props.value,
          "Password.Value",
          "O password é obrigatório!",
        )
        .HasMinLength(
          this.props.value,
          6,
          "Password.Value",
          "A senha deve ter no mínimo 6 digitos!",
        ),
    );
  }

  get value(): string {
    return this.props.value;
  }

  public isAlreadyHashed(): boolean {
    return Boolean(this.props.hashed);
  }

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    let hashed: string;

    if (this.isAlreadyHashed()) {
      hashed = this.props.value;

      return bcrypt.compare(plainTextPassword, hashed);
    }

    return this.props.value === plainTextPassword;
  }

  public getHashedValue(): string {
    if (this.isAlreadyHashed()) {
      return this.props.value;
    }

    return bcrypt.hashSync(this.props.value, 8);
  }
}
