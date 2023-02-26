// eslint-disable-next-line no-console
export function debugWrapperBuider(logger = console.log) {
  return <
    Fn extends (...args: any[]) => any,
    Result extends Fn extends (...args: any[]) => infer R ? R : never,
    Params extends Fn extends (...args: infer P) => any ? P : never
  >(
    fn: Fn,
    label: string = "debugWrapper",
  ): ((...args: Params) => Result) => debugWrapper(fn, label, logger);
}

export function debugWrapper<
  Fn extends (...args: any[]) => any,
  Result extends Fn extends (...args: any[]) => infer R ? R : never,
  Params extends Fn extends (...args: infer P) => any ? P : never
>(
  fn: Fn,
  label: string = "debugWrapper",
  // eslint-disable-next-line no-console
  logger = console.debug,
): (...args: Params) => Result {
  return (...args) => {
    const result = fn(...args);
    // eslint-disable-next-line no-console
    logger(label, "args:", args, "result", result);
    return result;
  };
}
