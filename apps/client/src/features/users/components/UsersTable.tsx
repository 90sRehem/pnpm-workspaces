import { IUser } from "@/types";
import {
  Flex,
  Tooltip,
  IconButton,
  Icon,
  Box,
  useColorModeValue,
} from "@/lib/chakra-ui";
import { ErrorBoundary } from "react-error-boundary";
import { RiPencilLine, RiDeleteBin5Line } from "@/lib/react-icons";
import { ReactTable } from "@/components";
import { Fallback } from "@/components/Fallback";

interface IUsersTableProps {
  data: IUser[];
  loadingData: boolean;
  totalCountOfRegisters: number;
  registersPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function ErrorFallback() {
  return (
    <Fallback
      fallbackBtn
      type="error"
      headingText="Ops, aconteceu algo de errado."
      descriptionText="Ocorreu um problema ao tentar renderizar a tabela."
    />
  );
}

export function UsersTable({
  currentPage,
  data,
  loadingData,
  onPageChange,
  registersPerPage,
  totalCountOfRegisters,
}: IUsersTableProps) {
  return (
    <Box p="2" bg={useColorModeValue("gray.200", "gray.800")}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ReactTable<IUser>
          columns={[
            { id: "1", accessor: "id", Header: "id" },
            { id: "2", accessor: "name", Header: "nome" },
            { id: "3", accessor: "email", Header: "email" },
            { id: "4", accessor: "createdAt", Header: "data de criação" },
            {
              id: "5",
              accessor: "id",
              Header: "ações",
              // eslint-disable-next-line react/no-unstable-nested-components
              Cell({ value }) {
                return (
                  <Flex justifyContent="space-around">
                    <Tooltip hasArrow label="Editar" aria-label="Edit button">
                      <IconButton
                        as="a"
                        size="sm"
                        fontSize="small"
                        colorScheme="blue"
                        icon={<Icon as={RiPencilLine} fontSize="16" />}
                        aria-label="Edit button"
                        onClick={() => {
                          /* TODO */
                        }}
                      >
                        Editar
                      </IconButton>
                    </Tooltip>

                    <Tooltip
                      hasArrow
                      label="Excluir"
                      aria-label="Delete button"
                    >
                      <IconButton
                        as="a"
                        size="sm"
                        fontSize="small"
                        colorScheme="red"
                        icon={<Icon as={RiDeleteBin5Line} fontSize="16" />}
                        aria-label="Delete button"
                        onClick={() => {
                          /* TODO */
                        }}
                      >
                        Excluir
                      </IconButton>
                    </Tooltip>
                  </Flex>
                );
              },
            },
          ]}
          data={data}
          loadingData={loadingData}
          totalCountOfRegisters={totalCountOfRegisters}
          registersPerPage={registersPerPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </ErrorBoundary>
    </Box>
  );
}
