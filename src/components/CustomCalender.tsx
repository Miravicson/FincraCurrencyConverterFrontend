import { useState } from 'react';
import {
  format,
  addYears,
  subYears,
  addMonths,
  subMonths,
  startOfYear,
} from 'date-fns';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CustomCalenderProps {
  selectedDate: Date | undefined;
  onSelectDate: (_date: Date | undefined) => void;
}

export function CustomCalender({
  selectedDate,
  onSelectDate,
}: CustomCalenderProps) {
  const currentYear = new Date().getFullYear();
  const [date, setDate] = useState<Date>(selectedDate || new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const years = Array.from({ length: 106 }, (_, i) => currentYear - 100 + i);

  const handleYearChange = (year: string) => {
    const newDate = startOfYear(new Date(parseInt(year), 0, 1));
    setDate(newDate);
  };

  const handleMonthChange = (month: string) => {
    const newDate = new Date(date);
    newDate.setMonth(parseInt(month));
    setDate(newDate);
  };

  const navigateYear = (direction: 'forward' | 'backward') => {
    setDate(direction === 'forward' ? addYears(date, 1) : subYears(date, 1));
  };

  const navigateMonth = (direction: 'forward' | 'backward') => {
    setDate(direction === 'forward' ? addMonths(date, 1) : subMonths(date, 1));
  };

  const navigate10Years = (direction: 'forward' | 'backward') => {
    setDate(direction === 'forward' ? addYears(date, 10) : subYears(date, 10));
  };

  return (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !selectedDate && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, 'PPP')
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex items-center justify-between space-x-2 p-3">
          <Select
            value={date.getFullYear().toString()}
            onValueChange={handleYearChange}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={date.getMonth().toString()}
            onValueChange={handleMonthChange}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i} value={i.toString()}>
                  {format(new Date(2000, i, 1), 'MMMM')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between px-3 py-2">
          <Button
            variant="outline"
            className="h-7 w-7 p-0"
            onClick={() => navigate10Years('backward')}
            title="Go back 10 years"
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Go back 10 years</span>
          </Button>
          <Button
            variant="outline"
            className="h-7 w-7 p-0"
            onClick={() => navigateYear('backward')}
            title="Previous year"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous year</span>
          </Button>
          <Button
            variant="outline"
            className="h-7 w-7 p-0"
            onClick={() => navigateMonth('backward')}
            title="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous month</span>
          </Button>
          <Button
            variant="outline"
            className="h-7 w-7 p-0"
            onClick={() => navigateMonth('forward')}
            title="Next month"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next month</span>
          </Button>
          <Button
            variant="outline"
            className="h-7 w-7 p-0"
            onClick={() => navigateYear('forward')}
            title="Next year"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next year</span>
          </Button>
          <Button
            variant="outline"
            className="h-7 w-7 p-0"
            onClick={() => navigate10Years('forward')}
            title="Go forward 10 years"
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Go forward 10 years</span>
          </Button>
        </div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(newDate) => {
            onSelectDate(newDate);
            setIsCalendarOpen(false);
          }}
          month={date}
          onMonthChange={setDate}
          initialFocus
          fromYear={currentYear - 100}
          toYear={currentYear + 5}
        />
      </PopoverContent>
    </Popover>
  );
}
