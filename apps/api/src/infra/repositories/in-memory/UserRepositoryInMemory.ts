import { injectable } from "inversify";

import { User } from "@/domain/entities";
import { UserMap } from "@/domain/mappers";
import { IUserRepository } from "@/domain/repositories";
import { Email } from "@/domain/valueObjects";

@injectable()
export class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  constructor() {
    this.factory();
  }

  private factory() {
    const user = UserMap.toDomain({
      id: "d30ecf70-0709-4e6b-ad9c-c8a8d4d0a25b",
      name: "jonathan rehem",
      email: "jonathan.rehem@gmail.com",
      password: "123456",
    });
    this.users.push(user);

    const arr = Array.from(Array(20).keys());
    arr.forEach((_, index) => {
      const standardUser = UserMap.toDomain({
        name: `jonathan${index} rehem`,
        email: `jonathan.rehem${index}@gmail.com`,
        password: "123456",
      });
      this.users.push(standardUser);
    });
  }

  async list(): Promise<User[]> {
    return this.users;
  }

  async findByEmail(email: string | Email): Promise<User> {
    return this.users.find(user => {
      return email instanceof Email
        ? user.email.address === email.address
        : user.email.address === email;
    }) as User;
  }

  async findById(id: string): Promise<User> {
    return this.users.find(user => {
      return user.id.toString() === id;
    }) as User;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
