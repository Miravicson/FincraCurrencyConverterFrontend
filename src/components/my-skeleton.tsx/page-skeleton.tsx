import { Skeleton } from '../ui/skeleton';

export function PageSkeleton() {
  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col">
      <div className="flex gap-6 flex-wrap p-4">
        <Skeleton className="h-[172px] w-[320px] rounded-[12px]" />
        <Skeleton className="h-[172px] w-[320px] rounded-[12px]" />
        <Skeleton className="h-[172px] w-[320px] rounded-[12px]" />
        <Skeleton className="h-[172px] w-[320px] rounded-[12px]" />
        <Skeleton className="h-[172px] w-[320px] rounded-[12px]" />
      </div>
      <div className="space-y-6 mt-6 mb-[40px]">
        {Array.from({ length: 10 }).map((_, idx) => (
          <Skeleton key={idx} className="h-8 w-full" />
        ))}
      </div>
    </div>
  );
}
