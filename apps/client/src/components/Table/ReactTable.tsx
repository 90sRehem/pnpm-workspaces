/* eslint-disable no-nested-ternary */
import {
  TableContainer,
  Table as ChakraTable,
  Tbody,
  Thead,
  Th,
  Tr,
  Td,
  Skeleton,
  useColorModeValue,
  chakra,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@/lib/chakra-ui";
import { Column, useSortBy, useTable } from "react-table";
import { Pagination } from "../Pagination";

export type ReactTableProps<Entry extends object> = {
  data: Entry[];
  columns: Column<Entry>[];
  loadingData: boolean;
  totalCountOfRegisters: number;
  registersPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export function ReactTable<Entry extends object>({
  columns,
  data = [],
  loadingData = false,
  totalCountOfRegisters,
  registersPerPage,
  currentPage,
  onPageChange,
}: ReactTableProps<Entry>) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);
  return (
    <>
      <TableContainer
        maxH="container.md"
        overflowY="auto"
        overflowX="hidden"
        bg={useColorModeValue("gray.200", "gray.800")}
      >
        <ChakraTable {...getTableProps()}>
          <Thead textAlign="center">
            {headerGroups.map(headerGroup => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {/* <Th px="6" w="8">
                  <Box as="label" border="2px solid" borderRadius="sm">
                    {" "}
                    <Checkbox />
                  </Box>
                </Th> */}
                {headerGroup.headers.map(column => (
                  <Th
                    textAlign="center"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <chakra.span pl="4">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {loadingData && (
              <Tr>
                <Td colSpan={columns.length}>
                  <Skeleton height="4" />
                </Td>
              </Tr>
            )}
            {rows.length > 0 ? (
              rows.map(row => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <Td textAlign="center" {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </Td>
                    ))}
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td textAlign="center" colSpan={6}>
                  vazio
                </Td>
              </Tr>
            )}
          </Tbody>
        </ChakraTable>
      </TableContainer>
      {data && (
        <Pagination
          totalCountOfRegisters={totalCountOfRegisters}
          registersPerPage={registersPerPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}
