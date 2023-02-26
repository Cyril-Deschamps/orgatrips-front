import React, {
  ComponentType,
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useRef,
} from "react";

export interface HeadActionsAPI {
  domElement: MutableRefObject<Element | null>;
}

export const HeadActionsContext = createContext<HeadActionsAPI | null>(null);

export function useHeadActionsAPI(): HeadActionsAPI {
  return useContext(HeadActionsContext) as HeadActionsAPI;
}

export const ProvideHeadActions = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const domElement = useRef<Element | null>(null);

  return (
    <HeadActionsContext.Provider value={{ domElement }}>
      {children}
    </HeadActionsContext.Provider>
  );
};

export function withProvideHeadActions<P extends Record<string, unknown>>(
  WrappedComponent: ComponentType<P>,
): ComponentType<P> {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  function WithProvideHeadActions(props: P) {
    return (
      <ProvideHeadActions>
        <WrappedComponent {...props} />
      </ProvideHeadActions>
    );
  }

  WithProvideHeadActions.displayName = `withProvideHeadActions(${displayName})`;

  return WithProvideHeadActions;
}
