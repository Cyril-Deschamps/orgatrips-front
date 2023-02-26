import React, {
  ComponentType,
  DependencyList,
  useEffect,
  useState,
} from "react";
import Loading from "./components/Loading";
import LoaderErrors from "./components/LoaderErrors";

interface Loader {
  loading: boolean;
  error: unknown;
  reload(): void;
}

export default function useLoader(
  loader: () => Promise<unknown>,
  deps?: DependencyList,
): Loader {
  const [loadingState, setLoadingState] = useState<{
    loading: boolean;
    error: unknown;
  }>({ loading: true, error: null });

  const reload = () => {
    let canceled = false;
    setLoadingState({ loading: true, error: null });
    loader().then(
      () => {
        if (!canceled) setLoadingState({ loading: false, error: null });
      },
      (errors) => {
        if (!canceled) setLoadingState({ loading: false, error: errors });
      },
    );

    return () => {
      canceled = true;
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(reload, deps ? deps : [loader]);

  return {
    ...loadingState,
    reload,
  };
}

/**
 *
 * /!\ WARNING /!\ : name your function with `use` at the beginning to get the linter on it
 * @param WrappedComponent your component
 * @param useLoad a function which returns the loader (use useCallback when using parameters)
 */
export function withLoader<P extends Record<string, unknown>>(
  WrappedComponent: ComponentType<P>,
  useLoad: () => () => Promise<unknown>,
): ComponentType<P> {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  function WithLoader(props: P) {
    const { error, loading, reload } = useLoader(useLoad());

    if (loading) return <Loading />;
    if (error) return <LoaderErrors error={error} reload={reload} />;

    return <WrappedComponent {...props} />;
  }

  WithLoader.displayName = `withLoader(${displayName})`;

  return WithLoader;
}
