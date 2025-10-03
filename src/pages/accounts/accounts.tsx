import { useGetUserAccounts } from '@/_generated';
import { PageSkeleton } from '@/components/my-skeleton.tsx/page-skeleton.tsx';
import { PageTitle } from '@/components/PageTitle.tsx';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AccountDetailsCard from './account-detail-card';

export default function Accounts() {
  const { data: response, isLoading: loading } = useGetUserAccounts();

  if (loading || !response || !response.data) {
    return <PageSkeleton />;
  }

  const { data: userAccounts } = response;

  return (
    <>
      <PageTitle text="Accounts" />

      <Card className="rounded-[12px] p-6  flex flex-col  flex-initial overflow-hidden ">
        <CardContent>
          <Tabs
            defaultValue={userAccounts[0]!.currencyCode}
            className={`items-center flex flex-col`}
          >
            <TabsList>
              {userAccounts.map((account) => (
                <TabsTrigger
                  key={account.currencyCode}
                  value={account.currencyCode}
                >
                  {account.currencyCode}
                </TabsTrigger>
              ))}
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
