import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  HeaderGroup,
  Row,
  SortingState,
  Table as ReactTable,
  useReactTable,
  VisibilityState,
  getSortedRowModel,
} from '@tanstack/react-table';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { PaginationMeta } from '@/_generated';
import { UpdatePaginationMetaFunc } from '@/lib/hooks/use-pagination';
import { TableSize } from './table-size';
import { TableFilter, TableFilterProps } from './table-filter';
import { TableSort, TableSortProps } from './table-sort';
import { Link } from 'react-router-dom';
import { MyPagination } from './my-pagination';

type DashbordTableV2Props<D> = {
  resourceTitle: string;
  columns: ColumnDef<D>[];
  data: D[];
  columnVisibilityMap?: VisibilityState;
  onViewRow?: (_row: Row<D>) => void;
  paginationMeta: PaginationMeta;
  updatePaginationMeta: UpdatePaginationMetaFunc;
  showSelectCheck?: boolean;
  showTableActions?: boolean;
  filterOptions?: TableFilterProps['filterOptions'];
  sortOptions?: TableSortProps['sortOptions'];
  linkText?: string;
  link?: string;
  rightAction?: React.ReactNode;
};

export function DashboardTableV2<D>({
  resourceTitle,
  columns,
  data,
  columnVisibilityMap = {},
  onViewRow,
  updatePaginationMeta,
  paginationMeta,
  showSelectCheck = true,
  showTableActions = true,
  filterOptions,
  sortOptions,
  linkText,
  link,
  rightAction,
}: DashbordTableV2Props<D>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(columnVisibilityMap);
  const [rowSelection, setRowSelection] = useState({});
  const hasLink = !!linkText && !!link;

  const columnsWithSelect = decorateColumns(
    columns,
    onViewRow,
    showSelectCheck,
  );

  const table = useReactTable({
    data,
    columns: columnsWithSelect,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const selectedRows = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  {
    selectedRows;
  }
  return (
    <Card className="p-6">
      <CardHeader className="m-0 p-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-[18px] font-[600] m-0">
            {resourceTitle}
          </CardTitle>
          {hasLink || rightAction ? (
            <div className="flex items-center">
              {hasLink && (
                <Link to={link}>
                  <CardTitle className="text-sm px-4 py-2">
                    {linkText}
                  </CardTitle>
                </Link>
              )}
              {rightAction}
            </div>
          ) : null}
        </div>

        {showTableActions ? (
          <div className="flex !mt-[18px] gap-x-4 ">
            <div className="relative flex-initial w-[320px]">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#748297]"
                size={15}
              />
              <Input
                type="text"
                placeholder={`Search ${resourceTitle}`}
                className="pl-8 placeholder:text-sm placeholder:text-[#748297]"
              />
            </div>
            {filterOptions ? (
              <TableFilter filterOptions={filterOptions} />
            ) : null}

            {sortOptions ? <TableSort sortOptions={sortOptions} /> : null}
          </div>
        ) : null}
      </CardHeader>

      <CardContent className="border border-[#F6F7F8] rounded-[12px] overflow-hidden p-0 mt-4">
        <Table className="!rounded-t-[12px]">
          <MyTableHeader table={table} />
          <MyTableBody table={table} onViewClick={onViewRow} />
        </Table>
        <div className="flex justify-between pb-0 items-center px-3 text-[#020817]">
          <div className="flex flex-nowrap items-center font-normal text-sm space-x-2 py-4">
            <span>Showing</span>
            <TableSize
              perPage={paginationMeta.perPage}
              setPerPage={(perPage) => updatePaginationMeta('perPage', perPage)}
            />
            <span>entries</span>
          </div>
          <MyPagination
            currentPage={paginationMeta.currentPage}
            onSetCurrentPage={(value) =>
              updatePaginationMeta('currentPage', value)
            }
            totalPages={paginationMeta.lastPage}
          />

          <div className="flex flex-nowrap space-x-4 rounded">
            <Button
              variant={'outline'}
              onClick={() =>
                updatePaginationMeta(
                  'currentPage',
                  paginationMeta.currentPage - 1,
                )
              }
              disabled={!paginationMeta.prev}
            >
              Previous
            </Button>
            <Button
              disabled={!paginationMeta.next}
              onClick={() =>
                updatePaginationMeta(
                  'currentPage',
                  paginationMeta.currentPage + 1,
                )
              }
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MyTableHeader<D>({ table }: { table: ReactTable<D> }) {
  const tableHeaderGroups = table.getHeaderGroups();
  return (
    <TableHeader className="bg-[#F6F7F8] ">
      {tableHeaderGroups.map((headerGroup) => (
        <TableHeaderRow headerGroup={headerGroup} />
      ))}
    </TableHeader>
  );
}

function MyTableBody<D>({
  table,
  onViewClick,
}: {
  table: ReactTable<D>;
  onViewClick?: DashbordTableV2Props<D>['onViewRow'];
}) {
  const rowModel = table.getRowModel();
  const tableRows = rowModel.rows ?? [];

  if (!tableRows.length) {
    return (
      <TableRow>
        <TableCell
          colSpan={tableRows.length}
          className="h-24 text-center text-sm"
        >
          No results.
        </TableCell>
      </TableRow>
    );
  }

  return tableRows.map((row) => (
    <TableRow
      key={row.id}
      data-state={row.getIsSelected() && 'selected'}
      className={onViewClick ? 'cursor-pointer' : ''}
      onClick={() => onViewClick?.(row)}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          className="[&:nth-child(n+4)]:hidden lg:[&:nth-child(n+4)]:table-cell lg:[&:nth-child(n+5)]:hidden xl:[&:nth-child(n+5)]:table-cell px-3"
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  ));
}

function TableHeaderRow<D>({ headerGroup }: { headerGroup: HeaderGroup<D> }) {
  return (
    <TableRow key={headerGroup.id} className="!border-b-0">
      {headerGroup.headers.map((header) => {
        return (
          <TableHead
            key={header.id}
            className="uppercase !text-[#64748B] h-8 text-xs px-3"
          >
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </TableHead>
        );
      })}
    </TableRow>
  );
}

function decorateColumns<D>(
  columns: DashbordTableV2Props<D>['columns'],
  onViewClick: DashbordTableV2Props<D>['onViewRow'],
  showSelectCheck: DashbordTableV2Props<D>['showSelectCheck'],
): DashbordTableV2Props<D>['columns'] {
  let outputColumns: DashbordTableV2Props<D>['columns'] = [];

  const selectColumn: DashbordTableV2Props<D>['columns'][number] = {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all"

        // className="-ml-2"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableColumnFilter: false,
  };

  const viewColumn: DashbordTableV2Props<D>['columns'][number] = {
    id: 'view',
    cell: ({ row }) => (
      <Button
        variant={'outline'}
        size={'sm'}
        className=" flex gap-x-2 items-center text-sm"
        onClick={() => {
          if (!onViewClick) return;
          onViewClick(row);
        }}
      >
        <BookOpen
          aria-label="View appointment"
          className="cursor-pointer hover:bg-[#F6F7F8] transform duration-100 size-4"
        />
        <span>View</span>
      </Button>
    ),
  };
  {
    viewColumn;
  }
  const hasCheckboxColumn = columns.find(({ id }) => id === 'select');
  if (!hasCheckboxColumn && showSelectCheck) {
    outputColumns = [selectColumn, ...columns];
  } else {
    outputColumns = [...columns];
  }

  return [...outputColumns];
}
