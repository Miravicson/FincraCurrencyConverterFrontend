import { PaginationMeta } from '@/_generated';
import { useCallback, useState } from 'react';
import { getPaginationMetaOrDefault } from '../utils';

function useFilter<T extends object>(inputPaginationMeta?: PaginationMeta) {
  const [filters, setFilters] = useState<Partial<T>>({});
  const [appliedFilters, setAppliedFilters] = useState<Partial<T>>({});

  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>(() =>
    getPaginationMetaOrDefault({ meta: inputPaginationMeta }),
  );

  function resetFilters() {
    setFilters({});
    setAppliedFilters({});
  }

  const handleFilterChange = useCallback((key: keyof T, value: T[keyof T]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSetPaginationMeta = useCallback(
    (
      key: keyof PaginationMeta,
      value: PaginationMeta[keyof PaginationMeta],
    ) => {
      setPaginationMeta((p) => ({ ...p, [key]: value }));
    },
    [],
  );

  const applyFilters = useCallback(() => {
    setAppliedFilters(filters);
  }, [filters]);

  return {
    filters: {
      ...filters,
      perPage: paginationMeta.perPage,
      page: paginationMeta.currentPage,
    },
    appliedFilters,
    resetFilters,
    handleFilterChange,
    applyFilters,
    handleSetPaginationMeta,
    paginationMeta,
  };
}

export default useFilter;
