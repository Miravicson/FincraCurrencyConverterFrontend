function When({
  condition,
  children,
}: React.PropsWithChildren<{ condition: boolean }>) {
  return condition ? <>{children}</> : null;
}
export const Condition = { When };
