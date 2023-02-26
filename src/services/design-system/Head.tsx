import React, { ComponentType, ReactNode } from "react";
import { createPortal } from "react-dom";
import { ProvideHeadActions, useHeadActionsAPI } from "./HeadActions";
import { ProvideTabs, Tabs, useTabsAPI } from "./Tabs";

export const ViewName = ({
  actions,
}: {
  actions?: ReactNode;
}): JSX.Element | null => {
  const { domElement } = useHeadActionsAPI();
  if (actions && domElement.current) {
    return createPortal(actions, domElement.current);
  }

  return null;
};

const Head = ({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>): JSX.Element => {
  const { tabs } = useTabsAPI();
  const { domElement } = useHeadActionsAPI();

  return (
    <div {...props} className={`${className} head container`}>
      <div className={"row row-v-center"}>
        <div
          ref={(element) => (domElement.current = element)}
          className={"col-fit view-head-actions"}
        />
      </div>

      {tabs.length > 0 && <Tabs tabs={tabs[tabs.length - 1]} />}
    </div>
  );
};

export default Head;

export const Content = ({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>): JSX.Element => {
  return <div {...props} className={`${className} content`} />;
};

export const ActionBar = ({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>): JSX.Element => {
  return <div {...props} className={`${className} action-bar`} />;
};

export function withProvideHead<P extends Record<string, unknown>>(
  WrappedComponent: ComponentType<P>,
): ComponentType<P> {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  function WithProvideHead(props: P) {
    return (
      <ProvideHeadActions>
        <ProvideTabs>
          <WrappedComponent {...props} />
        </ProvideTabs>
      </ProvideHeadActions>
    );
  }

  WithProvideHead.displayName = `withProvideHead(${displayName})`;

  return WithProvideHead;
}
