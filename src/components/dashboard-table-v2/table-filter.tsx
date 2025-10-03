import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type TableFilterProps = {
  filterOptions: {
    filterTitle?: string;
    filterOptions?: { key: string; value: unknown }[];
    onFilter?: (_value: any) => void;
    defaultValue?: any;
    filter?: any;
  };
};

export function TableFilter({
  filterOptions: {
    defaultValue = '',
    filterTitle = '',
    filterOptions = [],
    filter,
    onFilter = (_value) => undefined,
  },
}: TableFilterProps) {
  return (
    <Select
      onValueChange={(value) => onFilter(value)}
      defaultValue={defaultValue}
      value={filter}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={`Filter by ${filterTitle}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Filter by {filterTitle}</SelectLabel>
          {filterOptions.map(({ key, value }) => (
            <SelectItem value={value as string}>{key}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
