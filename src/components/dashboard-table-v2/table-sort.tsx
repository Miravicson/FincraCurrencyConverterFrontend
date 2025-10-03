import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type TableSortProps = {
  sortOptions: {
    sortTitle?: string;
    sortOptions?: { key: string; value: unknown }[];
    onSort?: (_value: any) => void;
    defaultValue?: any;
    sort?: any;
  };
};

export function TableSort({
  sortOptions: {
    defaultValue = '',
    sortTitle = '',
    sortOptions = [],
    sort,
    onSort = (_value) => undefined,
  },
}: TableSortProps) {
  return (
    <Select
      onValueChange={(value) => onSort(value)}
      defaultValue={defaultValue}
      value={sort}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={`Sort by ${sortTitle}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by {sortTitle}</SelectLabel>
          {sortOptions.map(({ key, value }) => (
            <SelectItem value={value as string}>{key}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
