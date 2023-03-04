import { ComponentType, createContext, useContext } from "react";

export interface DestinationAPI {}

export const DestinationContext = createContext<DestinationAPI | null>(null);

export function ProvideDestination({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  return (
    <DestinationContext.Provider value={{}}>
      {children}
    </DestinationContext.Provider>
  );
}

export function withProvideDestination<P extends Record<string, unknown>>(
  WrappedComponent: ComponentType<P>,
): ComponentType<P> {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  function WithProvideDestination(props: P) {
    return (
      <ProvideDestination>
        <WrappedComponent {...props} />
      </ProvideDestination>
    );
  }

  WithProvideDestination.displayName = `withProvideDestination(${displayName})`;

  return WithProvideDestination;
}

export function useDestination(): DestinationAPI {
  return useContext(DestinationContext) as DestinationAPI;
}
