import { Contract } from "validations";

import { ValueObject } from "./ValueObject";

interface IAvatarProps {
  url: string;
}

export class Avatar extends ValueObject<IAvatarProps> {
  constructor(props: IAvatarProps) {
    super(props);
    this.AddNotification(
      new Contract().IsUrl(this.props.url, "Avatar.Url", "Url inválida."),
    );
  }

  public get url(): IAvatarProps["url"] {
    return this.props.url;
  }
}
