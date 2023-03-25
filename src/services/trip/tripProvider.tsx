import { ComponentType, createContext, useContext } from "react";

export interface TripAPI {}

export const TripContext = createContext<TripAPI | null>(null);

export function ProvideTrip({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  return <TripContext.Provider value={{}}>{children}</TripContext.Provider>;
}

export function withProvideTrip<P extends Record<string, unknown>>(
  WrappedComponent: ComponentType<P>,
): ComponentType<P> {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  function WithProvideTrip(props: P) {
    return (
      <ProvideTrip>
        <WrappedComponent {...props} />
      </ProvideTrip>
    );
  }

  WithProvideTrip.displayName = `withProvideTrip(${displayName})`;

  return WithProvideTrip;
}

export function useTrip(): TripAPI {
  return useContext(TripContext) as TripAPI;
}
