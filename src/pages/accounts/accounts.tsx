import { AccountEntity, useGetUserAccounts } from '@/_generated';
import { PageSkeleton } from '@/components/my-skeleton.tsx/page-skeleton.tsx';
import { PageTitle } from '@/components/PageTitle.tsx';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AccountDetailsCard from './account-detail-card';
import { accountsToMap } from '@/lib/utils';
import { useSearchParams } from 'react-router-dom';

export default function Accounts() {
  const { data: response, isLoading: loading } = useGetUserAccounts();
  const [searchParams, setSearchParams] = useSearchParams();

  if (loading || !response || !response.data) {
    return <PageSkeleton />;
  }

  const { data: userAccounts } = response;
  const accountsMap = accountsToMap(userAccounts);

  // Get selected currency from URL query param, default to USD
  const selectedCurrency = searchParams.get('selected') || 'USD';

  // Validate that the selected currency exists in user accounts
  const validSelectedCurrency = accountsMap[selectedCurrency]
    ? selectedCurrency
    : 'USD';

  const handleTabChange = (value: string) => {
    setSearchParams({ selected: value });
  };

  const renderTabTriggerForAccount = (currencyCode: string) => {
    const account = accountsMap[currencyCode] as AccountEntity;
    return (
      <TabsTrigger key={account.currencyCode} value={account.currencyCode}>
        {account.currencyCode}
      </TabsTrigger>
    );
  };

  return (
    <>
      <PageTitle text="Accounts" />

      <Card className="rounded-[12px] p-6 flex flex-col flex-initial overflow-hidden">
        <CardContent>
          <Tabs
            value={validSelectedCurrency}
            onValueChange={handleTabChange}
            className="items-center flex flex-col"
          >
            <TabsList>
              {renderTabTriggerForAccount('USD')}
              {renderTabTriggerForAccount('GBP')}
              {renderTabTriggerForAccount('EUR')}
              {renderTabTriggerForAccount('NGN')}
            </TabsList>

            {userAccounts.map((account) => (
              <TabsContent
                key={account.currencyCode}
                value={account.currencyCode}
              >
                <AccountDetailsCard account={account} />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
}
