import { useGetDashboardData } from '@/_generated';
import { DashboardTableV2 } from '@/components/dashboard-table-v2/dashboard-table-v2';
import { PageSkeleton } from '@/components/my-skeleton.tsx/page-skeleton.tsx';
import { PageTitle } from '@/components/PageTitle.tsx';
import {
  StaticsticCard,
  StatisticCardIcons,
} from '@/components/statistic-card';
import { StatisticCardWrapper } from '@/components/statistic-card-wrapper';
import { columns } from './recent-transactions.table';
import { usePagination } from '@/lib/hooks/use-pagination';

export default function Dashboard() {
  const { paginationMeta, updatePaginationMeta } = usePagination();
  const { data, isLoading: loading } = useGetDashboardData();

  if (loading || !data) {
    return <PageSkeleton />;
  }

  const { data: dashboardEntity } = data;

  return (
    <>
      <PageTitle text="Dashboard" className={`pb-4`} />

      <StatisticCardWrapper>
        {dashboardEntity.balances.map((account) => (
          <StaticsticCard
            icon={account.currencyCode as StatisticCardIcons}
            title={account.currencyName}
            mainStat={`${account.availableBalance}`}
            key={account.currencyCode}
          />
        ))}
      </StatisticCardWrapper>

      <DashboardTableV2
        paginationMeta={paginationMeta}
        updatePaginationMeta={updatePaginationMeta}
        data={dashboardEntity.recentTransactions}
        columns={columns}
        resourceTitle="Recent Transactions"
        showSelectCheck={false}
        showTableActions={false}
      />
    </>
  );
}
