import { useGetManyTransactions } from '@/_generated';
import { DashboardTableV2 } from '@/components/dashboard-table-v2/dashboard-table-v2';
import { PageSkeleton } from '@/components/my-skeleton.tsx/page-skeleton.tsx';
import { PageTitle } from '@/components/PageTitle.tsx';
import { usePagination } from '@/lib/hooks/use-pagination';
import { useEffect } from 'react';
import { columns } from './transactions.table';

export default function Transactions() {
  const { paginationMeta, updatePaginationMeta, setPaginationMeta } =
    usePagination();

  const { data, isLoading: dataLoading } = useGetManyTransactions({
    perPage: paginationMeta.perPage,
    page: paginationMeta.currentPage,
  });

  useEffect(() => {
    if (data?.meta) {
      setPaginationMeta(data.meta);
    }
  }, [data?.meta, setPaginationMeta]);

  if (dataLoading || !data || !data.data || !data.meta) {
    return <PageSkeleton />;
  }

  const { data: transactions } = data;

  return (
    <>
      <PageTitle text="Transactions" />

      <DashboardTableV2
        paginationMeta={paginationMeta}
        data={transactions}
        columns={columns}
        // filterOptions={{
        //   filterTitle: 'Status',
        //   filterOptions: statusOptions,
        //   filter,
        //   onFilter: (value) => setFilter(value),
        // }}
        updatePaginationMeta={updatePaginationMeta}
        // onViewRow={onTableRowClick}
        resourceTitle="Transactions"
      />
    </>
  );
}
