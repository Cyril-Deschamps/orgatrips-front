import { DefinedUseQueryResult, UseQueryResult } from "@tanstack/react-query";

export type Prefetched = true;

export type ConditionalReactQuery<
  ResultType,
  ErrorType,
  ArgsType = undefined,
> = ArgsType extends undefined
  ? <T = Prefetched | undefined>() => T extends Prefetched
      ? DefinedUseQueryResult<ResultType, ErrorType>
      : UseQueryResult<ResultType, ErrorType>
  : <T = Prefetched | undefined>(
      args: ArgsType,
    ) => T extends Prefetched
      ? DefinedUseQueryResult<ResultType, ErrorType>
      : UseQueryResult<ResultType, ErrorType>;
