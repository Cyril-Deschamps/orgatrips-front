import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

const AppLayout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default AppLayout;
