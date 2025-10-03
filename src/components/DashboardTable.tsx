import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Row,
  ColumnDef,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Card, CardContent, CardFooter } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Button } from './ui/button';
import { makePlural } from '../lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type DashboardTableProps<D, C extends ColumnDef<D, any>> = {
  entityName?: string;
  columns: C[];
  data: D[];
  columnVisibilityMap?: VisibilityState;
  onRowClick?: (_row: Row<D>) => void;
};

export function DashboardTable<D, C extends ColumnDef<D, any>>({
  entityName = 'entity',
  columns,
  data,
  columnVisibilityMap = {},
  onRowClick,
}: DashboardTableProps<D, C>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(columnVisibilityMap);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const pagination = table.getState().pagination;

  const paginationFactor = pagination.pageIndex * pagination.pageSize;
  const tableStartRange = paginationFactor + 1;
  const tableEndRange = paginationFactor + table.getRowModel().rows.length;
  const totalCount = table.getRowCount();

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardContent>
        <Table className="text-xs lg:text-sm">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="[&:nth-child(n+4)]:hidden lg:[&:nth-child(n+4)]:table-cell lg:[&:nth-child(n+5)]:hidden xl:[&:nth-child(n+5)]:table-cell px-2"
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => {
                    if (onRowClick) {
                      onRowClick(row);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="[&:nth-child(n+4)]:hidden lg:[&:nth-child(n+4)]:table-cell lg:[&:nth-child(n+5)]:hidden xl:[&:nth-child(n+5)]:table-cell px-2"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-4">
        {totalCount ? (
          <>
            <div className="text-xs text-muted-foreground">
              Showing{' '}
              <strong>
                {tableStartRange} - {tableEndRange}
              </strong>{' '}
              of <strong>{totalCount}</strong>{' '}
              {makePlural(entityName, totalCount)}
            </div>
            <div className="flex items-center justify-end py-4 space-x-2">
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="h-7"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="h-7"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : null}
      </CardFooter>
    </Card>
  );
}
