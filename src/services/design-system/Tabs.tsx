import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import React, {
  ComponentType,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { replaceInArray } from "../data-structures/array";

export interface TabsAPI {
  pushList<T extends Tab>(tabs: T[], replace?: boolean): void;

  popList(): void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tabs: Tab[][];
}

export const TabsContext = createContext<TabsAPI | null>(null);

export function useTabsAPI(): TabsAPI {
  return useContext(TabsContext) as TabsAPI;
}

/**
 * @deprecated use Tabs component instead
 * @param tabs tabs list
 */
export function useTabs(tabs: Tab[]): void {
  const { pushList, popList } = useTabsAPI();

  useEffect(() => {
    pushList<Tab>(tabs);

    return popList;
  }, [pushList, popList, tabs]);
}

export const ProvideTabs = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [tabs, setTabs] = useState<TabsAPI["tabs"]>([]);

  const pushList: TabsAPI["pushList"] = useCallback((tabs, replace = true) => {
    setTabs((tabsList) =>
      replace
        ? tabsList.concat([tabs])
        : replaceInArray(
            tabsList,
            tabsList.length - 1,
            tabsList[tabsList.length - 1].concat(tabs),
          ),
    );
  }, []);

  const popList: TabsAPI["popList"] = useCallback(() => {
    setTabs((tabsList) => tabsList.slice(0, tabsList.length - 1));
  }, []);

  return (
    <TabsContext.Provider value={{ pushList, popList, tabs }}>
      {children}
    </TabsContext.Provider>
  );
};

export function withProvideTabs<P extends Record<string, unknown>>(
  WrappedComponent: ComponentType<P>,
): ComponentType<P> {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  function WithProvideTabs(props: P) {
    return (
      <ProvideTabs>
        <WrappedComponent {...props} />
      </ProvideTabs>
    );
  }

  WithProvideTabs.displayName = `withProvideTabs(${displayName})`;

  return WithProvideTabs;
}

export interface Tab {
  name: string;
  linkProps?: Omit<LinkProps, "children">;
}

export const TabsDisplay = <T extends Tab[]>({
  className,
  tabs,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { tabs: T }): JSX.Element => {
  return (
    <div {...props} className={classNames(className, "tabs")}>
      {tabs.map((tab) =>
        tab.linkProps ? (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <Link key={tab.name} className={"tab-item"} {...tab.linkProps}>
            {tab.name}
          </Link>
        ) : (
          <div key={tab.name} className={"tab-item"}>
            {tab.name}
          </div>
        ),
      )}
    </div>
  );
};

export function Tabs({ tabs }: { tabs: Tab[] }): JSX.Element | null {
  // eslint-disable-next-line deprecation/deprecation
  useTabs(tabs);

  return null;
}
