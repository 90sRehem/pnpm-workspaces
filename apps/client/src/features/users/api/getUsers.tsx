import { axios, AxiosResponse } from "@/lib/axios";
import { queryClient, QueryConfig, useQuery } from "@/lib/react-query";
import { IAPIResponse, IUser } from "@/types";
import { EQueryKeys } from "../types/Index";

export type IGetUsersResponse = {
  totalCount: number;
  users: IUser[];
};

async function getUsers(
  limit: number,
  page: number,
): Promise<IGetUsersResponse> {
  let result: IGetUsersResponse = { users: [], totalCount: 0 };
  try {
    const response = await axios.get<any, AxiosResponse<IAPIResponse<IUser[]>>>(
      "/v1/users",
      {
        params: { page, limit },
      },
    );
    const totalCount = Number(response.headers["x-total-count"]);

    const users = response.data.data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    }));
    result = { users, totalCount };
    return result;
  } catch (error) {
    // console.log(error);
    return result;
  }
}

interface IUseUsersProps {
  limit?: number;
  page?: number;
  config?: QueryConfig<typeof getUsers>;
}

export function useUsers({
  limit = 10,
  page = 1,
  config = {},
}: IUseUsersProps) {
  const queryKey = [EQueryKeys.USERS, page];
  const data = useQuery({
    queryFn: () => getUsers(limit, page),
    queryKey,
    staleTime: 1000,
    initialData: () => {
      return queryClient.getQueryData(queryKey);
    },
    ...config,
  });
  return data;
}
