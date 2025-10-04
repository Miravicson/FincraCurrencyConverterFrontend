import { AccountEntity } from '@/_generated';
import { Button } from '@/components/ui/button';
import { formatCurrencyWithSymbol } from '@/lib/utils';
import { CONVERT, FUND_ACCOUNT } from '@/routes/route-paths';
import { Link } from 'react-router-dom';

export interface AccountDetailCardProps {
  account: AccountEntity;
}

function Balance({
  name,
  value,
  symbol,
  currencyCode,
}: {
  name: string;
  value: string;
  symbol: string;
  currencyCode: string;
}) {
  return (
    <div className="py-6 px-8 mt-4 border-r border-gray-200 last:border-r-0">
      <h1 className={`font-semibold text-sm leading-5 text-gray-400`}>
        {name}
      </h1>
      <p className={`flex justify-center py-2 font-bold text-3xl`}>
        {formatCurrencyWithSymbol(value, currencyCode, symbol)}
      </p>
    </div>
  );
}

export default function AccountDetailsCard({
  account,
}: AccountDetailCardProps) {
  const { currencyCode, currencySymbol, availableBalance, pendingBalance } =
    account;

  return (
    <div className="flex flex-col">
      <div className={`flex`}>
        <Balance
          name={`Available ${currencyCode} balance`}
          symbol={currencySymbol}
          value={availableBalance}
          currencyCode={currencyCode}
        />
        <Balance
          name={`Pending ${currencyCode} balance`}
          symbol={currencySymbol}
          value={pendingBalance}
          currencyCode={currencyCode}
        />
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        <Button asChild>
          <Link to={FUND_ACCOUNT}>Fund Account</Link>
        </Button>
        <Button asChild>
          <Link to={CONVERT}>Convert Funds</Link>
        </Button>
      </div>
    </div>
  );
}
