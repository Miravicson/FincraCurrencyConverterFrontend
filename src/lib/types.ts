export type AsyncComponent = () => Promise<{
  Component: () => JSX.Element;
}>;
