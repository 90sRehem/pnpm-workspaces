import { inject, injectable } from "tsyringe";
import { ERepositories } from "../enums";
import { UserMap } from "../mappers";
import type { IUserRepository } from "../repositories";

@injectable()
export class UserQueries {
  constructor(
    @inject(ERepositories.UsersRepository)
    private readonly _userRepository: IUserRepository,
  ) { }

  async getById(id: string) {
    const user = await this._userRepository.findById(id);
    return UserMap.toPersistance(user);
  }
  async list(id: string, page: number, limit: number) {
    const users = await this._userRepository.list();
    const pageStart = (Number(page) - 1) * Number(limit);
    const pageEnd = pageStart + Number(limit);
    const data = users
      .map((user) => {
        const formattedUser = UserMap.toPersistance(user);
        delete formattedUser.password;
        return formattedUser;
      })
      .slice(pageStart, pageEnd)
      .filter((user) => user.id !== id);

    return { data, totalCount: users.length };
  }
}
