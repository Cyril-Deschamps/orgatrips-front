import React, { ReactElement } from "react";
import { PRIVATE } from "../../../routes/private";
import { useAuth } from "../apiProvider";
import { useRouter } from "next/router";
import generatePath from "../../routing/generatePath";
import useQueryParams from "../../routing/useQueryParams";
import Navigate from "../../routing/components/Navigate";

function withRedirectToPrivate<P, C extends React.ComponentType<P>>(
  WrappedComponent: C,
): C {
  return ((props: P) => {
    const auth = useAuth();
    const { redirectTo } = useQueryParams();

    if (auth.user !== null && !redirectTo) return <Navigate to={PRIVATE} />;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <WrappedComponent {...(props as P)} />;
  }) as C;
}

export default withRedirectToPrivate;

export function RequiresAuth({
  redirectTo,
  children,
}: {
  redirectTo: string;
  children: ReactElement;
}): JSX.Element {
  const { user } = useAuth();
  const router = useRouter();

  if (user) return children;

  const link = generatePath(redirectTo, {}, { redirectTo: router.pathname });

  return <Navigate to={link} />;
}
