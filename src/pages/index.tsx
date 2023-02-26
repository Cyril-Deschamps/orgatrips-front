import { FunctionComponent } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";

const Index: FunctionComponent = () => {
  return (
    <div className={"site-layout"}>
      <Header />
      <Home />
      <Footer />
    </div>
  );
};

export default Index;
