export function StatisticCardWrapper({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`flex gap-6 mb-8 flex-wrap ${className}`}>{children}</div>
  );
}
