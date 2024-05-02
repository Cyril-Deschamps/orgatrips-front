import { twMerge } from "tailwind-merge";
import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: ReactNode;
  className?: string;
}

const AppLayout = ({
  children,
  className = "flex flex-col items-center",
}: Props): JSX.Element => {
  return (
    <>
      <Header />
      <main className={twMerge("grow", className)}>{children}</main>
      <Footer />
    </>
  );
};

export default AppLayout;
