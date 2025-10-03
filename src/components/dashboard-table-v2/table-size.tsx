import { useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectTrigger,
} from '@radix-ui/react-select';

export function TableSize({
  perPage,
  setPerPage,
}: {
  perPage: number;
  setPerPage: (_size: number) => void;
}) {
  const perPageOptions = useMemo(
    () =>
      [5].concat(Array.from({ length: 10 }, (_, index) => (index + 1) * 10)),
    [],
  );
  return (
    <Select
      value={`${perPage}`}
      defaultValue="10"
      onValueChange={(value) => {
        setPerPage(Number.parseInt(value, 10));
      }}
    >
      <SelectTrigger className="w-[40px] inline-flex items-center p-1 outline-none space-x-[2px]">
        <span>{perPage}</span>
        <SelectIcon asChild>
          <ChevronDown className="text-inherit size-4" />
        </SelectIcon>
      </SelectTrigger>
      <SelectContent
        className="bg-white border space-y-2 w-full"
        position="popper"
        avoidCollisions
        align="end"
        alignOffset={14}
      >
        {perPageOptions.map((size) => (
          <SelectItem
            className="outline-none hover:bg-[#F6F7F8] px-1 w-full "
            value={`${size}`}
          >
            {size}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
