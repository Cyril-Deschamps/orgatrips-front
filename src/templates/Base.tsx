import { Meta } from "../layout/Meta";
import { AppConfig } from "../utils/AppConfig";
import { Banner } from "./Banner";
import { Footer } from "./Footer";
import { Hero } from "./Hero";

const Base = () => (
  <div className={"antialiased text-gray-600"}>
    <Meta description={AppConfig.description} title={AppConfig.title} />
    <Hero />
    <Banner />
    <Footer />
  </div>
);

export { Base };
