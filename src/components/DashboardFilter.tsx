'use client';

import { useState, useCallback } from 'react';
import { CalendarIcon, ListFilter } from 'lucide-react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { DateRange } from 'react-day-picker';

export default function AdvancedFilterComponent<T>({
  options = [],
  filters = {},
  handleFilterChange,
  applyFilters,
  resetFilters,
}: {
  options: {
    label: string;
    options: {
      options: {
        label: string;
        value: string;
      }[];
      key: string;
    }[];
  }[];
  filters: Partial<T>;
  applyFilters: () => void;
  resetFilters: () => void;
  handleFilterChange: (_key: keyof T, _value: string | undefined) => void;
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState((options?.[0] || {})?.label);
  const [dateFilter, setDateFilter] = useState<string>('custom');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const handleDateFilterChange = useCallback(
    (value: string) => {
      setDateFilter(value);
      let start: Date | undefined;
      let end: Date | undefined;

      switch (value) {
        case 'today':
          start = startOfDay(new Date());
          end = endOfDay(new Date());
          break;
        case 'yesterday':
          start = startOfDay(subDays(new Date(), 1));
          end = endOfDay(subDays(new Date(), 1));
          break;
        case 'week':
          start = startOfDay(subDays(new Date(), 7));
          end = endOfDay(new Date());
          break;
        case 'custom':
          // Keep the existing custom range if any
          start = dateRange.from;
          end = dateRange.to;
          break;
      }

      setDateRange({ from: start, to: end });
      handleFilterChange(
        'startDate' as keyof T,
        start ? format(start, 'yyyy-MM-dd') : undefined,
      );
      handleFilterChange(
        'endDate' as keyof T,
        end ? format(end, 'yyyy-MM-dd') : undefined,
      );
    },
    [handleFilterChange, dateRange],
  );

  const handleCustomDateRangeChange = useCallback(
    (range?: DateRange) => {
      if (range) {
        setDateRange(range);
        handleFilterChange(
          'startDate' as keyof T,
          range.from ? format(range.from, 'yyyy-MM-dd') : undefined,
        );
        handleFilterChange(
          'endDate' as keyof T,
          range.to ? format(range.to, 'yyyy-MM-dd') : undefined,
        );
      }
    },
    [handleFilterChange],
  );

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  const handleApplyFilter = useCallback(() => {
    applyFilters();
    // Here you would typically make an API call with the filters
    setIsFilterOpen(false);
  }, [applyFilters]);

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="lg" className="gap-1 h-7">
          <ListFilter className="w-3.5 h-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Filter
          </span>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px]">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          {options.length > 1 && (
            <TabsList className="grid w-full grid-cols-2">
              {options.map((i) => (
                <TabsTrigger value={i.label}>{i.label}</TabsTrigger>
              ))}
            </TabsList>
          )}
          {options.map((i) => (
            <TabsContent value={i.label} className="space-y-4">
              {i.options.map((i) => (
                <Select
                  onValueChange={(value) =>
                    handleFilterChange(i.key as keyof T, value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={`Filter by ${i.key}`} />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{i.key}</SelectLabel>
                      {i.options.map(({ label, value }) => (
                        <SelectItem key={label} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ))}

              <Select value={dateFilter} onValueChange={handleDateFilterChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Date Filter</SelectLabel>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="week">1 Week Ago</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {dateFilter === 'custom' && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !dateRange.from &&
                          !dateRange.to &&
                          'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, 'LLL dd, y')} -{' '}
                            {format(dateRange.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(dateRange.from, 'LLL dd, y')
                        )
                      ) : (
                        'Pick a date range'
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={dateRange}
                      onSelect={handleCustomDateRangeChange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              )}
            </TabsContent>
          ))}
        </Tabs>
        <Button className="w-full mt-4" onClick={handleApplyFilter}>
          Apply Filters
        </Button>
        <Button
          className="w-full mt-4"
          variant="outline"
          onClick={() => {
            setIsFilterOpen(false);
            resetFilters();
          }}
        >
          Clear Filter
        </Button>
      </PopoverContent>
    </Popover>
  );
}
