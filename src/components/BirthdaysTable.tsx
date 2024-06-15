import { useMemo, useState } from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type SortingState,
  type ColumnDef,
} from '@tanstack/react-table';
import { type BirthType } from '~/features/wikipedia/births/types';

interface BirthdaysTableProps {
  data: BirthType[];
}

const BirthdaysTable: React.FC<BirthdaysTableProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'year', desc: false }, // Default sorting by 'year' ascending
  ]);

  const columns = useMemo<ColumnDef<BirthType>[]>(
    () => [
      {
        accessorKey: 'year',
        header: 'Year',
      },
      {
        accessorKey: 'text',
        header: 'Name',
        cell: (info) => (
          <a href={`/en/onthisday/birth/${info.row.original.pages[0]?.title}`} className="text-blue-500 underline">
            {info.getValue() as string}
          </a>
        ),
      },
      {
        accessorFn: (row: BirthType) => row.pages[0]?.description ?? 'N/A',
        id: 'description',
        header: 'Description',
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full bg-white">
        <TableCaption>See all births for {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}</TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  onClick={() => {
                    const isSorted = header.column.getIsSorted();
                    header.column.toggleSorting(isSorted === 'asc');
                  }}
                  className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-24"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  <span>
                    {header.column.getIsSorted() ? (header.column.getIsSorted() === 'desc' ? ' 🔽' : ' 🔼') : null}
                  </span>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id} className="hover:bg-gray-100">
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BirthdaysTable;
