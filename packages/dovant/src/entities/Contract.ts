import { Notification } from "./Notification";

export class Contract {
  private _notifications: Array<Notification> = new Array<Notification>();
  constructor() { }

  public get GetNotifications(): Array<Notification> {
    return this._notifications;
  }

  public IsRequired() {
    return this;
  }

  public IsNotNull(value: any, property: string, message: string): Contract {
    if (value === null) {
      this.Result(property, message);
    }
    return this;
  }

  public IsNotEmptyString(value: string, property: string, message: string): Contract {
    if (value === "") this.Result(property, message);
    return this;
  }

  public IsNotNullOrEmptyString(value: string, property: string, message: string): Contract {
    if (value === "" || value === null) this.Result(property, message);
    return this;
  }

  public AreEquals(value1: any, value2: any, property: string, message: string): Contract {
    if (!(value1 === value2)) {
      this.Result(property, message);
    }
    return this;
  }

  public IsBetweenMaxMin(
    value: number,
    max: number,
    min: number,
    property: string,
    message: string,
  ): Contract {
    if (value <= min || value >= max) {
      this.Result(property, message);
    }

    return this;
  }

  public IsLengthBetweenMaxMin(
    value: any,
    max: number,
    min: number,
    property: string,
    message: string,
  ): Contract {
    if (value) {
      if (value.length <= min || value.length >= max) {
        this.Result(property, message);
      }
    }
    return this;
  }

  public HasMaxLength(value: any, min: number, property: string, message: string): Contract {
    if (value) {
      if (value.length > min) this.Result(property, message);
    }
    return this;
  }

  public HasMinLength(value: any, max: number, property: string, message: string): Contract {
    if (value) {
      if (value.length < max) this.Result(property, message);
    }
    return this;
  }

  public IsBiggerThan(value: number, min: number, property: string, message: string): Contract {
    if (value < min) this.Result(property, message);

    return this;
  }

  public IsLessThan(value: number, max: number, property: string, message: string): Contract {
    if (value > max) this.Result(property, message);

    return this;
  }

  public IsExactlyLength(value: any, Size: number, property: string, message: string): Contract {
    if (value) {
      const result = !!(value !== null && value !== "");
      if (result) {
        if (value.length !== Size) this.Result(property, message);
      }
    }
    return this;
  }

  public IsEmail(value: string, property: string, message: string): Contract {
    if (value) {
      const result = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value.toString(),
      );
      if (!result) {
        this.Result(property, message);
      }
    }
    return this;
  }

  public IsUrl(value: any, property: string, message: string): Contract {
    if (value) {
      const result = new RegExp(
        "^(https?:\\/\\/)?"
        + "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|"
        + "((\\d{1,3}\\.){3}\\d{1,3}))"
        + "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*"
        + "(\\?[;&a-z\\d%_.~+=-]*)?"
        + "(\\#[-a-z\\d_]*)?$",
        "i",
      ).test(value);
      if (!result) {
        this.Result(property, message);
      }
    }
    return this;
  }

  public IsNotUrl(value: any, property: string, message: string): Contract {
    if (value) {
      const result = new RegExp(
        "^(https?:\\/\\/)?"
        + "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|"
        + "((\\d{1,3}\\.){3}\\d{1,3}))"
        + "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*"
        + "(\\?[;&a-z\\d%_.~+=-]*)?"
        + "(\\#[-a-z\\d_]*)?$",
        "i",
      ).test(value);
      if (result) {
        this.Result(property, message);
      }
    }
    return this;
  }

  public IsAlphanumeric(value: any, property: string, message: string): Contract {
    if (value) {
      // eslint-disable-next-line prefer-regex-literals
      const result = new RegExp("/^[a-z0-9]+$/i").test(value);
      if (result) {
        this.Result(property, message);
      }
    }
    return this;
  }

  public IsNumber(value: any, property: string, message: string): Contract {
    if (value) {
      const result = Number.isNaN(value);
      if (!result) {
        this.Result(property, message);
      }
    }
    return this;
  }

  protected Result(property: string, message: string): void {
    this._notifications.unshift(new Notification(property, message));
  }
}
