import {
  Email,
  Name,
  Password,
  Guid,
} from "../valueObjects";
import { User } from "../entities";

type PersistanceUser = {
  id?: string;
  name: string;
  email: string;
  password?: string;
};

export class UserMap {
  public static toPersistance(user: User): PersistanceUser {
    return {
      id: user.id.toString(),
      name: user.name.fullName,
      email: user.email.address,
      password: user.password.getHashedValue(),
    };
  }

  public static toDomain(raw: PersistanceUser) {
    const [firstName, lastName] = raw.name.split(" ");

    return new User(
      {
        email: new Email({ address: raw.email }),
        name: new Name({ firstName, lastName }),
        password: new Password({ value: raw.password as string }),
        createdAt: "",
      },
      new Guid(raw.id),
    );
  }
}
