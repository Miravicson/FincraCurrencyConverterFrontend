import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type Props = {
  title: string;
  value: number | null | undefined;
  description?: string;
  icon?: React.ElementType;
};

export function DashboardStatsCard({
  title,
  value = 0,
  description,
  icon: Icon,
}: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon ? <Icon className="w-4 h-4 text-muted-foreground" /> : null}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description ? (
          <p className="text-xs text-muted-foreground">{description}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
