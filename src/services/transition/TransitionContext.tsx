import { createContext, ReactNode, useContext, useState } from "react";
import Transition from "./components/Transition";

export interface TransitionAPI {
  shouldTransition: boolean;
  loadingText: string;
  triggerTransition: (loadingText: string) => void;
  stopTransition: () => void;
}

export const TransitionContext = createContext<TransitionAPI | null>(null);

export const ProvideTransition = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [shouldTransition, setShouldTransition] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>("");

  const triggerTransition: TransitionAPI["triggerTransition"] = (
    loadingText,
  ) => {
    setShouldTransition(true);
    setLoadingText(loadingText);
  };

  const stopTransition: TransitionAPI["stopTransition"] = () => {
    setShouldTransition(false);
  };

  return (
    <TransitionContext.Provider
      value={{
        loadingText,
        shouldTransition,
        triggerTransition,
        stopTransition,
      }}
    >
      {children}
      <Transition />
    </TransitionContext.Provider>
  );
};

export function useTransition(): TransitionAPI {
  return useContext(TransitionContext) as TransitionAPI;
}
