export function PageTitle({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center pb-4 ${className}`}>
      <h1 className="text-lg font-semibold md:text-2xl">{text}</h1>
    </div>
  );
}
