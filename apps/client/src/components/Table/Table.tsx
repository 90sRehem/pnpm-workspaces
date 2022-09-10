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
} from "@/lib/chakra-ui";
import React from "react";
import { Pagination } from "../Pagination";

export type TableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  Cell?({ entry }: { entry: Entry }): React.ReactElement;
};

export type TableProps<Entry> = {
  data: Entry[];
  columns: TableColumn<Entry>[];
  loadingData: boolean;
  totalCountOfRegisters: number;
  registersPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export function Table<Entry extends { id: string }>({
  columns,
  data = [],
  loadingData = false,
  totalCountOfRegisters,
  registersPerPage,
  currentPage,
  onPageChange,
}: TableProps<Entry>) {
  return (
    <>
      <TableContainer
        maxH="container.md"
        overflowY="auto"
        overflowX="hidden"
        bg={useColorModeValue("gray.200", "gray.800")}
      >
        <ChakraTable>
          <Thead>
            <Tr>
              {columns.map((collumn, index) => {
                return (
                  <Th key={collumn.title} textAlign="center">
                    {collumn.title}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {loadingData && (
              <Tr>
                <Td colSpan={columns.length}>
                  <Skeleton height="4" />
                </Td>
              </Tr>
            )}
            {data ? (
              data.map((entry, entryIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <Tr key={entryIndex}>
                  {columns.map(({ Cell, field, title }, columnIndex) => (
                    <Td key={title} textAlign="center">
                      {Cell ? (
                        <Cell entry={entry} />
                      ) : (
                        (entry[field] as React.ReactElement)
                      )}
                    </Td>
                  ))}
                </Tr>
              ))
            ) : (
              <Tr>
                <Td textAlign="center" colSpan={5}>
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
