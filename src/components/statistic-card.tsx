import { EuroIcon, PoundSterlingIcon, DollarSignIcon } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Link } from 'react-router-dom';

function NairaIcon({ className }: { className: string }) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <p>₦</p>
    </div>
  );
}

export const StatisticCardIcons = {
  NGN: NairaIcon,
  EUR: EuroIcon,
  GBP: PoundSterlingIcon,
  USD: DollarSignIcon,
} as const;

export type StatisticCardIcons = keyof typeof StatisticCardIcons;

export type StatisticCardProps = {
  icon: keyof typeof StatisticCardIcons;
  title: string;
  mainStat: string;
  secondaryStat?: React.ReactNode;
  linkText?: string;
  link?: string;
};

export function StaticsticCard({
  icon = 'EUR',
  title,
  mainStat,
  secondaryStat,
  linkText,
  link,
}: StatisticCardProps) {
  const StatIcon = StatisticCardIcons[icon];

  const hasLink = !!linkText && !!link;

  return (
    <Card className="rounded-[12px]  flex flex-col w-[320px] min-w-[280px] flex-initial overflow-hidden ">
      <CardContent className="m-0 p-4 pb-[30px] flex flex-col">
        <div className="flex gap-x-3 items-center">
          <div className="flex items-center justify-center bg-[#F0F2F3] rounded-[8px] p-3">
            <StatIcon className="size-4 text-black" />
          </div>
          <span className="text-sm font-[600]">{title}</span>
        </div>
        <div className="flex mt-3 items-center flex-nowrap gap-x-3">
          <span className="text-[24px] font-[600] pl-1">{mainStat}</span>
          {secondaryStat ? secondaryStat : null}
        </div>
      </CardContent>
      {hasLink ? (
        <Link to={link}>
          <CardFooter className="bg-[#F6F7F8] text-sm px-4 py-2">
            {linkText}
          </CardFooter>
        </Link>
      ) : null}
    </Card>
  );
}
