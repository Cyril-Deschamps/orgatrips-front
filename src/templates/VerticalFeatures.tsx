import { VerticalFeatureRow } from "../feature/VerticalFeatureRow";
import { Section } from "../layout/Section";

const VerticalFeatures = () => (
  <Section
    description={
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus malesuada nisi tellus, non imperdiet nisi tempor at."
    }
    title={"Your title here"}
  >
    <VerticalFeatureRow
      description={
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum, nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim."
      }
      image={"/assets/images/feature.svg"}
      imageAlt={"First feature alt text"}
      title={"Your title here"}
    />
    <VerticalFeatureRow
      description={
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum, nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim."
      }
      image={"/assets/images/feature2.svg"}
      imageAlt={"Second feature alt text"}
      title={"Your title here"}
      reverse
    />
    <VerticalFeatureRow
      description={
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum, nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim."
      }
      image={"/assets/images/feature3.svg"}
      imageAlt={"Third feature alt text"}
      title={"Your title here"}
    />
  </Section>
);

export { VerticalFeatures };
