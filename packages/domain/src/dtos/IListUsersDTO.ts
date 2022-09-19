// type ListUser = {
//   id: string;
//   name: string;
//   email: string;
// };
// export type IListUsersDTO = ListUser[];
type IUser = {
  id?: string;
  name: string;
  email: string;
  password?: string;
};

export interface IListUsersDTO {
  users: IUser[];
  total: number;
}
