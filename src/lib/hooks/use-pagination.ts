import { useCallback, useState } from 'react';
import { getPaginationMetaOrDefault } from '../utils';
import { PaginationMeta } from '@/_generated';

export type UpdatePaginationMetaFunc = (
  _key: keyof PaginationMeta,
  _value: PaginationMeta[keyof PaginationMeta],
) => void;

export function usePagination(inputPaginationMeta?: PaginationMeta) {
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>(() =>
    getPaginationMetaOrDefault({ meta: inputPaginationMeta }),
  );

  const updatePaginationMeta: UpdatePaginationMetaFunc = useCallback(
    (key, value) => {
      setPaginationMeta((p) => ({ ...p, [key]: value }));
    },
    [setPaginationMeta],
  );

  return {
    paginationMeta,
    updatePaginationMeta,
    setPaginationMeta,
  };
}
