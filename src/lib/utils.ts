import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import pluralize from 'pluralize';
import { DateTime } from 'luxon';
import { PAGES_WITH_SEARCHBAR } from './constant';
import axios from 'axios';
import { PaginationMeta } from '@/_generated';
import { startCase } from 'lodash-es';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function makePlural(word: string, count?: number) {
  return pluralize(word, count);
}

export function getReadableDate(dateIsoString: string) {
  return DateTime.fromISO(dateIsoString).toFormat('LLL dd, yyyy');
}

// Original function with time added
export function getReadableDateTime(dateIsoString: string) {
  return DateTime.fromISO(dateIsoString).toFormat('LLL dd, yyyy, h:mm a');
}

// Alternative formats you might want:

// 24-hour format
export function getReadableDateTime24(dateIsoString: string) {
  return DateTime.fromISO(dateIsoString).toFormat('LLL dd, yyyy, HH:mm');
}

// With seconds
export function getReadableDateTimeWithSeconds(dateIsoString: string) {
  return DateTime.fromISO(dateIsoString).toFormat('LLL dd, yyyy, h:mm:ss a');
}

// More compact format
export function getReadableDateTimeCompact(dateIsoString: string) {
  return DateTime.fromISO(dateIsoString).toFormat('MMM dd, yyyy h:mm a');
}

// Full format with day of week
export function getReadableDateTimeFull(dateIsoString: string) {
  return DateTime.fromISO(dateIsoString).toFormat('cccc, LLL dd, yyyy, h:mm a');
}

export function shouldShowSearch(path: string) {
  return PAGES_WITH_SEARCHBAR.includes(path);
}

export function handleMutationError(
  error: unknown,
  notify: (_message: string) => void = (message) => {
    console.log(message ?? 'An error occurred');
  },
) {
  if (axios.isAxiosError(error)) {
    notify(error.message);
  } else {
    notify('Something went wrong and our team have been notified.');
  }
}

export function isObject(object: object) {
  if (!object) return false;
  return typeof object === 'object' && !Array.isArray(object);
}

export function isEmpty(value: unknown) {
  return value === '' || value == null;
}

export function removeEmptyValues<T extends Record<string, unknown>>(
  object: T,
) {
  if (!isObject(object)) return object;

  const newObject: T = {} as T;
  Object.keys(object).forEach((key: keyof T) => {
    const value = object[key];
    if (!isEmpty(value)) {
      newObject[key] = object[key];
    }
  });

  return newObject;
}

function trimString<V>(value: V): V {
  if (typeof value === 'string') {
    return value.trim() as V;
  }
  return value;
}

function trimValue<V extends Record<string, V[keyof V]>>(value: V): V {
  if (isObject(value)) {
    return trim(value);
  } else {
    return trimString(value);
  }
}

export function trim<T extends Record<string, any>>(object: T) {
  Object.keys(object).forEach((key: keyof T) => {
    if (key !== 'password') {
      object[key] = trimValue(object[key]);
    }
  });
  return object as T;
}

export function stringToBoolean(item: string) {
  return ['1', 'true'].includes(item);
}

export const DeFaultPaginationMeta: PaginationMeta = {
  currentPage: 1,
  lastPage: 1,
  next: null,
  perPage: 10,
  prev: null,
  total: 1,
};

export function getPaginationMetaOrDefault(
  data: { data?: unknown; meta?: PaginationMeta } | undefined,
) {
  if (!data) {
    return DeFaultPaginationMeta;
  }
  return { ...DeFaultPaginationMeta, ...data.meta };
}

export function splitPascalCase(str: string) {
  return startCase(str);
}

export function formatChildAge(birthDate: string | Date): string {
  const birth = DateTime.fromISO(
    typeof birthDate === 'string'
      ? birthDate
      : new Date(birthDate).toISOString(),
  );
  const now = DateTime.now();

  const diff = now.diff(birth, ['years', 'months', 'days']).toObject();

  const years = Math.floor(diff.years ?? 0);
  const months = Math.floor(diff.months ?? 0);
  let days = Math.floor(diff.days ?? 0);

  // Convert days to weeks + remaining days if less than 1 month
  const weeks = years === 0 && months === 0 ? Math.floor(days / 7) : 0;
  days = years === 0 && months === 0 ? days % 7 : days;

  const parts: string[] = [];

  if (years > 0) parts.push(`${years}y`);
  if (months > 0) parts.push(`${months}m`);
  if (weeks > 0) parts.push(`${weeks}w`);
  if (days > 0) parts.push(`${days}d`);

  return parts.length > 0 ? parts.join(' ') : '0 day';
}
